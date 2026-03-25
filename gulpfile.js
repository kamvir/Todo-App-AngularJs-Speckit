var gulp = require('gulp');

function build(done) {
  done();
}

function watchFiles() {
  gulp.watch(['app/**/*.js', 'app/**/*.html', 'app/styles/**/*.css'], build);
}

exports.build = build;
exports.watch = watchFiles;
exports.test = build;
exports.lint = build;
var defaultTask = gulp.series(build);
exports.default = defaultTask;
