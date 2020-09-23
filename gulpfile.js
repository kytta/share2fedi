const gulp = require('gulp');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const terser = require('gulp-terser');

sass.compiler = require('sass');

function html() {
    return gulp.src('./src/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./dist/'));
}

function css() {
    return gulp.src('./src/style/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([require('autoprefixer'), require('cssnano')]))
        .pipe(gulp.dest('./dist/'));
}

function js() {
    return gulp.src('./src/script/index.js')
        .pipe(terser({ ecma: 5 }))
        .pipe(gulp.dest('./dist/'));
}

exports.default = gulp.parallel(html, css, js);

exports.watch = () => {
    gulp.watch('./src/**/*.pug', html);
    gulp.watch('./src/style/**/*.scss', css);
    gulp.watch('./src/script/**/*.js', js);
}