var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');

gulp.task('connect', function() {
    connect.server({
        root: 'web'
    });
});

gulp.task('html', function() {
    gulp.src('./web/*.html')
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./web/assets'));
});

gulp.task('js', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./web/assets'));
});

gulp.task('watch', function() {
    gulp.watch(['./web/*.html'], ['html']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('minifying', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(concat('stylemin.css'))
        .pipe(gulp.dest('./web/assets'));
});

gulp.task('default', ['connect', 'sass', 'js', 'watch', 'minifying']);