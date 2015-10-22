var gulp = require('gulp'),
	// Loads glup plugins dynamically. Avoids doing a require for every plugin we use
	glp = require('gulp-load-plugins')({ lazy:true }),
	Config = require('./gulp.config'),
	config = new Config(),
	del = require('del'),
	browserSync = require('browser-sync'),
	wiredep = require('wiredep').stream,
    tsProject = glp.typescript.createProject(config.tsConfig);
	
// Clean up the build directory
gulp.task('clean', function (done) {
	return del([config.buildDir, config.tmpDir], done);
});

// Look for Javascript code problems.
gulp.task('vet', function() {
	return gulp.src(config.appJSFile)
		.pipe(glp.jshint())
		.pipe(glp.jshint.reporter('jshint-stylish'), {verbose: true});
});

gulp.task('ts-lint', function () {
    return gulp.src(config.appTSFile)
                .pipe(glp.tslint())
                .pipe(glp.tslint.report('prose'));
});


// Compile TypeScript and include references to library and app .d.ts files.
gulp.task('compile-ts', function () {
    var sourceTsFiles = [].concat(config.appTSFile, //path to typescript files
                         [config.tsdFile]); //reference to library .d.ts files
                        
    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(glp.sourcemaps.init())
                       .pipe(glp.typescript(tsProject));

    tsResult.dts.pipe(gulp.dest(config.appDir));
    return tsResult.js
            .pipe(glp.sourcemaps.write('.'))
            .pipe(gulp.dest(config.appDir));
});

// Remove all generated JavaScript files from TypeScript compilation
gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [
        config.appDir +'/**/*.js',    // path to all JS files auto gen'd by editor
        config.appDir +'/**/*.js.map', // path to all sourcemap files auto gen'd by editor
        '!' + config.appDir + '/lib.def.js'
      ];
  del(typeScriptGenFiles, cb);
});

gulp.task('watch', function() {
    gulp.watch([config.appTSFile], ['ts-lint', 'compile-ts']);
});

// Create $templateCache from the html templates
gulp.task('template-cache', ['clean'], function() {

    return gulp
        .src(config.htmlTemplates)
		// While minification do not remove empty attributes
        .pipe(glp.minifyHtml({ empty:true }))
		// Creates a module called 'templates' and puts the HTML as JS within it.
        .pipe(glp.angularTemplatecache(config.templatesFileName, {root: 'src/', standalone: true}))
        .pipe(gulp.dest(config.tmpDir));
});


gulp.task('inject', function() {
    
    return gulp
        .src(config.indexHTMLFile)
        .pipe(inject(config.libJSFile, 'libjs'))
        .pipe(inject(config.libCSSFile, 'libcss'))
		.pipe(inject(config.appJSFile))
		.pipe(inject(config.appCSSFile))
        .pipe(gulp.dest(config.baseDir));
});

// Concat and minify the JS code
gulp.task('minify', ['clean', 'inject', 'template-cache'], function() {
	
	var assets = glp.useref.assets();
    // Filters are named for the gulp-useref path
	// It looks for build tags in index.html with the given pattern
    var cssFilter = glp.filter('**/all.css');
    var jsAppFilter = glp.filter('**/app.js');
    var jsLibFilter = glp.filter('**/lib.js');

    return gulp
        .src(config.indexHTMLFile)
        .pipe(inject(config.templatesFile, 'templates'))
        .pipe(assets) // Gather all assets from the html with useref
        // Get the css
		.pipe(cssFilter)
        .pipe(glp.minifyCss())
        .pipe(cssFilter.restore())
		// Get the library js files
        .pipe(jsLibFilter)
        .pipe(glp.uglify())
        .pipe(jsLibFilter.restore())
        // Get the app js files
        .pipe(jsAppFilter)
		// Annotate the autoinjected instances in controllers, etc.
        .pipe(glp.ngAnnotate())
		.pipe(glp.uglify())
        .pipe(jsAppFilter.restore())
        // Apply the concat, minification and file replacement with useref
        .pipe(assets.restore())
        .pipe(glp.useref())
        .pipe(gulp.dest(config.buildDir));
});

function inject(src, label) {
    var options = {read: false, relative: true};
	if (label) {
        options.name = 'inject:' + label;
    }
    return glp.inject(gulp.src(src), options);
}

function startServer(isDev) {
	console.log('Starting browserSync...\n');
	browserSync({
		port: 8080,
		files: isDev ? ['**/*.html', '**/*.ts', '**/*.js', '**/*.css'] : [],
		injectChanges: true,
		logFileChanges: false,
		logLevel: 'silent',
		notify: true,
		reloadDelay: 1000,
		server: {
		  baseDir: isDev ? '.' : config.buildDir
		}
	});
}

// Start server and serve dev build
gulp.task('serve-dev', ['dev', 'watch'], function() {
	var isDev = true;
    startServer(isDev);
});

// Start server and serve prod build
gulp.task('serve-prod', ['prod'], function() {
	var isDev = false;
    del(config.tmpDir);
    startServer(isDev);
});

gulp.task('dev', ['clean', 'vet', 'inject']);
gulp.task('prod', ['clean', 'minify']);

// default task
gulp.task('default', ['dev']);