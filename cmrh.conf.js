const sass = require('node-sass');
const path = require('path');

module.exports = {
  generateScopedName: '[local]',
  extensions: ['.scss', '.css'],
  preprocessCss: (data, filename) =>
      sass.renderSync({
        data,
        file: filename,
        includePaths: [path.resolve(__dirname, './')]
      }).css,
};
