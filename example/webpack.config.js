const path = require('path')
const env = process.argv[process.argv.length - 1]

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  entry: {
    bundle: [path.join(__dirname, env + '.js')]
  },
  output: {
    path: __dirname,
    publicPath: '',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.(glsl|frag|vert)$/,
      exclude: [/node_modules/],
      use: [
        'raw-loader',
        'glslify-loader'
      ]
    }]
  },
  stats: 'minimal',
  devServer: {
    contentBase: __dirname,
    hot: true,
    liveReload: false,
    historyApiFallback: true,
    disableHostCheck: true,
    stats: 'minimal'
  }
}
