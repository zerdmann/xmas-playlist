import webpack from 'webpack';
export default {
 plugins:[ new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'S3_URL': JSON.stringify('/tunes/')
    }
  }),
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.AggressiveMergingPlugin()
 ],

  output: {
    filename: 'client-bundle.js',
  },
  devtool: 'source-maps',
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
