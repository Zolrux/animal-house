const { src, dest, watch, parallel, series } = require('gulp');
const browserSync = require('browser-sync').create();
// const clean = require('gulp-clean');

const pages = require(`./config//gulp-tasks/html.js`)(browserSync);
const images = require(`./config/gulp-tasks/images.js`);
const scriptsDev = require(`./config/gulp-tasks/jsDev.js`)(browserSync);
const styles = require(`./config/gulp-tasks/scss.js`)(browserSync);
const sprite = require(`./config/gulp-tasks/sprite.js`);

function watching() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  watch(['scss/**/*.scss'], styles);
  watch(['images/src/'], parallel(images, sprite));
  watch(['js/**/*.js', '!js/*.bundle.js'], scriptsDev);
  watch(['components/*', 'pages/*'], pages);
  watch(['*.html']).on('change', browserSync.reload);
}

module.exports = { watching, styles, scriptsDev, images, sprite, pages };
// module.exports.sprite = series(cleanIconsDir, sprite);
module.exports.dev = parallel(styles, scriptsDev, pages, watching);
// module.exports.build = series(removeDist, buildingLayout, scriptsProd);