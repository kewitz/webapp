/* eslint-disable import/no-extraneous-dependencies */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')
const autoprefixer = require('autoprefixer')
const fs = require('fs')
const path = require('path')
const postcssApply = require('postcss-apply')
const postcssCalc = require('postcss-calc')
const postcssColorFunction = require('postcss-color-function')
const postcssCustomMedia = require('postcss-custom-media')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssImport = require('postcss-import')
const postcssPxToRem = require('postcss-pxtorem')
const postcssReporter = require('postcss-reporter')
const postcssUrl = require('postcss-url')
const webpack = require('webpack')
const pkg = require('./package.json')

// load env vars first
require('dotenv').load({ silent: process.env.NODE_ENV === 'production' })

const nodeEnv = process.env.NODE_ENV || 'production'

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/main',
  },
  output: {
    filename: '[name]-[hash].entry.js',
    chunkFilename: '[id].chunk.js',
    path: path.join(__dirname, 'public/static'),
    publicPath: `${(process.env.CDN || '')}/static/`,
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(require(path.join(__dirname, './env.js'))), // eslint-disable-line
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
    new ExtractTextPlugin({ filename: '[name]-[contenthash].css' }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      chunks: ['main'],
      hash: true,
      template: '!!html-loader!public/template.html',
      inject: 'body',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
      },
      sourceMap: true,
    }),
    new S3Plugin({
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      },
      s3UploadOptions: {
        Bucket: process.env.S3_BUCKET,
      },
    }),
    function () { // eslint-disable-line
      this.plugin('done', (stats) => {
        fs.writeFileSync(
          path.join(__dirname, 'webpack-stats/prod.json'),
          JSON.stringify(stats.toJson()))
      })
    },
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [
                  autoprefixer({ browsers: pkg.browserlist }),
                  postcssApply(),
                  postcssCalc(),
                  postcssColorFunction(),
                  postcssCustomMedia(),
                  postcssCustomProperties(),
                  postcssImport({ result: { messages: { dependency: loader } } }),
                  postcssPxToRem({ propWhiteList: [], minPixelValue: 5 }),
                  postcssReporter(),
                  postcssUrl(),
                ],
              },
            },
          ],
        }),
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
}

