var gulp = require('gulp');
var symlink = require('gulp-symlink');

// create a symlink to src/images
gulp.task('images', function () {
  return gulp.src('src/images')
    .pipe(symlink('views/images', {force: true}));
});
