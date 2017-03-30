var gulp  = require('gulp'),
    elixir = require('laravel-elixir');

var theme = 'melissaandadam';
elixir.config.assetsPath = './';

elixir(function(mix) {
    mix.sass(theme + '.scss', 'css/' + theme + '.css');

    mix.scripts([
        'vendor/css_browser_selector.js',
        'vendor/button.js',
        'vendor/modernizr-custom.js',
        'scripts.js'
    ], './js/' + theme + '.js');


    mix.browserSync({
      files: [
        'sass/**/*',
        '*.html'
      ],
      proxy: 'melissaandadam.dev',
      reloadDelay: 2000
    });

});
