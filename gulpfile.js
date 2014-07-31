var gulp         = require('gulp');
var jade         = require('gulp-jade');
var directoryMap = require('gulp-directory-map');

var urlsPath = './urls.json';

gulp.task('generate-urls', function(){
  gulp.src('sites/**/*.html')
    .pipe(directoryMap({
      filename: 'urls.json'
    }))
    .pipe(gulp.dest('somethingsomething/dangerzone'));
});

gulp.task('copy-sites', function(){
  gulp.src('sites/**/*')
  .pipe(gulp.dest('dist'))
});

gulp.task('templates', ['generate-urls'], function(){
  gulp.src('app/templates/**/*.jade')
    .pipe(jade({
      basedir: 'app',
      data: {urls: require(urlsPath)}
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['templates', 'copy-sites'])

//     __                 __       __
//    / /___  _________ _/ /  ____/ /__ _   __
//   / / __ \/ ___/ __ `/ /  / __  / _ \ | / /
//  / / /_/ / /__/ /_/ / /  / /_/ /  __/ |/ /
// /_/\____/\___/\__,_/_/   \__,_/\___/|___/

// Mostly the same ol' same ol' local dev tasks you know and love.
gulp.task('connect', function () {
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = connect()
    .use(require('connect-livereload')({ port: 35729 }))
    .use(serveStatic('dist'))
    .use(serveIndex('dist'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://0.0.0.0:9000');
    });
});

gulp.task('serve', ['connect', 'build'], function () {
  require('opn')('http://0.0.0.0:9000');
});

gulp.task('watch', ['connect', 'serve'], function () {
  var server = require('gulp-livereload')();

  // watch for changes

  gulp.watch([
    'app/*.html',
  ]).on('change', function (file) {
    server.changed(file.path);
  });

  gulp.watch('app/**/*.jade', ['templates']);
});
