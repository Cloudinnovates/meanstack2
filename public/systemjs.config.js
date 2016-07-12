var map = {
    'app': 'app',
    'rxjs': 'libs/rxjs',
    '@angular': 'libs/@angular',
    'angular2-in-memory-web-api': 'libs/angular2-in-memory-web-api',
	'@angular2-material': 'libs/@angular2-material'
};

var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
	'@angular2-material': { defaultExtension: 'js' }
};

var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/forms',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/testing',
    '@angular/upgrade',
	'@angular2-material/core',
	'@angular2-material/toolbar'
];

packageNames.forEach(function(pkgName) {
   packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
});

var config = {
    map: map,
    packages: packages
};

System.config(config);