var gulp         = require('gulp');
var jade         = require('gulp-jade');
var directoryMap = require('gulp-directory-map');

gulp.task('generate-sidebar', function(){
  var fakeUrls = {
    "index.html": "index.html",
    "relatives": {
      "index.html": "relatives/index.html"
    }
  };

  gulp.src('app/sidebar.jade')
});

var print = require('gulp-print');

gulp.task('generate-urls', function(){
  gulp.src('sites/**/*.html')
    .pipe(print())
    .pipe(directoryMap({
      filename: 'urls.json'
    }))
    .pipe(gulp.dest('.tmp'));
});
