var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('register:clean', function () {
  return gulp.src([
    'views/register/**/*.*',
    ]).pipe(clean({force: true}));
});

// gulp.task('register:clean-js', function () {
//   // return gulp.src([
//   //   'views/register/js/**/*',
//   //   ]).pipe(clean({force: true}));
// });
