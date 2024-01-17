const { src, dest } = require('gulp');
// const avif = require('gulp-avif');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const newer = require('gulp-newer');

function images() {
  return src(['images/src/*.*', '!images/src/*.svg'])
    .pipe(newer('images/dist'))
   //  .pipe(avif({ quality: 50 }))
    .pipe(src('images/src/*.*'))
    .pipe(newer('images/dist'))
    .pipe(webp())
    .pipe(src(['images/src/*.*']))
    .pipe(newer('images/dist'))
    .pipe(imagemin())
    .pipe(dest('images/dist'));
}

module.exports = images;
