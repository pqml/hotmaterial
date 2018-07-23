
const path = require('path')
const env = process.argv[process.argv.length - 1]

module.exports = {
  mode: 'development',
  entry: {
    bundle: [path.join(__dirname, env + '.js')],
  },
  output: {
    path: __dirname,
    publicPath: '',
    filename: '[name].js',
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
  serve: {
    content: __dirname,
    devMiddleware: { stats: 'minimal' }
  }
}