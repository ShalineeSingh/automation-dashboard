var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');

gulp.task('generateCss', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      'browsers': ['last 3 versions', 'ie > 8', '> 1%']
    }))
    .pipe(gulp.dest('./public/app'));
});
gulp.task('watch', function () {
  gulp.watch('./scss/*.scss', ['generateCss']);
});
gulp.task('build', ['generateCss']);