const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css');

//compile scss into css
function scssTocss(){
    return gulp.src('./dev/assets/scss/style.scss')
        .pipe(sass())
        .pipe(autoPrefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dev/css'))
        .pipe(browserSync.stream())
}

//build with images, css, js opt
async function build(){

    let imgSrc = './dev/assets/img/*.+(png|jpg|gif|svg)',
        imgDst = './build/assets/img',
        jscopy = gulp.src(['./dev/assets/js/**/*.js']).pipe(uglify()).pipe(gulp.dest('./build/assets/js')),
        csscopy = gulp.src(['./dev/assets/css/**/*.css']).pipe(cleanCSS()).pipe(gulp.dest('./build/assets/css')),
        htmlcopy = gulp.src(['./dev/*.html']).pipe(gulp.dest('./build')),
        optimages = gulp.src(imgSrc).pipe(changed(imgDst)).pipe(imagemin()).pipe(gulp.dest(imgDst));

}

//watch for changes
function watch(){
    browserSync.init({
        server: {
            baseDir: './dev'
        }
    });
    gulp.watch('./dev/assets/scss/style.scss', scssTocss);
    gulp.watch('./dev/*.html').on('change', browserSync.reload);
    gulp.watch('./dev/assets/js/**/*.js').on('change', browserSync.reload);
}

exports.scssTocss = scssTocss;
exports.watch = watch;
exports.build = build;