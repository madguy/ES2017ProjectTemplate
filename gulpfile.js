/* eslint no-console: 0, spaced-comment: 0, no-invalid-this: 0 */
'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const sourcemaps = require('gulp-sourcemaps');
const sequence = require('run-sequence');
const del = require('del');
const config = require('./gulp.config');

gulp.task('clean:js', (next) => {
	del([`${config.paths.dist.js}/**/*.min.js`, `${config.paths.dist.js}/**/*.map`], next);
});

gulp.task('clean:css', (next) => {
	del([`${config.paths.dist.css}/**/*.css`, `${config.paths.dist.css}/**/*.map`], next);
});

gulp.task('clean', ['clean:js', 'clean:css']);

gulp.task('compile:js', () => {
	return gulp.src([`${config.paths.src.js}/*.js`, `!${config.paths.src.js}/**/*.min.js`])
		.pipe(plumber())
		.pipe(named())
		.pipe(webpack(config.webpack))
		.pipe(gulp.dest(config.paths.dist.js));
});

gulp.task('compile:css', () => {
	return gulp.src(`${config.paths.src.css}/**/*.{scss, sass}`)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass(config.sass)).on('error', function (err) {
			gutil.log(err);
			this.emit('end');
		})
		.pipe(postcss([
			cssnext({ browsers: 'last 2 versions' })
		]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.paths.dist.css));
});

gulp.task('build', (next) => {
	sequence(['compile:js', 'compile:css'], next);
});

gulp.task('watch:js', ['compile:js'], () => {
	gulp.watch([`${config.paths.src.js}/**/*.js`, `!${config.paths.src.js}/**/*.min.js`], ['compile:js']);
});

gulp.task('watch:css', ['compile:css'], () => {
	gulp.watch(`${config.paths.src.css}/**/*.{scss, sass}`, ['compile:css']);
});

gulp.task('watch', (next) => {
	sequence('build', ['watch:js', 'watch:css'], next);
});
