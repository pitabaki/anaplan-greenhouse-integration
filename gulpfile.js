var gulp = require('gulp'),
	minify = require('gulp-minify');



//Production Path
var productionJSPath = 'prod/assets/js/*.js';

//Distribution Path
var distributionJSPath = 'dist/js/';


//Individual Tasks

gulp.task('jsMinify', function(){
	return gulp.src(productionJSPath)
		.pipe(minify({
			ext:{
				src: '.js',
				min: '-min.js'
			}
		}))
		.pipe(gulp.dest(distributionJSPath));
});

//Grouped Tasks
gulp.task('god', ['jsMinify']);