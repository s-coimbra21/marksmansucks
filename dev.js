const spawn = require('child_process').spawnSync;
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

webpackConfig.entry.bundle.unshift('webpack-dev-server/client?http://localhost:8080/');

let initialCompile = true;

function makeTemplate () {
  return spawn('node', ['./make-template.js', '--dev']);
}

makeTemplate();

const compiler = webpack(webpackConfig);
compiler.plugin('compile', () => {
  if (initialCompile) {
    initialCompile = false;
  }
  return makeTemplate();
});
const server = new WebpackDevServer(compiler, {
  https: true,
  stats: { colors: true, chunks: false },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  }
});
server.listen(8080, 'localhost', (err) => {
  if (err) { console.error('[webpack-dev-server] failed to start:', err); }
});
