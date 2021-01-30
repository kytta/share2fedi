const gulp = require('gulp');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const terser = require('gulp-terser');

sass.compiler = require('sass');

function html() {
	return gulp.src('./src/index.pug')
		.pipe(pug())
		.pipe(gulp.dest('./dist/'));
}

function css() {
	return gulp.src('./src/style/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(postcss([require('autoprefixer'), require('cssnano')]))
		.pipe(gulp.dest('./dist/'));
}

function js() {
	return gulp.src('./src/script/index.js')
		.pipe(terser({ ecma: 5 }))
		.pipe(gulp.dest('./dist/'));
}

function static() {
	return gulp.src('./src/static/**/*')
		.pipe(gulp.dest('./dist/'));
}

exports.default = gulp.parallel(html, css, js, static);

exports.watch = () => {
	gulp.watch('./src/index.pug', html);
	gulp.watch('./src/style/*.scss', css);
	gulp.watch('./src/script/index.js', js);
	gulp.watch('./src/static/*', static);
}
