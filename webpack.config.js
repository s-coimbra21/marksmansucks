require('babel-register');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const WatchIgnorePlugin = webpack.WatchIgnorePlugin;

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    bundle: ['whatwg-fetch', './app/client.js']
  },
  resolve: {
    root: [path.resolve(__dirname, 'app')]
  },
  devServer: { inline: true },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      {
        test: /\.(jsx?|s?css)$/,
        loader: 'string-replace',
        query: {
          search: 'https://cdn.marksmansucks.lol/',
          replace: '/cdn/',
          flags: 'g'
        }
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader', 'string-replace?{"search":"https://cdn.marksmansucks.lol/","replace":"/cdn/","flags":"g"}'],
        exclude: /node_modules/
      },

      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader')
      },
      { test: /\.(jpg|png)$/, loader: 'url?limit=10000' },
      { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=1000&mimetype=application/font-otf' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=1000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=1000&mimetype=application/font-woff' }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    new webpack.optimize.OccurrenceOrderPlugin(),
/*    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),*/
    new WatchIgnorePlugin([path.resolve(__dirname, 'dist'), path.resolve(__dirname, 'app/template.ejs')]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './build/template.html',
      inject: false,
      cache: false,
      chunks: ['bundle']
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new CopyWebpackPlugin([{
      from: './assets/*',
      flatten: true
    }, {
      from: './assets/cdn/*',
      to: 'cdn',
      flatten: true
    }]),
    new WriteFilePlugin()
  ],

  target: 'web'
};
