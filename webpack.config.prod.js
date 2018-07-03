require('babel-register');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

const entry = new ExtractTextPlugin('ignore/entry.css');
const style = new ExtractTextPlugin('style.css');

module.exports = {
  entry: {
/*    loadcss: ['./app/loadCSS/loadCSS.js', './app/loadCSS/polyfill.js'],*/
    bundle: ['whatwg-fetch', './app/client.js']
  },
  resolve: {
    root: [path.resolve(__dirname, 'app')]
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: '[name].js',
    publicPath: '/marksmansucks/'
  },
  module: {
    preLoaders: [
      {
        test: /\.(jsx?|s?css)$/,
        loader: 'string-replace',
        query: {
          search: 'https://cdn.marksmansucks.lol/',
          replace: '/marksmansucks/cdn/',
          flags: 'g'
        }
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader', 'string-replace?{"search":"https://cdn.marksmansucks.lol/","replace":"/marksmansucks/cdn/","flags":"g"}'],
        exclude: /node_modules/
      }, {
        test: /\.entry\.scss$/,
        loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader'
      }, {
        test: /^((?!\.entry).)*\.s?css$/,
        loader: style.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader')
      }, {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=2000'
      }, {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-otf'
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.html$/,
        loader: 'html-loader',
        query: {
          minimize: true
        }
      }]
  },

  plugins: [
      //    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.OccurrenceOrderPlugin(),

      // Minify without warning messages and IE8 support
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({ filename: 'index.html', template: './build/template.html', inject: false, cache: false, chunks: ['bundle'] }),
    entry,
    style,
//    new StyleExtHtmlWebpackPlugin('entry.css'), // TODO: INLINE CRITICAL CSS ONLY
    new CopyWebpackPlugin([
      {
        from: './assets/*',
        flatten: true
      }, {
        from: './assets/cdn/*',
        to: 'cdn',
        flatten: true
      }, {
        from: './build/*.png',
        flatten: true
      }
    ])
      //    new ResourceHintWebpackPlugin()
  ],

  target: 'web'
};
