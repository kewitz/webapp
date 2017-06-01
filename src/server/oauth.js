const OAuth2 = require('simple-oauth2')

// Initialize the OAuth2 Library
const tokenConfig = { scope: 'public scoped_refresh_token' }
let token = null

export function currentToken() {
  if (!token || token.expired()) {
    const credentials = {
      client: {
        id: ENV.AUTH_CLIENT_ID,
        secret: ENV.AUTH_CLIENT_SECRET,
      },
      auth: {
        tokenHost: ENV.AUTH_DOMAIN,
        tokenPath: '/api/oauth/token',
      },
      http: {
        headers: {
          Accept: 'application/json',
        },
      },
    }

    const client = OAuth2.create(credentials)
    return new Promise((resolve) => {
      client.clientCredentials
        .getToken(tokenConfig)
        .then((result) => {
          if (result.errors) {
            console.log('Unable to get access token', result)
            process.exit(1)
          }
          token = client.accessToken.create(result)
          resolve(token)
        }).catch((err) => {
          console.log('Unable to get access token', err)
          process.exit(1)
        })
    })
  }
  return new Promise((resolve) => { resolve(token) })
}

export function fetchOauthToken(callback) {
  // Get the access token object for the client
  currentToken().then(() => {
    callback()
  })
}

export function addOauthRoute(app) {
  app.get('/api/webapp-token', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '0')
    currentToken().then((tok) => {
      res.status(200).send(tok)
    })
  })
}

