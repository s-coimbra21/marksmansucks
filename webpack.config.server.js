require('babel-register');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const cssRequireHook = require('css-modules-require-hook');
const sass = require('node-sass');

cssRequireHook({
  generateScopedName: '[local]___[hash:base64:5]',
  extensions: ['.scss', '.css'],
  preprocessCss: (data, filename) =>
    sass.renderSync({
      data,
      file: filename,
      includePaths: [path.resolve(__dirname, './')]
    }).css,
});

module.exports = {
  entry: {
    app: ['./app/server.js']
  },
  externals: [nodeExternals()],
  resolve: {
    root: [path.resolve(__dirname, 'app')]
  },
  devServer: { inline: false },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.entry\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader')
      },
      {
        test: /^((?!\.entry).)*\.s?css$/,
        loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader'
      },
      { test: /\.(jpg|png)$/, loader: 'url?limit=2000' },
      { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-otf' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' }
    ]
  },

  plugins: [
    new ExtractTextPlugin('entry.css'),
//    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.OccurrenceOrderPlugin(),

    // Minify without warning messages and IE8 support
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  ],
  target: 'node'
};
