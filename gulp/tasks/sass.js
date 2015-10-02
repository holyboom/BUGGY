var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');

var errorHandler = function (err) {
  gutil.beep();
  console.log(err.toString());
  this.emit('end');
};

gulp.task('register:sass', function () {
  return gulp.src([
      'src/register/**/*.sass',
      'src/register/**/*.scss',
    ])
    .pipe(plumber({
      errorHandler: errorHandler
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/register'));
});

gulp.task('register:sass-final', function() {
  return gulp.src('src/register/**/*.sass')
    .pipe(plumber({
      errorHandler: errorHandler
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/register'));
});
