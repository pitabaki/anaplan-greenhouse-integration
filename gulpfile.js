var gulp = require('gulp'),
	minify = require('gulp-minify'),
	watch = require('gulp-watch'),
	log = require('fancy-log');



//Production Path
var productionJSPath = 'prod/assets/js/*.js';

//Distribution Path
var distributionJSPath = 'dist/js/';


//Individual Tasks

gulp.task('jsMinify', function(){
	return gulp.src(productionJSPath)
		.pipe(watch(productionJSPath))
		.pipe(minify({
			ext:{
				src: '.js',
				min: '-min.js'
			}
		}))
		.on('pipe', function(){ log('Done!'); })
		.pipe(gulp.dest(distributionJSPath))
});

gulp.task('jsTask', function(){
	return gulp.src(productionJSPath)
		.pipe(minify({
			ext:{
				src: '.js',
				min: '-min.js'
			}
		}))
		.on('pipe', function(){ log('Done!'); })
		.pipe(gulp.dest(distributionJSPath))
});