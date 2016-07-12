var gulp = require('gulp'),
	gulpTypescript = require('gulp-typescript'),
	gulpSourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	del = require('del');

var appDev = 'src/app/',
	appProd = 'public/app/',
	prodStyles = 'public/stylesheets/',
	assets = 'src/assets/',
	vendor = 'public/libs/',
	tsconfig = gulpTypescript.createProject('tsconfig.json'),
	processors = [autoprefixer, cssnano],
	libsFiles = ['@angular', '@angular2-material', 'core-js', 'reflect-metadata', 'rxjs', 'systemjs', 'zone.js'];

gulp.task('build-libs', function () {
	for (var i = 0; i <= libsFiles.length; i++) {
		gulp.src('node_modules/' + libsFiles[i] + '/**')
			.pipe(gulp.dest(vendor + '/' + libsFiles[i]));
	}
});

gulp.task('build-ts', function() {
	return gulp.src(appDev + '/**/*.ts')
		.pipe(gulpSourcemaps.init())
		.pipe(gulpTypescript(tsconfig))
		.pipe(gulpSourcemaps.write())
		.pipe(gulp.dest(appProd));
});

gulp.task('build-copy', function() {
	return gulp.src([appDev + '**/*.html'])
		.pipe(gulp.dest(appProd));
});

gulp.task('build-global-css', function () {
	return gulp.src(assets + 'scss/main.scss')
		.pipe(gulpSourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulpSourcemaps.write())
		.pipe(gulp.dest(prodStyles));
});

gulp.task('build-component-css', function () {
	return gulp.src(appDev + '**/*.scss')
		.pipe(gulpSourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulpSourcemaps.write())
		.pipe(gulp.dest(appProd));
});

gulp.task('clean', function() {
	del(appProd + '/**/*');
});

gulp.task('watch', function() {
	gulp.watch(appDev + '**/*.ts', ['build-ts']);
	gulp.watch(appDev + '**/*.html', ['build-copy']);
	gulp.watch(assets + 'scss/**/*.scss', ['build-global-css']);
	gulp.watch(appDev + '**/*.scss', ['build-component-css']);
});

gulp.task('default', ['watch', 'build-ts', 'build-copy', 'build-global-css', 'build-component-css', 'build-libs']);
gulp.task('build', ['build-ts', 'build-copy', 'build-global-css', 'build-component-css', 'build-libs']);

