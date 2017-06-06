const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const postcssApply = require('postcss-apply')
const postcssCalc = require('postcss-calc')
const postcssColorFunction = require('postcss-color-function')
const postcssCustomMedia = require('postcss-custom-media')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssImport = require('postcss-import')
const postcssPxToRem = require('postcss-pxtorem')
const postcssReporter = require('postcss-reporter')
const postcssUrl = require('postcss-url')
const pkg = require('./package.json')
const fs = require('fs')

// load env vars first
require('dotenv').load({ silent: process.env.NODE_ENV === 'production' })

const nodeEnv = process.env.NODE_ENV || 'production'

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/main',
  },
  output: {
    filename: '[name].entry.js',
    chunkFilename: '[id].chunk.js',
    hash: true,
    path: path.join(__dirname, 'public/static'),
    publicPath: `${(process.env.CDN || '')}/static/`,
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(require(path.join(__dirname, './env.js'))), // eslint-disable-line
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      chunks: ['main'],
      hash: true,
      template: 'public/template.html',
      inject: 'body',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    function() {
      this.plugin("done", (stats) => {
        fs.writeFileSync(
          path.join(__dirname, "webpack-stats/prod.json"),
          JSON.stringify(stats.toJson()))
      })
    }
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules/ello-brains'),
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader']),
      },
    ],
  },
  postcss(wp) {
    return [
      postcssImport({ result: { messages: { dependency: wp } } }),
      postcssUrl(),
      postcssCustomProperties(),
      postcssApply(),
      postcssCalc(),
      postcssColorFunction(),
      postcssCustomMedia(),
      postcssPxToRem({ propWhiteList: [], minPixelValue: 5 }),
      autoprefixer({ browsers: pkg.browserlist }),
      postcssReporter(),
    ]
  },
}

