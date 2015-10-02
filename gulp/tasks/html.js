var gulp = require('gulp');
var rename = require('gulp-rename');

// since I use stringify this is not important anymore.
// gulp.task('register:copy-html', function() {
//   var _filter = filter(['**/register.html'], {restore: true});
//   return gulp.src('src/register/**/*.html')
//     .pipe(flatten())
//     .pipe(_filter)
//     .pipe(rename('index.html'))
//     .pipe(_filter.restore)
//     .pipe(gulp.dest('views/register'));
// });
// this will do only the index.html file, others will be inlined with javascript
gulp.task('register:copy-html', function () {
  return gulp.src('src/register/register.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('views/register'));
});
