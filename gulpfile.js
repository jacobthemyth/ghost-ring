var gulp = require('gulp'),
    inject = require('gulp-inject');

gulp.task('copy-index', function () {
  return gulp.src('app/templates/pages/index.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('default', ['copy-index'], function(){
  return gulp.src('dist/**/*.html')
    .pipe(inject(gulp.src('app/templates/includes/sidebar.html'), {
      name: 'ghost-ring-header',
      transform: function (filePath, file) {
        return file.contents.toString('utf8')
      }
    }))
    .pipe(gulp.dest('dist'));
});