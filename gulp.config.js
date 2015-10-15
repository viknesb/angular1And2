var GulpConfig = (function() {
	function gulpConfig() {
		
		this.sourceDir = './src';
		this.appDir = this.sourceDir + '/app';
		this.tmpDir = './tmp';
		this.bowerDir = this.sourceDir + '/bower_components';
		this.buildDir = './build';
		
		this.indexHTMLFileName = 'index.html';
		this.indexHTMLFile = this.sourceDir + '/' + this.indexHTMLFileName;
		this.htmlTemplates = [this.sourceDir + '/**/*.html', '!' + this.indexHTMLFile, '!' + this.bowerDir];
		
		this.templatesFileName = 'templates.js';
		this.templatesFile = this.tmpDir + '/' + this.templatesFileName;
		
		// Order matters here
		this.appJSFile = [this.appDir + '/app.js', this.appDir + '/app.controllers.js'];
		this.appCSSFile = this.sourceDir + '/css/**/*.css';
		
		this.appTSFile = [this.appDir + '/app.ts', this.appDir + '/app.controllers.ts'];
		this.tsConfig = this.sourceDir + '/tsconfig.json';
		this.tsdFile = this.sourceDir + '/typings/tsd.d.ts'; 
	}
	return gulpConfig;
})();

module.exports = GulpConfig;