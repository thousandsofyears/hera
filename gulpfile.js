'use strict';

const gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    rev = require('gulp-rev-hash'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    requirejs = require('gulp-requirejs-optimize'),
    del = require('del');


var config = {
    dist: 'static/dist',
    src: 'static',
    scripts: ['static/scripts/**/*.js'],
    css: ['static/css/**/*.css'],
    less: ['static/less/**/*.less'],
    images: ['static/images/**/*'],
    fonts: ['static/fonts/**/*'],
    htmls: ['static/html/**/*.html'],
}


gulp.task('clean', function(){
    return del([config.dist, path.join(config.src, 'css')]);
});


gulp.task('less', function () {
  return gulp.src(config.less)
    .pipe(less())
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(gulp.dest(path.join(config.src, 'css')));
}); 


gulp.task('css', function () {
  return gulp.src(config.css)
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.join(config.dist, 'styles')));
}); 

gulp.task('scripts', function () {
    return gulp.src(config.scripts)
        .pipe(requirejs())
        .pipe(gulp.dest(path.join(config.dist, 'scripts')));
});


gulp.task('watch', function() {
  gulp.watch(config.scripts);
  gulp.watch(config.less, ['less']);
  gulp.watch(config.css);
  gulp.watch(config.images);
  gulp.watch(config.fonts);
  gulp.watch(config.htmls);
});

gulp.task('connect', function() {
  connect.server({
      root: 'static',
      livereload: true
    });
});

gulp.task('html', function () {
  gulp.src(config.htmls)
    .pipe(connect.reload());
});

gulp.task('server', ['clean', 'less', 'connect', 'watch']);

gulp.task('build', ['clean', 'css'])
