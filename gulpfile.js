var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
concat = require('gulp-concat'),
pug = require('gulp-pug'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload,
del = require('del'),
cleanCSS = require('gulp-clean-css'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin');

gulp.task('sass', function() {
	return gulp.src('./app/scss/style.scss')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(autoprefixer())
	.pipe(gulp.dest('./app/css'))
	.pipe(reload({stream: true}));
});

gulp.task('script', function() {
	return gulp.src([
			'./app/libs/jquery-3.2.1.min.js',
			'./app/libs/jquery-ui-slider/jquery-ui.min.js',
			'./app/libs/slick-1.8.0/slick/slick.js',
			'./app/libs/lightbox2-master/dist/js/lightbox.js',
			'./app/libs/N.js',
			'./app/js/modules/**/*.js'
		])
	.pipe(concat('index.js', {newLine: '\r\n;'}))
	.pipe(gulp.dest('./app/js'))
	.pipe(reload({stream: true}));
});

gulp.task('pug', function() {
  return gulp.src('./app/pug/**/*.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('./app'));
});

gulp.task('watch', ['sass', 'script', 'pug'], function() {
	browserSync.init({
		server: {
			baseDir: './app'
		},
		notify: false
	});

	gulp.watch('./app/scss/**/*.scss', ['sass']);
	gulp.watch('./app/pug/**/*.pug', ['pug-watch']);
	gulp.watch('./app/js/modules/**/*.js', ['script']);
	gulp.watch('./app/pug/**/*.html', ['pug-watch']);
	gulp.watch('./app/pug/**/*.svg', ['pug-watch']);
});

gulp.task('pug-watch', ['pug'], function() {
	return reload();
});

gulp.task('clean', function() {
	return del.sync('./dist')
});

gulp.task('build', ['clean', 'pug', 'sass', 'script'], function() {
	var buildCss = gulp.src('./app/css/*.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('./dist/css'));

	var buildFonts = gulp.src('./app/fonts/**/*')
	.pipe(gulp.dest('./dist/fonts'));

	var buildJs = gulp.src('./app/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));

	var buildHtml = gulp.src('./app/*.html')
	.pipe(gulp.dest('./dist'));

	var buildImg = gulp.src('./app/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/img'));
});