const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

const devConfig = (env = {}) => merge(baseConfig(), {
  mode: 'development',
  devtool: env.prod ? false : 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        ws: true,
        changeOrigin: true
      }
    },
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /\w+/, to: '/index.html' }
      ]
    },
    overlay: {
      warnings: false,
      errors: true
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map[query]'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = new Promise(res => res(devConfig()))
