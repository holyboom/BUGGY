'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('server:start', function () {
  gulp.src('views')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
    }));
});
