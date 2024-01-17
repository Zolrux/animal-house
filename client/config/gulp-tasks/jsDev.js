const { src, dest } = require('gulp');
const webpack = require('webpack-stream');

function scriptsDev(browserSync) {
  return function scriptsDev() {
    return (
      src(['js/app.js'])
        .pipe(
          webpack({
            config: require('../webpack.dev.js'),
          })
        )
        .pipe(dest('js/'))
        .pipe(browserSync.stream())
    );
  };
}

module.exports = scriptsDev;
