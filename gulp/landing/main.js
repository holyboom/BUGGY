'use strict';

var gulp = require('gulp');
var babelify = require('gulp-babel');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css')
var browserSync;
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var merge2 = require('merge2');
var symlink = require('gulp-symlink');
var React = require('react');
var Rjade = require('react-jade');



require('../tasks/bower.js');
require('../tasks/images.js');

var isWatch = false;
var isBuild = false;
var rootDirLanding = './src/landing';
var desDirLanding = './views/landing';
var rootDirProfile = './src/profile';
var desDirProfile = './views/profile';

gulp.task('landing:move',function() {
  var font = gulp.src('src/landing/font/*.*')
    .pipe(gulp.dest(desDirLanding + '/font'));

  gulp.src(['src/bower','src/images','src/errors'])
    .pipe(symlink(['views/bower','views/images','views/errors'], {force: true}));

  //return merge2(font,bower,images);
});

gulp.task('landing:css',function() {

  var src = [
    rootDirLanding + '/**/*.scss',
    '!' + rootDirLanding + '/components/**/*.scss'
  ];

  if (isBuild) {
    gulp.src(src)
      .pipe(
        sass({
          errLogToConsole: true
        }).on('error',sass.logError)
      )
      .pipe(sourcemaps.init())
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(sourcemaps.write())
      .pipe(rename('landing.css'))
      .pipe(gulp.dest(desDirLanding));
  } else if (isWatch) {
    gulp.src(src)
      .pipe(
        sass({
          errLogToConsole: true
        }).on('error',sass.logError)
      )
      .pipe(rename('landing.css'))
      .pipe(gulp.dest(desDirLanding))
      .pipe(browserSync.reload({stream:true}));
  } else {
    gulp.src(src)
      .pipe(
        sass({
          errLogToConsole: true
        }).on('error',sass.logError)
      )
      .pipe(rename('landing.css'))
      .pipe(gulp.dest(desDirLanding));
  }

});

gulp.task('landing:js',function() {

  var src = [
    rootDirLanding + '/**/*.es6'
  ];

  var err = function(e) {
    console.log('>>> ES6 Error', e);
  }

  if (isBuild) {
    gulp.src(src)
      .pipe(babelify())
      .on('error', err)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(desDirLanding));
  } else if (isWatch) {
    gulp.src(src)
      .pipe(babelify())
      .on('error', err)
      .pipe(gulp.dest(desDirLanding))
      .pipe(browserSync.reload({stream:true}))
  } else {
    gulp.src(src)
      .pipe(babelify())
      .on('error', err)
      .pipe(gulp.dest(desDirLanding));
  }

});

gulp.task('landing:html',function() {

  var src = [
    rootDirLanding + '/**/*.jade',
    '!' + rootDirLanding + '/components/**/*.jade'
  ];

  var err =  function(e) {
    console.log('>>> Jade Error ',e);
  };

  if (isBuild) {
    gulp.src(src)
      .pipe(jade({
        pretty: true
      }))
      .on('error', err)
      .pipe(gulp.dest(desDirLanding))
      .pipe(rename('index.php'))
      .pipe(gulp.dest(desDirLanding));
  } else if (isWatch) {
    gulp.src(src)
      .pipe(jade())
      .on('error', err)
      .pipe(gulp.dest(desDirLanding))
      .pipe(browserSync.reload({stream:true}));
  } else {
    gulp.src(src)
      .pipe(jade())
      .on('error', err)
      .pipe(gulp.dest(desDirLanding));
  }

});

gulp.task('landing:jsx',function() {

  var src = ['!'+rootDirLanding + '/**/*.jade'];
  
  var template = Rjade.compileFile(src);
  gulp.src(src)
      .pipe(React.render(template({local: 'values'}), document.getElementById('container')))
      .on('error', err)
      .pipe(gulp.dest(desDirLanding))
      .pipe(rename('index.php'))
      .pipe(gulp.dest(desDirLanding));
  

  var err =  function(e) {
    console.log('>>> JSX Error ',e);
  };

  console.log(isBuild);
  console.log(isWatch);
  
});

gulp.task('landing:build',function() {
  isBuild = true;
  gulp.start('landing:default');
});

gulp.task('landing:default', function() {
  runSequence(
    [
      'landing:move'
    ],
    [
      'landing:js',
      'landing:css',
      'landing:html'
     
    ]
  );
});

gulp.task('landing:watch',function() {

  browserSync = require('browser-sync').create();

  isWatch = true;
  gulp.start('landing:default');
  gulp.start('profile');

  browserSync.init({
    server : {
      baseDir : "./views/"
    }
  });

  gulp.watch([rootDirLanding + '/**/*.es6'],['landing:js']);
  gulp.watch([rootDirLanding + '/**/*.scss'],['landing:css']);
  gulp.watch([rootDirLanding + '/**/*.jade'],['landing:html']);
  //gulp.watch([rootDirLanding + '/**/*.jade'],['landing:jsx']);


});
