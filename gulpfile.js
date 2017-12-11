const gulp = require('gulp');
const watch = require('gulp-watch');
const pug = require('gulp-pug');
const gulp_watch_pug = require('gulp-watch-pug');

const locals = require('./locals');
const { isProd } = locals;

gulp.task('default', function() {
    const watchOp = isProd ? () => gulp : watch('pug/**/*.pug');
    const pugWatch = isProd ? () => gulp : gulp_watch_pug('pug/**/*.pug', { delay: 100 });

    if (isProd) {
        return gulp.src('pug/**/index.pug')
            .pipe(pug({
                locals
            }))
            .pipe(gulp.dest('./'))
    }

    return gulp.src('pug/**/index.pug')
        .pipe(watchOp)
        .pipe(pugWatch)
        .pipe(pug({
            locals
        }))
        .pipe(gulp.dest('./'))
});