var gulp = require('gulp');
var symlink = require('gulp-symlink');

// create a symlink to src/bower
gulp.task('bower', function () {
  return gulp.src('src/bower')
    .pipe(symlink('views/bower', {force: true}));
});
