const path = require("path");

module.exports = {
  mode: 'development',
  entry: {
    app: './src/server/index.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'server.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, './src'),
        ]
      }
    ]
  },
  externals: {
    // 'bufferutil': 'bufferutil',
    // 'utf-8-validate': 'utf-8-validate'
  }
};