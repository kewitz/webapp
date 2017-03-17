/* eslint-disable max-len, no-console */
import newrelic from 'newrelic'
import 'babel-polyfill'
import 'isomorphic-fetch'
import values from 'lodash/values'
import Honeybadger from 'honeybadger'
import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import logfmt from 'logfmt'
import librato from 'librato-node'
import path from 'path'
import fs from 'fs'
import memjs from 'memjs'
import kue from 'kue'
import crypto from 'crypto'
import { updateStrings as updateTimeAgoStrings } from './lib/time_ago_in_words'
import { addOauthRoute, currentToken } from '../oauth'

function handleZlibError(error) {
  if (error.code === 'Z_BUF_ERROR') {
    console.error('ZlibError', error)
  } else {
    console.log(error.stack)
    throw error
  }
}
process.on('uncaughtException', handleZlibError)

// load env vars first
require('dotenv').load({ silent: process.env.NODE_ENV === 'production' })
global.ENV = require('../env')

updateTimeAgoStrings({ about: '' })

const app = express()
const preRenderTimeout = (parseInt(process.env.PRERENDER_TIMEOUT, 10) || 15) * 1000
const memcacheDefaultTTL = (parseInt(process.env.MEMCACHE_DEFAULT_TTL, 10) || 300)
const memcacheClient = memjs.Client.create(null, { expires: memcacheDefaultTTL })
const queue = kue.createQueue({ redis: process.env[process.env.REDIS_PROVIDER] })

// Honeybadger "before everything" middleware
app.use(Honeybadger.requestHandler);

// Log requests with Heroku's logfmt
app.use(logfmt.requestLogger({ immediate: true }))

// Parse cookies (for determining to pre-render or not)
app.use(cookieParser())

// Send stats to Librato
librato.configure({
  email: process.env.LIBRATO_EMAIL,
  token: process.env.LIBRATO_TOKEN,
  source: process.env.DYNO,
})
librato.start()
app.use(librato.middleware())

librato.on('error', (err) => {
  console.log('[librato] ERROR', err)
})

// Use Helmet to lock things down
app.use(helmet())

const indexStr = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf-8')

// Wire up OAuth route
addOauthRoute(app)

// Assets
app.use(express.static('public', { index: false, redirect: false }))
app.use('/static', express.static('public/static', { maxAge: '1y', index: false, redirect: false, fallthrough: false }))

function saveResponseToCache(cacheKey, body) {
  memcacheClient.set(cacheKey, body, (err) => {
    if (err) {
      console.log('[memcache] ERROR', err)
    } else {
      console.log(`[memcache] Saved ${cacheKey}`)
    }
  })
}

function renderFromServer(req, res, cacheKey, timingHeader) {
  const startTime = new Date()
  currentToken().then((token) => {
    librato.timing('iso.render_time', (libratoDone) => {
      // Kick off the render
      console.log('[render] Enqueueing render')
      const renderOpts = {
        accessToken: token.token.access_token,
        expiresAt: token.token.expires_at,
        originalUrl: req.originalUrl,
        url: req.url,
        timingHeader,
      }

      const job = queue
        .create('render', renderOpts)
        .ttl(1.1 * preRenderTimeout) // So we don't lose the job mid-timeout
        .removeOnComplete(true)
        .save()

      // Set up our completion/failure/timeout callbacks
      let renderTimeout
      const jobCompleteCallback = (result) => {
        libratoDone()
        const { type, location, body } = (result || {})
        switch (type) {
          case 'redirect':
            console.log(`[render] Redirecting to ${location} (took ${new Date() - startTime}ms)`)
            librato.measure('webapp.server.render.redirect', 1)
            res.redirect(location)
            break
          case 'render':
            console.log(`[render] Rendering ISO response (took ${new Date() - startTime}ms)`)
            librato.measure('webapp.server.render.success', 1)
            res.send(body)
            saveResponseToCache(cacheKey, body)
            break
          case 'error':
            console.log(`[render] Rendering error response (took ${new Date() - startTime}ms)`)
            librato.measure('webapp.server.render.error', 1)
            res.status(500).end()
            break
          case '404':
            console.log(`[render] Rendering 404 response (took ${new Date() - startTime}ms)`)
            librato.measure('webapp.server.render.404', 1)
            res.status(404).end()
            break
          default:
            console.log(`[render] Received unrecognized response (took ${new Date() - startTime}ms)`)
            console.log(JSON.stringify(result))
            librato.measure('webapp.server.render.error', 1)
            // Fall through
            res.status(500).end()
        }
        clearTimeout(renderTimeout)
      }
      const jobFailedCallback = (errorMessage) => {
        libratoDone()
        console.log(`[render] Job failed (took ${new Date() - startTime}ms)`, JSON.stringify(errorMessage))
        res.send(indexStr)
        librato.measure('webapp.server.render.timeout', 1)
        clearTimeout(renderTimeout)
      }

      renderTimeout = setTimeout(() => {
        libratoDone()
        console.log('[render] Timed out; falling back to client-side rendering')
        librato.measure('webapp.server.render.timeout', 1)
        res.send(indexStr)
        job.removeListener('complete', jobCompleteCallback)
        job.removeListener('failed', jobFailedCallback)
      }, preRenderTimeout)

      job.on('complete', jobCompleteCallback)
      job.on('failed', jobFailedCallback)
    })
  })
}

const noPreRenderPaths = {
  following: /^\/following/,
  forgotPassword: /^\/forgot-password/,
  enter: /^\/enter/,
  invitations: /^\/invitations/,
  join: /^\/join/,
  settings: /^\/settings/,
  signup: /^\/signup/,
  notifications: /^\/notifications/,
}

export function canPrerenderRequest(req) {
  // Don't pre-render if user is (assumed to be) logged in
  if (req.cookies.ello_skip_prerender === 'true') {
    return false
  }
  // Don't pre-render for ello android app
  if ((req.get('user-agent') || '').includes('Ello Android')) {
    return false
  }
  return values(noPreRenderPaths).every(regex =>
    !req.url.match(regex),
  )
}

function cacheKeyForRequest(req, salt = '') {
  return crypto.createHash('sha256').update(salt + req.url).digest('hex')
}

app.use((req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.setHeader('Expires', new Date(Date.now() + (1000 * 60)).toUTCString());

  // This needs to be generated in the request, not a callback
  const timingHeader = newrelic.getBrowserTimingHeader()

  if (canPrerenderRequest(req)) {
    const cacheKey = cacheKeyForRequest(req)
    console.log('[handler] Serving pre-rendered markup for path', req.url, cacheKey)
    memcacheClient.get(cacheKey, (err, value) => {
      if (value) {
        console.log('[memcache] Cache hit!', req.url)
        res.send(value.toString())
      } else {
        renderFromServer(req, res, cacheKey, timingHeader)
      }
    })
  } else {
    console.log('[handler] Serving static markup for path', req.url)
    res.send(indexStr)
  }
})

// Honeybadger "after everything" middleware
app.use(Honeybadger.errorHandler);

export default app

