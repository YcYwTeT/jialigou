const gulp = require('gulp');
const scss = require('gulp-sass');
const rename = require('gulp-rename');

gulp.task('scss',function(){
    gulp.src('./src/scss/*.scss')
    .pipe(scss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'));
})

gulp.task('autobuild',function(){
    gulp.watch('./src/scss/*.scss',['scss']);
})

gulp.task('default',['scss','autobuild'])