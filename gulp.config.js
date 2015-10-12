var GulpConfig = (function() {
	function gulpConfig() {
		this.sourceDir = './src';
		this.indexHTML = this.sourceDir + '/index.html'; 
		this.appDir = this.sourceDir + '/app';
		this.everyJSFile = this.appDir + '/**/*.js';
		this.buildDir = './build';
		this.buildJSDir = this.buildDir + '/js';
		this.allMinJSFileName = 'all.min.js';
		this.allMinJSFile = this.buildJSDir + '/' + this.allMinJSFileName;
	}
	return gulpConfig;
})();

module.exports = GulpConfig;