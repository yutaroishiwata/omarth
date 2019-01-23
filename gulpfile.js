var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var notify = require("gulp-notify");
var autoprefixer = require('gulp-autoprefixer');
var plumber = require("gulp-plumber");
var browserSync = require('browser-sync');

// PATHS
var PATHS = {
  'pug': './src/pug/*.pug',
  'pugNotRead': './src/pug/**/(_)*.pug',
  'html': './app',
  'sass': './src/sass/*.sass',
  'css': './app/css',
  'jsSrc': './src/js/*.js',
  'jsApp': './app/js',
}

// Pug
gulp.task('pug', () => {
  return gulp.src([PATHS.pug, '!' + PATHS.pugNotRead])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(PATHS.html));
});

// Sass
gulp.task('sass', function () {
  return gulp.src(PATHS.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(PATHS.css));
});

// Babel
gulp.task('babel', () =>
  gulp.src(PATHS.jsSrc)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(PATHS.jsApp))
);

// eslint
gulp.task('lint', () => {
  return gulp.src(['**/*.js','!node_modules/**'])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: PATHS.html
    }
  });
  gulp.watch(PATHS.pug, ['reload']);
  gulp.watch(PATHS.jsSrc, ['reload']);
});
gulp.task('reload', () => {
  browserSync.reload();
});

// watch
gulp.task('watch', () => {
  gulp.watch([PATHS.pug, '!' + PATHS.pugNotRead], ['pug']);
  gulp.watch([PATHS.sass], ['sass']);
  gulp.watch([PATHS.jsSrc], ['babel']);
});

// command
gulp.task('default', ['browser-sync','watch']);

