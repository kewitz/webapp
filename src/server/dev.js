/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import httpProxy from 'http-proxy'
import config from './../../webpack.dev.config'
import { addOauthRoute, fetchOauthToken } from './oauth'
import { updateStrings as updateTimeAgoStrings } from './../lib/time_ago_in_words'

// load env vars first
require('dotenv').load()

const app = express()
const compiler = webpack(config)
const proxy = httpProxy.createProxyServer({
  target: process.env.AUTH_DOMAIN,
  changeOrigin: true,
})

updateTimeAgoStrings({ about: '' })
addOauthRoute(app)

// Development Middleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))
app.use(webpackHotMiddleware(compiler))

// Assets
app.use(express.static('public'))
app.use('/static', express.static('public/static'))

// API Proxy
app.use('/api/', (req, res) => {
  // include root path in proxied request
  req.url = `/api/${req.url}`
  proxy.web(req, res, {})
})


// Main entry for app
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './../../public/dev.html'))
})


// Catchall for any requests like /onboarding
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/dev.html'))
})

fetchOauthToken(() => {
  app.listen(6660, '0.0.0.0', (err) => {
    if (err) {
      console.log('Listen error', err)
      return
    }
    console.log('Listening at http://localhost:6660')
    console.log(`AUTH_DOMAIN: ${process.env.AUTH_DOMAIN}`)
  })
})
