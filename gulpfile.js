const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp');
// clean
const del = require('del');
// less
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const gcmq = require('gulp-group-css-media-queries');
// js
const webpackStream = require('webpack-stream');
// browserSync
const browserSync = require('browser-sync').create();
// error
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
// map
const sourcemaps = require('gulp-sourcemaps');

/**
 * copy
 */
const copy = () => {
  return src('src/coverage/*.js')
    .pipe(dest('build/js'));
}
exports.copy = copy;

/**
 * clean
 */
const clean = () => {
  return del('build');
}
exports.clean = clean;

/**
 * less
 */
const lessToCss = () => {
  return src('src/less/style.less')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'Less',
          message: err.message
        }
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(gcmq())
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
}
exports.lessToCss = lessToCss;

/**
 * html
 */
const htmlTo = () => {
  return src('src/*.html')
    .pipe(dest('build'))
    .pipe(browserSync.stream());
}
exports.htmlTo = htmlTo;

/**
 * scripts
 */
const scripts = () => {
  return src('./src/js/main.js')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'js',
          message: err.message
        }
      })
    }))
    .pipe(webpackStream({
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }]
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(dest('build/js'))
    .pipe(browserSync.stream());
}
exports.scripts = scripts;

/**
 * browserSync
 */
const server = () => {
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  });

  watch('src/less/**/*.less', lessToCss);
  watch('src/*.html', htmlTo);
  watch('src/js/**/*.js', scripts);
}
exports.server = server;

/**
 * default
 */
exports.default = series(clean, parallel(copy, lessToCss, scripts, htmlTo), server);

/**
 * images
 */
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');

// webp_convert
const webp_convert = () => {
  return src(['src/img/*.+(png|jpg)'])
    .pipe(webp())
    .pipe(dest('src/img/'));
}
exports.webp_convert = webp_convert;

// opti_img
const opti_img = () => {
  return src(['src/img/**/**'])
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(dest('src/img/'));
}
exports.opti_img = opti_img;

/**
 * fonts
 */
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');

const fonts = () => {
  src(['resource/fonts/*.ttf'])
    .pipe(dest('build/fonts/'));
  src(['resource/fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(dest('build/fonts/'));
  return src(['resource/fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(dest('build/fonts/'));
}
exports.fonts = fonts;

/**
 * build
 */
/**
 * less to build
 */

const lessToCssBuild = () => {
  return src('src/less/style.less')
    .pipe(less())
    .pipe(dest('build/css'))
}
exports.lessToCssBuild = lessToCssBuild;

/**
 * scripts to build
 */
const scriptsBuild = () => {
  return src('./src/js/main.js')
    .pipe(webpackStream({
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }]
      }
    }))
    .pipe(dest('build/js'));
}
exports.scriptsBuild = scriptsBuild;

/**
 * html to build
 */
const htmlToBuild = () => {
  return src('src/*.html')
    .pipe(dest('build'))
}
exports.htmlToBuild = htmlToBuild;

exports.build = series(clean, parallel(copy, lessToCssBuild, scriptsBuild, htmlToBuild));


const cssBuild = () => {
  return src('src/coverage/build.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ['last 3 versions']
    }))
    .pipe(gcmq())
    .pipe(csso())
    .pipe(dest('build/css'))
}
exports.cssBuild = cssBuild;
