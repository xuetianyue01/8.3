var gulp = require("gulp");
var server = require("gulp-webserver");
var scss = require("gulp-sass");
var clean = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var fs = require("fs");
var url = require("url");
var path = require("path");

//创建服务

gulp.task("server", ["scss", "uglify"], function() {
    gulp.src("./src/")
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === "/favicon.ico") {
                    return false;
                }

                if (/\/api/.test(pathname)) {
                    res.end(JSON.stringify({ code: 1 }))
                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})

//压缩js
gulp.task("uglify", function() {
    gulp.src("./src/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
})

//压缩scss

gulp.task('scss', function() {
    gulp.src("./src/scss/*.scss")
        .pipe(scss())
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'Android >=4.0'] }))
        .pipe(clean())
        .pipe(gulp.dest("./src/css"))
})

gulp.task("lolo", function() {
    gulp.watch("./src/scss/*.scss", ["scss"])
})

gulp.task("dev", ["lolo", "uglify", "server"])