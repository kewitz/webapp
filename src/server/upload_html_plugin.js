/* eslint-disable import/no-extraneous-dependencies */
require('isomorphic-fetch')

function UploadHTMLPlugin(options) {
  this.path = options.path
  this.username = options.authUsername
  this.password = options.authPassword
}

UploadHTMLPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    Object.keys(compilation.assets).forEach((filename) => {
      if (/\.html$/.test(filename)) {
        const source = compilation.assets[filename].source()
        const body = {
          app: 'webapp',
          version: filename.split('.')[0],
          html: source,
        }
        console.log(`\n\nUploading version ${body.version} to apex/serve at ${this.path}\n\n`)
        const headers = new Headers()
        headers.append('Authorization', `Basic ${new Buffer(`${this.username}:${this.password}`).toString('base64')}`)
        headers.append('Content-Type', 'application/json')
        const options = {
          body: JSON.stringify(body),
          method: 'POST',
          headers,
        }
        fetch(this.path, options)
          .then((response) => {
            if (response.ok) {
              console.log(`\n\nSUCCESSFULLY uploaded version ${body.version} to ${this.path}\n\n`)
            } else {
              console.log('response', response)
              throw new Error('Failed')
            }
          })
          .catch((err) => {
            console.log(`\n\nFAILED to upload version ${body.version} to ${this.path}\n\n`, err)
          })
      }
    })
    callback()
  })
}

module.exports = UploadHTMLPlugin

