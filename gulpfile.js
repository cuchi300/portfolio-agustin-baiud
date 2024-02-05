const { src, dest, watch, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const purgecss = require('gulp-purgecss');

const imagemin = require('gulp-imagemin');

function css() {
    return src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( dest('build/css') )
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({optimizationLevel: 3}))
        .pipe( dest('build/img') )
}

function cssbuild() {
    return src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( purgecss({
            content: ['index.html', 'js/scroll.js', 'js/efectos.js', 'js/bootstrap.bundle.min.js'],
        }))
        .pipe( dest('build/css') )
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
    watch('build/css/app.css', cssbuild);
}

exports.css = css;
exports.imagenes = imagenes;
exports.dev = dev;
exports.cssbuild = cssbuild;
exports.default = series( css, dev);