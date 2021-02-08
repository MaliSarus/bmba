let fileswatch = 'html,htm,txt,json,md,woff2,php' // List of files extensions for watching & hard reload

const {src, dest, parallel, series, watch} = require('gulp')
const browserSync = require('browser-sync').create()
const webpack = require('webpack-stream')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const gcmq = require('gulp-group-css-media-queries')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const rsync = require('gulp-rsync')
const del = require('del')
const wp = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const named = require('vinyl-named');
const sassGlob     = require('gulp-sass-glob')

function browsersync() {
    browserSync.init({
        proxy: "bmba",
        notify: false,
        online: true
    })
}

function scripts() {
    return src('src/assets/js/app.js')
        .pipe(webpack({
            mode: 'production',
            performance: {
                hints: false,
                maxEntrypointSize: 512000,
                maxAssetSize: 512000
            },
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['@babel/env']
                        }
                    },
                    {
                        test: /\.css$/,
                        loaders: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: './src/assets/css',
                                },
                            },
                            "css-loader"]
                    },
                ]
            },
            plugins: [
                /* Use the ProvidePlugin constructor to inject jquery implicit globals */
                // new wp.ProvidePlugin({
                //     $: "jquery",
                //     jQuery: "jquery",
                //     "window.jQuery": "jquery'",
                //     "window.$": "jquery"
                // }),
                new MiniCssExtractPlugin({
                    chunkFilename: 'plugins.css'
                })
            ]
        })).on('error', function handleError() {
            this.emit('end')
        })
        .pipe(rename('app.min.js'))
        .pipe(dest('src/assets/js'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('src/assets/sass/**/*.scss')
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: 'compact'
        }))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true, cascade: false}))
        .pipe(gcmq())
        // .pipe(rename('app.min.css'))
        .pipe(dest('src/assets/css'))
        .pipe(browserSync.stream())
}

function images() {
    return src('src/assets/img/src/**/*')
        .pipe(newer('src/assets/img/dest'))
        .pipe(imagemin())
        .pipe(dest('src/assets/img/dest'))
}

function cleanimg() {
    return del('srs/assets/img/dest/**/*', {force: true})
}

function startwatch() {
    watch('src/assets/sass/**/*', {usePolling: true}, styles);
    watch(['src/assets/js/**/*.js', '!src/assets/js/**/*.min.js'], {usePolling: true}, scripts)
    watch('src/assets/img/src/**/*.{jpg,jpeg,png,webp,svg,gif}', {usePolling: true}, images)
    watch(`src/**/*.{${fileswatch}}`, {usePolling: true}).on('change', browserSync.reload)
}

exports.assets = series(cleanimg, scripts, images)
exports.scripts = scripts
exports.styles = styles
exports.images = images
exports.cleanimg = cleanimg
exports.default = series(scripts, images, styles, parallel(browsersync, startwatch))
