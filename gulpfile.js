var gulp = require('gulp'),
	// Loads glup plugins dynamically. Avoids doing a require for every plugin we use
	glp = require('gulp-load-plugins')({ lazy:true }),
	Config = require('./gulp.config'),
	config = new Config(),
	del = require('del'),
	browserSync = require('browser-sync'),
	wiredep = require('wiredep').stream;
	
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

/*gulp.task('lib-gen', function() {		
	var v =  browserify();
	return v.add('./src/app/lib.def.js')
        .bundle()
        .pipe(source(config.libJSFileName))
        .pipe(gulp.dest(config.libDir));
});*/


// Create $templateCache from the html templates
gulp.task('template-cache', ['clean'], function() {

    return gulp
        .src(config.htmlTemplates)
		// While minification do not remove empty attributes
        .pipe(glp.minifyHtml({ empty:true }))
		// Creates a module called 'templates' and puts the HTML as JS within it.
        .pipe(glp.angularTemplatecache(config.templatesFileName, {standalone: true}))
        .pipe(gulp.dest(config.tmpDir));
});

// Wiring the bower dependencies into the html
// Also injecting our application JS and CSS
gulp.task('wire-dep', function() {

    return gulp
        .src(config.indexHTMLFile)
        .pipe(wiredep({ directory: config.bowerDir }))
        .pipe(inject(config.appJSFile))
		.pipe(inject(config.appCSSFile))
        .pipe(gulp.dest(config.sourceDir));
});

// Concat and minify the JS code
gulp.task('minify', ['clean', 'wire-dep', 'template-cache'], function() {
	
	var assets = glp.useref.assets();
    // Filters are named for the gulp-useref path
	// It looks for build tags with the given pattern
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
	process.stdout.write('Starting browserSync...\n');
	browserSync({
		port: 8080,
		files: ['**/*.html', '**/*.js', '**/*.css'],
		injectChanges: true,
		logFileChanges: false,
		logLevel: 'silent',
		notify: true,
		reloadDelay: 0,
		server: {
		  baseDir: isDev ? './' : './build',
          routes: {
            "/": "src"
          }
		}
	});
}

// Start server and serve dev build
gulp.task('serve-dev', ['wire-dep'], function() {
	var isDev = true;
    startServer(isDev);
});

// Start server and serve prod build
gulp.task('serve-prod', ['minify'], function() {
	var isDev = false;
    del(config.tmpDir);
    startServer(isDev);
});

gulp.task('dev', ['clean', 'vet', 'serve-dev']);
gulp.task('prod', ['clean', 'serve-prod']);
// default task
gulp.task('default', ['dev']);