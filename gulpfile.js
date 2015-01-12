// modules
var gulp = require('gulp'),
	less = require('gulp-less-sourcemap'),
	sourcemaps = require('gulp-sourcemaps'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	del = require('del');

// paths
var paths = {
	less: {
		less: 'public/less/index.less',
		lesses: 'public/less/**.less', 
	},
	css: 'public/css',
	js: {
		jses: 'public/js/pages/**.js',
		main: 'public/js'
	}
}

// tasks
gulp.task('less', function() {
	return gulp.src(paths.less.less)
	.pipe(less())
	.pipe(gulp.dest(paths.css))
});

gulp.task('js', function() {
	return gulp.src(paths.js.jses)
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(sourcemaps.init())
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest(paths.js.main))
});

gulp.task('clean', function(cb) {
	del([paths.css], cb);
});

gulp.task('watch', function() {
	gulp.watch(paths.less.lesses, ['less']);
	gulp.watch(paths.js.jses, ['js']);
});

gulp.task('default', ['clean'], function() {
	gulp.start('js', 'less');
});