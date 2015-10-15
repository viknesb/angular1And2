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
	}
	return gulpConfig;
})();

module.exports = GulpConfig;