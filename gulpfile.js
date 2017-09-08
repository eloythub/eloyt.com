var gulp        = require('gulp')
var less        = require('gulp-less')
var browserSync = require('browser-sync').create()
var header      = require('gulp-header')
var cleanCSS    = require('gulp-clean-css')
var rename      = require("gulp-rename")
var uglify      = require('gulp-uglify')
var concat      = require('gulp-concat')
var pkg         = require('./package.json')

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' */\n',
  ''
].join('')

// Compile LESS files from /less into /css
gulp.task('less', function () {
  return gulp.src('app/less/new-age.less')
    .pipe(less())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('app/css'))
})

// Minify compiled CSS
gulp.task('minify-css', ['less'], function () {
  return gulp.src('app/css/new-age.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
})

// Minify JS
gulp.task('minify-js', function () {
  return gulp.src([
      'app/vendor/jquery/jquery.js',
      'app/vendor/bootstrap/js/bootstrap.js',
      'app/vendor/particles.js/particles.js',
      'app/js/new-age.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/js'))
})

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function () {
  gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
    .pipe(gulp.dest('app/vendor/bootstrap'))

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('app/vendor/jquery'))

  gulp.src(['node_modules/simple-line-icons/*/*'])
    .pipe(gulp.dest('app/vendor/simple-line-icons'))

  gulp.src(['node_modules/particles.js/*'])
    .pipe(gulp.dest('app/vendor/particles.js'))

  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('app/vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy'])


// Dev task with browserSync
gulp.task('dev', ['less', 'minify-css', 'minify-js'], function () {
  gulp.watch('app/less/*.less', ['less'])
  gulp.watch('app/css/*.css', ['minify-css'])
  gulp.watch('app/js/*.js', ['minify-js'])
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload)
  gulp.watch('app/js/**/*.js', browserSync.reload)
})
