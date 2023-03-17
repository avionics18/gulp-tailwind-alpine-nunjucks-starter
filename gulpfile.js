const { src, dest, series, watch } = require('gulp');
const mode = require('gulp-mode')();
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');

// Tailwind css Task
function tailwindTask() {
  const processors = mode.production() ? [tailwindcss, autoprefixer, cssnano] : [tailwindcss];

  return src(['./src/static/css/style.css'])
    .pipe(postcss(processors))
    .pipe(dest('./docs/static/css'));
}

// Nunjucks Templates into HTML
const manageEnvironment = function(environment) {
  // Base URL
  let baseURL;
  if(mode.production()) {
    baseURL = 'https://avionics18.github.io/gulp-tailwind-alpine-nunjucks-starter';
  } else {
    baseURL = 'http://localhost:3000';
  }
  environment.addGlobal('baseURL', baseURL);

  // Brand Name
  environment.addGlobal('brandTitle', 'self study 101');
}

function njkTask() {
  return src('./src/pages/**/*.njk')
    .pipe(
      nunjucksRender({
        path: ['./src/templates'],
        manageEnv: manageEnvironment,
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
exports.default = mode.production() ? series(tailwindTask, njkTask, imgTask) : series(tailwindTask, njkTask, imgTask, bsServe, watchTask);
