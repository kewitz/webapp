/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from 'autoprefixer'
import path from 'path'
import postcssApply from 'postcss-apply'
import postcssCalc from 'postcss-calc'
import postcssColorFunction from 'postcss-color-function'
import postcssCustomMedia from 'postcss-custom-media'
import postcssCustomProperties from 'postcss-custom-properties'
import postcssImport from 'postcss-import'
import postcssPxToRem from 'postcss-pxtorem'
import postcssReporter from 'postcss-reporter'
import postcssUrl from 'postcss-url'
import webpack from 'webpack'
import pkg from './package.json'
// load env vars first
require('dotenv').load({ silent: process.env.NODE_ENV === 'production' })


module.exports = {
  devtool: 'source-map',
  entry: {
    main: ['./src/main', 'webpack-hot-middleware/client'],
  },
  output: {
    filename: '[name].entry.js',
    path: path.join(__dirname, 'public/static'),
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
      ENV: JSON.stringify(require(path.join(__dirname, './env.js'))), // eslint-disable-line
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          path.join(__dirname, 'src'),
          // this is so we can compile brains when working locally
          path.join(__dirname, 'node_modules/ello-brains'),
        ],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                postcssImport({ root: loader.resourcePath }),
                postcssUrl(),
                postcssCustomProperties(),
                postcssApply(),
                postcssCalc(),
                postcssColorFunction(),
                postcssCustomMedia(),
                postcssPxToRem({ propWhiteList: [], minPixelValue: 5 }),
                autoprefixer({ browsers: pkg.browserlist }),
                postcssReporter(),
              ],
            },
          },
        ],
      },
    ],
  },
}

