const gulp = require('gulp');
const browserSync = require('browser-sync');

const server = browserSync.create();

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: './',
            open: 'local'
        }
    });
    done();
}

function watch() {
    gulp.watch('./*.html', gulp.series(reload));
}

gulp.task('default', gulp.series(serve, watch));
