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
        console.log(`\n\nUploading ${filename} to apex/serve at ${this.path}\n\n`)
        const source = compilation.assets[filename].source()
        const body = {
          app: 'webapp',
          sha: filename.split('.')[0],
          html: source,
        }
        const headers = new Headers()
        headers.append('Authorization', `Basic ${this.username}:${this.password}`)
        const options = {
          body: JSON.stringify(body),
          method: 'POST',
          headers,
        }
        fetch(this.path, options)
          .then(() => {
            console.log(`\n\nSUCCESSFULLY uploaded version ${body.sha} to ${this.path}\n\n`)
          })
          .catch((err) => {
            console.log(`\n\nFAILED to upload version ${body.sha} to ${this.path}\n\n`, err)
          })
      }
    })
    callback()
  })
}

module.exports = UploadHTMLPlugin

