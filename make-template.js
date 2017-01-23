require('babel-register');
const { h } = require('preact');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const render = require('preact-render-to-string');

const dir = path.join(__dirname, 'build');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

let staticApp;

if (process.argv.find(arg => arg === '--dev')) {
  staticApp = '';
} else {
/*  cssRequireHook({
    generateScopedName: '[local]___[hash:base64:5]',
    extensions: ['.scss', '.css'],
    preprocessCss: (data, filename) =>
      sass.renderSync({
        data,
        file: filename,
        includePaths: [path.resolve(__dirname, './')]
      }).css,
  });*/

  const App = require('./build/app.js');

  staticApp = render(h(App));
}

const entrycss = `<style>${fs.readFileSync('./build/entry.css', 'utf-8')}</style>`;
const templateMarkup = fs.readFileSync('./app/template.ejs', 'utf-8');
const loadcss = fs.readFileSync('./loadcss.js', 'utf-8');

const markup = ejs.render(templateMarkup, { markup: staticApp, loadcss, entrycss });

fs.writeFileSync('./build/template.html', markup, 'utf8');

process.exit(0);
