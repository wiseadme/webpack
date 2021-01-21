const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
require('dotenv').config()

const resolve = pathString => {
  return path.resolve(__dirname, pathString)
}

const PATH = {
  src: resolve('../src'),
  dist: resolve('../dist'),
  public: 'public/',
  assets: 'assets/',
}

module.exports = (env = {}) => {
  return {
    target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    externals: {
      path: PATH,
    },
    entry: {
      app: `${ PATH.src }/app.ts`,
    },
    output: {
      filename: `${ PATH.assets }js/[name].[hash]${ env.prod ? '.prod' : '' }.js`,
      path: PATH.dist,
      publicPath: '/',
      chunkFilename: `${ PATH.assets }js/chunk.[name].[hash].js`,
    },
    optimization: {
      minimize: !!env.prod,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          parallel: true,
          terserOptions: {
            compress: {
              collapse_vars: true,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true,
            },
            mangle: {
              safari10: true,
            },
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
            enforce: true,
          }
        }
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/',
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loader: {
              scss: 'vue-style-loader!css-loader!sass-loader'
            }
          }
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: { babelrc: true }
            },
            {
              loader: 'ts-loader',
              options: { appendTsSuffixTo: [/\.vue$/] }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-resources-loader',
              options: {
                sourceMap: true,
                resources: [
                  resolve('../src/assets/scss/modules/_globals.scss'),
                ]
              }
            }
          ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true },
            },
          ],
        },
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: /node_modules/
        }
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        '@': PATH.src,
        '/': PATH.public,
        vue: env.prod ? 'vue/dist/vue.runtime.esm-browser.prod.js' : 'vue/dist/vue.runtime.esm-browser.js'
      }
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'RouteMe',
        hash: false,
        template: `${ PATH.public }/index.html`,
        filename: 'index.html',
        inject: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }),

      new MiniCssExtractPlugin({
        filename: `${ PATH.assets }css/[name].[hash].css`,
        chunkFilename: `${ PATH.assets }css/chunk.[name].[hash].css`,
      }),

      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        openAnalyzer: false
      }),

      new CopyWebpackPlugin([
        {
          from: `${ PATH.src }/assets/img/`,
          to: `${ PATH.assets }/img/`
        }
      ]),

      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
      }),

      new webpack.EnvironmentPlugin([
        'MAP_TOKEN',
        'MAP_MARKER',
        'API_TOKEN',
        'API_SECRET'
      ]),

      new webpack.ProvidePlugin({
        useRouter: ['vue-router', 'useRouter'],
        useStore: ['vuex', 'useStore'],
        action: resolve('../src/store/action-types.ts'),
        mutation: [resolve('../src/store/mutation-types.ts')],
        store: resolve('../src/store/namespaces.ts')
      }),

      new VueLoaderPlugin()
    ],
  }
}
