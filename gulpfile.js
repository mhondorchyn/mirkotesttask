const { series, parallel, src, dest, watch } = require('gulp');
const dartSass = require('gulp-dart-sass');
const webpack = require('webpack-stream');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const calc = require("postcss-calc");

const path = {
    styles: {
        source: './scss/**/*.scss',
        output: './dist/css'
    },
    scripts: {
        source: './js/main.js',
        output: './dist/js'
    }
};

const postCssPlugins = [
    calc({precision: 10}),
    autoprefixer({overrideBrowserslist: ['last 1 version']}),
];

const sassConfig = {
    precision: 10,
    outputStyle: 'expanded'
};

const webpackConfig = {
    mode: 'development',
    output: {
        filename: 'main.js',
    }
};

const buildScss = (cb) => {
    const { styles } = path;

    src(styles.source)
        .pipe(sourcemaps.init())
        .pipe(dartSass(sassConfig).on('error', dartSass.logError))
        .pipe(postcss(postCssPlugins))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(styles.output));

    cb();
};

const buildJs = (cb) => {
    const { scripts } = path;

    src(scripts.source)
        .pipe(webpack(webpackConfig))
        .pipe(dest(scripts.output));

    cb();
};

const codeWatch = (cb) => {
    const { styles, scripts } = path;

    watch(styles.source, buildScss);
    watch(scripts.source, buildJs);
};

exports.build = series(buildScss, buildJs);
exports.watch = series(codeWatch);

