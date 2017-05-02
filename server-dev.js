import path from 'path'
import express from 'express'
import webpack from 'webpack'
import config from './webpack.dev.config'
import { addOauthRoute, fetchOauthToken } from './oauth'
import { updateStrings as updateTimeAgoStrings } from './src/lib/time_ago_in_words'
import httpProxy from 'http-proxy'

// load env vars first
require('dotenv').load({ silent: process.env.NODE_ENV === 'production' })
global.ENV = require('./env')

const app = express()
const compiler = webpack(config)
const proxy = httpProxy.createProxyServer({
  target: process.env.AUTH_DOMAIN,
  changeOrigin: true,
})

updateTimeAgoStrings({ about: '' })
addOauthRoute(app)

// Development Middleware
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))
app.use(require('webpack-hot-middleware')(compiler))

// Assets
app.use(express.static('public'))
app.use('/static', express.static('public/static'))

// API Proxy
app.use('/api/v2', (req, res, next) => {
  // include root path in proxied request
  req.url = '/api/v2/' + req.url
  proxy.web(req, res, {})
})


// Main entry for app
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/dev.html'))
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
