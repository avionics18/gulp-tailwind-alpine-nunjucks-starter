
const { src, dest, series, watch } = require('gulp');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');

// Tailwind css Task
function tailwindTask() {
  return src(['./src/static/css/style.css'])
    .pipe(postcss([tailwindcss, autoprefixer, cssnano]))
    .pipe(dest('./docs/static/css'));
}

// Nunjucks Templates into HTML
function njkTask() {
  return src('./src/pages/**/*.njk')
    .pipe(
      nunjucksRender({
        path: ['./src/templates'],
        data: {
          tailwindcss_path: 'static/css/style.css',
        },
      })
    )
    .pipe(dest('./docs'));
}

// Images Task
function imgTask() {
  return src('./src/static/images/*.{jpg, jpeg, png, gif, webp}')
    .pipe(dest('./docs/static/images'));
}

// BrowserSync Initialize
function bsServe(done) {
  browserSync.init({
    server: {
      baseDir: './docs',
    },
    notify: false,
  });

  done();
}

// BrowserSync Reload
function bsReload(done) {
  browserSync.reload();
  done();
}

/* === WORKFLOW ===  */

// Watch Files for Changes
function watchTask() {
  watch('./src/static/css/style.css', series(tailwindTask, bsReload));
  watch('./src/**/*.njk', series(tailwindTask, njkTask, bsReload));
  watch('./src/static/images/imgUpdate.txt', series(imgTask, bsReload));
}
exports.default = series(tailwindTask, njkTask, imgTask, bsServe, watchTask);
