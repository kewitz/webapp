import webpack from 'webpack'
import path from 'path'
import fs from 'fs'

// load env vars first
require('dotenv').load({ silent: process.env.NODE_ENV === 'production' })

const nodeModules = {}

fs.readdirSync('node_modules').filter(x => ['.bin'].indexOf(x) === -1).forEach((mod) => {
  nodeModules[mod] = `commonjs ${mod}`
})

module.exports = {
  target: 'node',
  cache: false,
  context: __dirname,
  debug: false,
  devtool: 'source-map',
  entry: {
    'server-iso-entrypoint': './src/server/entrypoint-iso',
    'server-render-entrypoint': './src/server/entrypoint-render',
    'server-queue-entrypoint': './src/server/entrypoint-queue',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(require(path.join(__dirname, './env.js')))
    }),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
    function () {
      this.plugin('done', (stats) => {
        fs.writeFileSync(
          path.join(__dirname, 'webpack-stats/server.json'),
          JSON.stringify(stats.toJson()))
      })
    }
  ],
  module:  {
    loaders: [
      {
        test: /\.json$/,
        loaders: [ 'json' ],
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules/ello-brains'),
        ],
        exclude: /node_modules/,
      },
    ],
    noParse: /\.min\.js/
  },
  externals: nodeModules,
  resolve: {
    modulesDirectories: [
      "src",
      "node_modules",
      "web_modules"
    ],
    extensions: ["", ".json", ".js"]
  },
  node:    {
    __dirname: true,
    fs:        'empty'
  }
};
