const fse = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')

const settings = require('./settings')

/**
 * Environment
 */
const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'
const mode = isProd ? 'production' : 'development'
const outDir = 'public'

/**
 * Plugins
 */
const definePlugin = new webpack.DefinePlugin({
  __IS_PROD__: JSON.stringify(isProd),
  __IS_DEV__: JSON.stringify(!isProd),
  __COMPILATION__TIME__: JSON.stringify(new Date().toLocaleString())
})

const miniCssPlugin = new MiniCssExtractPlugin({
  filename: 'scripts/ouput.css'
})
const copyPlugin = new CopyPlugin({
  patterns: [
    { from: 'src/boot.js', to: path.join(__dirname, outDir, 'boot.js') },
    {
      from: 'src/vendor/g-units/fonts',
      to: path.join(__dirname, outDir, 'fonts/g-units')
    }
  ]
})

const filesToRemove = [
  path.join(__dirname, './public/scripts'),
  path.join(__dirname, './public/fonts/g-units'),
  path.join(__dirname, './public/boot.js')
]
function cleanup(filesToRemove = []) {
  filesToRemove.forEach(filename => {
    fse.pathExists(filename).then(exists => {
      if (!exists) return

      fse.remove(filename, err => {
        if (err) {
          return console.error(err)
        }
        console.log('Removed ' + filename)
      })
    })
  })
}
const customCleanupPlugin = {
  apply: compiler => {
    compiler.hooks.beforeCompile.tap('RemoveFiles', compilation => {
      cleanup(filesToRemove)
    })
  }
}

const maxChunksPlugin = new webpack.optimize.LimitChunkCountPlugin({
  maxChunks: 1 // Disable automatic webpack 4 code splitting
})

/**
 * Dev server params
 */
const devServer = {
  contentBase: outDir,
  port: settings.port,
  open: true,
  hot: true,
  // compress: true,
  // public: 'fordfound.ngrok.io',
  disableHostCheck: true,
  clientLogLevel: 'debug',
  watchOptions: {
    poll: true
  }
}

/**
 * Webpack configuration
 */
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, outDir),
    filename: 'scripts/main.js',
    library: 'main',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  mode,
  devtool: isProd ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: { test: [/node_modules/, /boot\.js/] },
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          isProd
            ? {
              loader: MiniCssExtractPlugin.loader,
              options: {}
            }
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          // 'sass-loader'
        ]
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg)?$/, use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              publicPath: isProd ? 'images' : '/public/images',
            },
          },
        ]
      },
      {
        test: /\.(otf)?$/, use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              publicPath: isProd ? 'fonts' : '/public/fonts',
            },
          }
        ]
      },
      { test: /\.(ttf|eot|otf|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
      {
        test: /\.(png|woff|otf|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: isProd ? undefined : devServer,
  plugins: [
    maxChunksPlugin,
    customCleanupPlugin,
    copyPlugin,
    miniCssPlugin,
    definePlugin
  ]
}
