var gulp  = require('gulp'),
    rsync  = require('gulp-rsync'),
    elixir = require('laravel-elixir');

var theme = 'abcdwedding';
elixir.config.assetsPath = './';

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Statamic theme. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass(theme + '.scss', 'css/' + theme + '.css');

    mix.scripts([
        'vendor/bootstrap.min.js'
    ], './js/' + theme + '.js');
    

    mix.browserSync({
      files: [
        'sass/**/*'
      ],
      proxy: 'abcdwedding.dev',
      reloadDelay: 2000
    });

});


// Configure deployment settings
function deploy() {
  return gulp.src('.')
    .pipe(rsync({
      hostname: 'web509.webfaction.com',
      destination: '~/webapps/abcdwedding',
      root: '.',
      username: 'mikemartin',
      incremental: true,
      progress: false,
      relative: true,
      emptyDirectories: true,
      recursive: true,
      clean: true,
      exclude: [
        '.DS_Store',
        'node_modules',
        'sass'
      ]
    }));
}

// Deploy site to hosted server
gulp.task('deploy', deploy);
