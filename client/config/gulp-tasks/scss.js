const { src, dest } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
// const concat = require('gulp-concat');
const groupMediaQueries = require('gulp-group-css-media-queries');

function styles(browserSync) {
  return function styles() {
    return src('scss/*.scss')
      .pipe(scss({ outputStyle: 'compressed' }))
		.pipe(groupMediaQueries())
      .pipe(
        autoprefixer({
          grid: 'autoplace',
          overrideBrowserslist: ['last 10 version'],
        })
      )
		.pipe(scss({ outputStyle: 'compressed' }))
      // .pipe(concat('*.min.css'))
      .pipe(dest('css/'))
      .pipe(browserSync.stream());
  };
}

module.exports = styles;
