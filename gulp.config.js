var GulpConfig = (function() {
	function gulpConfig() {
		
		this.sourceDir = './src';
		this.appDir = this.sourceDir + '/app';
		this.tmpDir = './tmp';
		this.bowerDir = './bower_components';
		
		this.indexHTMLFileName = 'index.html';
		this.indexHTMLFile = this.sourceDir + '/' + this.indexHTMLFileName;
		this.htmlTemplates = [this.sourceDir + '/**/*.html', '!' + this.indexHTMLFile];
		
		this.templatesFileName = 'templates.js';
		this.templatesFile = this.tmpDir + '/' + this.templatesFileName;
		
		this.buildDir = './build';
		this.buildJSDir = this.buildDir + '/js';
		this.buildCSSDir = this.buildDir + '/css';
		
		// Order matters here
		this.appJSFile = [this.appDir + '/app.js', this.appDir + '/app.controllers.js'];
		
		this.appCSSFile = this.sourceDir + '/**/*.css';
	}
	return gulpConfig;
})();

module.exports = GulpConfig;