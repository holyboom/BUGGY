'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var stringify = require('stringify');
var cssify = require('cssify');
var shim = require('browserify-shim');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var merge2 = require('merge2');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var _ = require('lodash');

// build the register's angular app
// this is for development only
gulp.task('register', ['bower', 'images', 'register:clean'], function () {
  // watch and copy .html file
  gulp.watch('src/register/register.html', ['register:copy-html']);
  // watch .sass for updates
  watch('src/register/**/*.sass', function () {
    runSequence('register:sass');
  });

  // call for the first time
  runSequence(['register:copy-html', 'register:sass'], 'server:start', function () {
    rebundle();
  });

  // watchify and browserify configs
  var opts = {
    entries: ['src/register/bootstrap.es6.js'],
    // this for sourcemaps
    debug: true,
  };
  // merge the opts to the defaults
  opts = _.assign({}, watchify.args, opts);
  var b = browserify(opts)
    .transform(babelify)
    .transform(shim)
    .transform(cssify)
    .transform(stringify(['.html', '.json']));
  var w = watchify(b);

  w.on('log', gutil.log);

  // watch for updates
  w.on('update', rebundle);

  function rebundle() {
    // return runSequence('register:clean-js', function () {
      return w.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        // Bundle to a single file
        .pipe(source('register.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('maps'))
        // Output it to our dist folder
        .pipe(gulp.dest('views/register/js'));
    // });
  }

  // return a never-ending stream
  // this task will never end
  return merge2({
    end: false,
  });
});

// build the register's angular app
// for production
// note: this should not be called directly, call 'register:final' instead
gulp.task('register:browserify-final', ['register:sass-final'], function () {
  var b = browserify({
    entries: ['src/register/bootstrap.es6.js'],
    // this for sourcemaps
    debug: true,
  });

  return b
    .transform(cssify)
    .transform(stringify(['.html']))
    .transform(babelify)
    .bundle()
    .pipe(source('register.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('views/register/js'));
});

gulp.task('register:final', ['bower', 'images', 'register:copy-html', 'register:browserify-final'], function () {
  gulp.start('server:start');
});
