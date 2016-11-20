import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import pump from 'pump';
import autoprefixer from 'gulp-autoprefixer';
import historyApiFallback from 'connect-history-api-fallback';


import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const reload = browserSync.reload

const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  styleEntry: 'src/styles/main.scss',
  allStyles: 'src/styles/*.scss',
  clientEntryPoint: 'src/index.jsx',
  distDir: 'dist',
  clientBundle: 'dist/client-bundle.js?(.map)',
  imgPath: 'src/img/*.svg',
  imgDist: 'dist/img'
};

gulp.task('styles', function(cb) {
  pump([
     gulp.src(paths.styleEntry),
     sass(),
     autoprefixer(),
     gulp.dest(paths.distDir),
     reload({ stream:true })
    ],cb);
});

gulp.task('img', (cb) => {
  pump([
    gulp.src(paths.imgPath),
    gulp.dest(paths.imgDist)
    ],cb)
})

gulp.task('clean', () =>
  del(
    [
      paths.clientBundle,
    ])
);

gulp.task('main',['clean'], (done) =>
   pump([
    gulp.src(paths.clientEntryPoint),
    webpack(webpackConfig),
    gulp.dest(paths.distDir),
    reload({stream:true}),
    ], (err) => { if(err) done();})
);

gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: 'dist',
      middleware: [historyApiFallback()]
    }
  });
  gulp.watch(paths.allSrcJs, ['main'])
  gulp.watch(paths.allStyles, ['styles']);
}
);


gulp.task('default', ['img','main', 'styles', 'serve']);
