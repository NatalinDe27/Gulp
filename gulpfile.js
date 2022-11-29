// Создать приложение которые с помощью Gulp будет создаст build папку в которой будет html, css, js файлы но js файл будет переведен на стандарт ES5
const {src, dest, parallel, series, watch} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

const origin = "src";
const destination = "build";

async function clean(cb) {
    await del(destination);
    cb();
}

function html(cb) {
    src(`${origin}/*.html`).pipe(dest(destination));
    cb();
}

function css(cb) {
    src(`${origin}/*.css`).pipe(dest(destination));
    cb();
}

function js(cb) {
    src(`${origin}/*.js`)
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(dest(destination));
    cb();
}

function watch_dev(cb) {
    watch(`${origin}/*.html`).on("change", series(html, browserSync.reload));
    watch(`${origin}/*.css`).on("change", series(css, browserSync.reload));
    watch(`${origin}/*.js`).on("change", series(js, browserSync.reload));
    cb();
}

function browsersync(cb) {
    browserSync.init({
        notify: false,
        open: false,
        server: {
            baseDir: destination,
        },
    });
    cb();
}

exports.build = series(
    clean,
    parallel(
        html,
        css,
        js),
    watch_dev,
    browsersync
);



