var gulp = require('gulp'),
	// Loads glup plugins dynamically. Avoids doing a require for every plugin we use
	glp = require('gulp-load-plugins')({ lazy:true }),
	Config = require('./gulp.config'),
	config = new Config(),
	rm = require('rimraf');
	
// Clean up the build directory
gulp.task('clean', function (done) {
	rm(config.buildDir, done);
});

// Look for Javascript code problems.
gulp.task('vet', function() {
	return gulp.src(config.everyJSFile)
		.pipe(glp.jshint())
		.pipe(glp.jshint.reporter('jshint-stylish'), {verbose: true});
});

// Concat and minify the code
gulp.task('js-min', function() {
	return gulp.src(config.everyJSFile)
		.pipe(glp.sourcemaps.init())
		.pipe(glp.concat(config.allMinJSFileName))
		.pipe(glp.uglify())
		.pipe(glp.sourcemaps.write('.',{includeContent: false}))
		.pipe(gulp.dest(config.buildJSDir));
});

// Inject Minified or All JS files into index.html
gulp.task('inject-index', ['js-min'], function () { 
  var sources = gulp.src([config.allMinJSFile], {read: false});
  return gulp.src(config.indexHTML)
  			.pipe(glp.inject(sources))
    		.pipe(gulp.dest(config.sourceDir));
});

// default task
gulp.task('default', ['clean', 'vet', 'inject-index']);
