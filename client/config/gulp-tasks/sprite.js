const { src, dest, series } = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const clean = require('gulp-clean');

function cleanIconsDirTask() {
	return src(['images/dist/icons/*'])
	.pipe(clean());
}

function spriteTask() {
  return src(['images/dist/*.svg'])
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../icons/sprite.svg',
            example: true,
            dest: 'icons/',
          },
        },
      })
    )
    .pipe(dest('images/dist'));
}

function sprite() {
	return series(cleanIconsDirTask, spriteTask);
}

// module.exports = {cleanIconsDir, sprite};
module.exports = sprite();