import gulp from 'gulp';
import prefix from 'gulp-autoprefixer';
import clean from 'gulp-clean';
import minCss from 'gulp-clean-css';
import concat from 'gulp-concat';
import imgMin from 'gulp-imagemin';
import jsMin from 'gulp-js-minify';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sync, { watch } from 'browser-sync';
import uglify from 'gulp-uglify'
const sass = gulpSass(dartSass);

function css() {
    return gulp.src('src/style/**/**.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(minCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/style'))
}
function dev() {
    sync.init({
        server: {
            baseDir: "./"
        }
    })
    watch('src/**/**.scss', gulp.series('css')).on('change', sync.reload)
    watch('src/**/**.js', gulp.series('js')).on('change', sync.reload)
}
gulp.task('js', ()=> {
    return gulp.src('src/script/**/**.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/script'))
})
gulp.task('css', css)
gulp.task('delDist', ()=> {
    return gulp.src('dist')
    .pipe(clean())
})
gulp.task('minImg', ()=> {
    return gulp.src('src/img/**/*')
    .pipe(imgMin())
    .pipe(gulp.dest('dist/img'))

})
gulp.task('build', gulp.series('delDist', 'css', 'js', 'minImg'))
gulp.task('dev', dev)
