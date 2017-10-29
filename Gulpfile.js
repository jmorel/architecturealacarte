var gulp = require('gulp');

var less = require('gulp-less');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var nunjucks = require('gulp-nunjucks');
var uglify = require('gulp-uglify');
var git = require('gulp-git');


var sections = [
    {
        name: "Les regions",
        pages: [
            {url: 'ile-de-france.html', name: 'Île de France'},
            {url: 'pays-de-la-loire.html', name: 'Pays de la Loire'},
            {url: 'mailto:contact@architecturealacarte.fr', name: 'Ajoutez la votre'}
        ]
    },
    {
        name: "Journees du patrimoine",
        pages: [
            {url: 'journees-du-patrimoine-2015.html', name: 'Edition 2015'},
            {url: 'journees-du-patrimoine-2016.html', name: 'Edition 2016'},
            {url: 'journees-du-patrimoine-2017.html', name: 'Edition 2017'}
        ]
    },
    {
        name: 'Autre',
        pages: [
            {
                url: '50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie.html',
                name: 'Les 50 lieux en France à voir au moins une fois dans sa vie'
            },
            {
                url: 'ete-archi.html',
                name: 'L\'été archi de David Abittan'
            },
            {
                url: 'genie-des-lieux.html',
                name: 'Le Génie des lieux'
            }
        ]
    }
];


gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(concat('architecturealacarte.less'))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function () {
    return gulp.src('./src/pages/*.html')
        .pipe(nunjucks.compile({sections: sections}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sitemap', function () {
    return gulp.src('./src/sitemap.xml')
        .pipe(nunjucks.compile({sections: sections}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('fonts', function () {
    var custom = gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'));

    var faFonts = gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./dist/fonts/font-awesome/fonts/'));

    var faCSS = gulp.src('./node_modules/font-awesome/css/font-awesome.css')
        .pipe(gulp.dest('./dist/fonts/font-awesome/css/'));
    return [custom, faFonts, faCSS];
});

gulp.task('js', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-sanitize/angular-sanitize.js'])
        .pipe(concat('architecturealacarte.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('ods-widgets', function () {
    return gulp.src('./src/vendor/ods-widgets/**/*')
        .pipe(gulp.dest('./dist/ods-widgets/'))
});

gulp.task('misc', function () {
    return [
        gulp.src('./src/CNAME')
            .pipe(gulp.dest('./dist/')),
        gulp.src('./src/img/**/*')
            .pipe(gulp.dest('./dist/img/'))
    ]
});

gulp.task('deploy', function () {
    git.exec({args: 'push origin `git subtree split --prefix dist master`:gh-pages --force'}, function (err, stdout) {
        if (err) {
            throw err;
        }
    });
});

gulp.task('build', ['less', 'html', 'sitemap', 'js', 'fonts', 'ods-widgets', 'misc']);
gulp.task('default', ['build']);

gulp.task('watch', function () {
    return gulp.watch('./src/**/*.*', ['build'])
});
