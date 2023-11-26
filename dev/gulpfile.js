const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");

const browserSync = require("browser-sync");

function compileSass() {
    // テーマフォルダの直下のdev/src/sassからSassファイルを取得
    return gulp.src("../dev/src/sass/**/*.scss")  // <-- 修正
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssSorter()]))
        .pipe(mmq())
        // コンパイルされたCSSをテーマフォルダのassets/cssに出力
        .pipe(gulp.dest("../assets/css/"))  // <-- 修正
}

function watch() {
    browserInit();
    // Sassファイルの変更を監視
    gulp.watch("../dev/src/sass/**/*.scss", gulp.series(compileSass, browserReload));  // <-- 修正
    gulp.watch("../*.html", browserReload);  // HTMLファイルの変更も監視
}

function browserInit() {
    browserSync.init({
        server: {
            baseDir: "../"
        }
    });
}

function browserReload(done) {
    browserSync.reload();
    done();
}

exports.default = watch;
