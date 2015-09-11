import gulp from 'gulp';
import mocha from 'gulp-mocha';
import sourceMaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import babelify from 'babelify';
import babel from 'gulp-babel';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import streamify from 'gulp-streamify';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';


gulp.task('test', function(done){
    return gulp.src(['*_test.js'], {read: false})
            .pipe(mocha({reporter: 'spec'}));
});

gulp.task('dev', ['build'], () => {
    gulp.watch(['**/*.js', '!app.js', '!**/*_test.js', '!gulpfile.js'], ['build']);
});

gulp.task('build', () => {
    let bundler = browserify({ debug: true }),
        b;

    bundler.transform(babelify);
    bundler.add('./index.js');

    b = bundler.bundle()
        .on('error', gutil.log)
        .pipe(source('./index.js'))
        .pipe(gulp.dest('../'))
        .pipe(streamify(uglify()))
        .pipe(rename('bernstein.min.js'))
        .pipe(gulp.dest('./dist'));

    gulp.src('./index.js')
        .pipe(babel())
        .pipe(rename('bernstein.cjs.js'))
        .pipe(gulp.dest('./dist'));

    return gulp.src('./index.js')
            .pipe(rename('bernstein.es6.js'))
            .pipe(gulp.dest('./dist'));
});
