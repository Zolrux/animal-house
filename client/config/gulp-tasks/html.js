const { src, dest } = require('gulp');
const fileinclude = require('gulp-file-include');

function pages(browserSync) {
  return function pages() {
    return src('pages/*.html')
      .pipe(
        fileinclude({
          prefix: '@@',
        })
      )
      .pipe(dest('./'))
      .pipe(browserSync.stream());
  };
}

module.exports = pages;
