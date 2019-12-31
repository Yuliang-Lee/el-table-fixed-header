const path = require('path');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: resolve("dist"),
    filename: 'el-table-fixed-header.min.js',
    library: 'ElTableFixedHeader',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          resolve("src")
        ],
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['js'],
  }

};