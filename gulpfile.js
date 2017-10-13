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
	del([`${config.paths.js.dist}/**/*.min.js`, `${config.paths.js.dist}/**/*.map`], next);
});

gulp.task('clean:css', (next) => {
	del([`${config.paths.css.dist}/**/*.css`, `${config.paths.css.dist}/**/*.map`], next);
});

gulp.task('clean', ['clean:js', 'clean:css']);

gulp.task('compile:js', () => {
	return gulp.src([`${config.paths.js.src}/*.js`, `!${config.paths.js.src}/**/*.min.js`])
		.pipe(plumber())
		.pipe(named())
		.pipe(webpack(config.webpack))
		.pipe(gulp.dest(config.paths.js.dist));
});

gulp.task('compile:css', () => {
	return gulp.src(`${config.paths.css.src}/**/*.{scss, sass}`)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass(config.sass)).on('error', function (err) {
			gutil.log(err);
			this.emit('end');
		})
		.pipe(postcss([
			cssnext({ browsers: config.postcss.browsers })
		]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.paths.css.dist));
});

gulp.task('build', (next) => {
	sequence(['compile:js', 'compile:css'], next);
});

gulp.task('watch:js', ['compile:js'], () => {
	gulp.watch([`${config.paths.js.src}/**/*.js`, `!${config.paths.js.src}/**/*.min.js`], ['compile:js']);
});

gulp.task('watch:css', ['compile:css'], () => {
	gulp.watch(`${config.paths.css.src}/**/*.{scss, sass}`, ['compile:css']);
});

gulp.task('watch', (next) => {
	sequence('build', ['watch:js', 'watch:css'], next);
});
