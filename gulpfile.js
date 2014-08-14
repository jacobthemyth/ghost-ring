var gulp         = require('gulp');
var gutil        = require('gulp-util');
var jade         = require('gulp-jade');
var directoryMap = require('gulp-directory-map');

var urlsPath = './urls.json';

gulp.task('generate-urls', function(){
  return gulp.src('dist/**/*.html')
    .pipe(directoryMap({
      filename: 'urls.json'
    }))
    .pipe(gulp.dest('somethingsomething/dangerzone'));
});

gulp.task('templates', ['generate-urls'], function(){
  return gulp.src('app/templates/**/*.jade')
    .pipe(jade({
      basedir: 'app',
      data: {urls: require(urlsPath)}
    }))
    .pipe(gulp.dest('dist'))
    .on('error', gutil.log)
});

gulp.task('build', ['templates'])
