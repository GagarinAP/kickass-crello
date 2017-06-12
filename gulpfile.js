var gulp        = require('gulp'),
    sourcemaps  = require('gulp-sourcemaps'),
    cleanCSS    = require('gulp-clean-css'),
    concat      = require('gulp-concat'),
    concatCss   = require('gulp-concat-css'),
    watch       = require('gulp-watch'),
    eslint      = require('gulp-eslint'),
    webpackConf = require('./webpack.config'),
    webpack     = require('webpack-stream');

gulp.task('lint', function (cb) {
    return gulp.src('./src/js/**/*.{js,jsx}')
        .pipe(eslint({
            "env": {
                "es6": true
            },
            "plugins": [
                "react"
            ],
            "parser": "babel-eslint",
            "parserOptions": {
                "ecmaFeatures": {
                    "jsx": true,
                    "modules": true
                }
            },
            "rules": {
                "camelcase": 1,
                "comma-dangle": 2,
                "quotes": 1,
                //"strict": 2,
                "no-trailing-spaces": 1,
                "no-multi-spaces": 1,
                "no-multiple-empty-lines": 1,
                "react/display-name": 1,
                "react/jsx-boolean-value": 1,
                "react/jsx-closing-bracket-location": 1,
                "react/jsx-curly-spacing": 1,
                "react/jsx-handler-names": 1,
                "react/jsx-indent-props": 1,
                "react/jsx-key": 1,
                "react/jsx-max-props-per-line": 1,
                "react/jsx-no-duplicate-props": 1,
                "react/jsx-no-undef": 1,
                "react/jsx-pascal-case": 1,
                "react/jsx-sort-props": 1,
                "react/jsx-uses-react": 1,
                "react/jsx-uses-vars": 1,
                "react/no-danger": 1,
                "react/no-did-mount-set-state": 1,
                "react/no-did-update-set-state": 1,
                "react/no-direct-mutation-state": 1,
                "react/no-multi-comp": 1,
                "react/no-unknown-property": 1,
                "react/prefer-es6-class": 1,
                "react/prop-types": 1,
                "react/react-in-jsx-scope": 1,
                "react/sort-comp": 1,
                "react/jsx-wrap-multilines": 1
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    cb();
});

gulp.task('css', function () {
    return gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './src/css/style.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(concatCss('style.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(webpack(webpackConf))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('html', function () {
    return gulp.src(['./src/html/**'])
        .pipe(gulp.dest('./public'));
});

gulp.task('watch', function () {
    return gulp.watch(['./src/js/**/**','./src/css/**/**','./src/html/**/**'], [
        'lint',
        'html',
        'css',
        'js'
    ]);
});

gulp.task('build', [
    'lint',
    'html',
    'css',
    'js'
]);

gulp.task('default', [
    'build',
    'watch'
]);