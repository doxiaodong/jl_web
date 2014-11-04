var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	del = require('del');

// srcs
var lessSrc = 'public/less/index.less';
var cssSrc = 'public/css';

var jsSrc = 'public/js/pages/index.js';
var jsMainSrc = 'public/js';

// tasks
gulp.task('less', function() {
	return gulp.src(lessSrc)
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(gulp.dest(cssSrc))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(sourcemaps.write('./map'))
	.pipe(gulp.dest(cssSrc))
});

gulp.task('js', function() {
	return gulp.src(jsSrc)
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(jsMainSrc))
});

gulp.task('clean', function(cb) {
	del([cssSrc], cb);
});

gulp.task('watch', function() {
	gulp.watch(lessSrc, ['less']);
	gulp.watch(jsSrc, ['js']);
});

gulp.task('default', ['clean'], function() {
	gulp.start('watch');
});