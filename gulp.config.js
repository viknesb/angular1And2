var GulpConfig = (function() {
	function gulpConfig() {
		
		var resolve = require.resolve;
		
		this.baseDir = '.';
		this.sourceDir = './src';
		this.appDir = this.sourceDir + '/app';
		this.buildDir = './build';
		this.tmpDir = './tmp';
		
		this.indexHTMLFileName = 'index.html';
		this.indexHTMLFile = './' + this.indexHTMLFileName;
		this.htmlTemplates = [this.sourceDir + '/**/*.html', '!' + this.indexHTMLFile];
		
		this.templatesFileName = 'templates.js';
		this.templatesFile = this.tmpDir + '/' + this.templatesFileName;
		
		// Order matters here
		this.appJSFile = [this.appDir + '/app.js', this.appDir + '/app.controllers.js'];
		this.appCSSFile = this.sourceDir + '/css/**/*.css';
		
		// Order matters here
		this.libJSFile = [resolve('jquery'),
						  resolve('angular/angular.js'),
						  resolve('angular-ui-router'),
						  resolve('systemjs/dist/system.src.js'),
						  resolve('angular2/bundles/angular2.dev.js'),
						  resolve('angular2/bundles/router.dev.js'),
						  resolve('bootstrap/dist/js/bootstrap.js')];
		
		this.libCSSFile = [resolve('bootstrap/dist/css/bootstrap.css')];
		
		this.appTSFile = [this.appDir + '/app.ts', this.appDir + '/app.controllers.ts'];
		this.tsConfig = this.sourceDir + '/tsconfig.json';
		this.tsdFile = this.sourceDir + '/typings/tsd.d.ts'; 
	}
	return gulpConfig;
})();

module.exports = GulpConfig;