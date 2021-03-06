import webpack from 'webpack';
export default {
 plugins:[ new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'S3_URL': JSON.stringify('//zach.christmas.s3-website-us-west-2.amazonaws.com/tunes/')
    }
  })],

  output: {
    filename: 'client-bundle.js',
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      }
   ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },


};
