const mix = require('laravel-mix');

// Public path helper
const publicPath = path => `${mix.config.publicPath}/${path}`;

// Source path helper
const src = path => `assets/${path}`;

// Public Path
mix
  .setPublicPath('web/assets/dist')
  // .setResourceRoot(`/app/themes/sage/${mix.config.publicPath}/`)
  // .webpackConfig({
  //   output: { publicPath: mix.config.resourceRoot }
  // });

// Browsersync
mix.browserSync('onward.localhost');

// Styles
mix.sass(src`styles/main.scss`, 'styles')
   .sass(src`styles/print.scss`, 'styles');

// JavaScript
mix.js(src`scripts/main.js`, 'scripts')
   .extract();

// Assets
mix.copyDirectory(src`images`, publicPath`images`)
   .copyDirectory(src`fonts`, publicPath`fonts`)
   .copyDirectory(src`svgs`, publicPath`svgs`);

// Autoload
// mix.autoload({
//   jquery: ['$', 'window.jQuery'],
// });

// Options
mix.options({
  processCssUrls: false,
});

// Source maps when not in production.
mix.sourceMaps(false, 'source-map');

// Hash and version files in production.
mix.version();
mix.version([publicPath`images`]);
