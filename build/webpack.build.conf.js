const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

const buildConfig = (env = {}) => ({
  mode: 'production',
  plugins: [],
  devtool: 'eval-source-map'
})

module.exports = new Promise(res => {
  res(merge(baseConfig({ prod: true })))
})
