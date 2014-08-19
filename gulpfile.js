var gulp = require('gulp'),
    ghostHelm = require('ghost-helm'),
    inject = require('gulp-inject');

gulp.task('inject-sidebar', ['sidebar'], function(){
  return gulp.src(config.distDir + '/**/*.html')
    .pipe(inject(gulp.src(config.sidebar), {
      name: 'ghost-ring-sidebar',
      transform: function (filePath, file) {
        return file.contents.toString('utf8')
      }
    }))
    .pipe(gulp.dest(config.distDir));
});

ghostHelm.setup({cleanDir: ['.tmp']}, gulp);
