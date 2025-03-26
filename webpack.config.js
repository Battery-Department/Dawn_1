const path = require('path');

module.exports = {
  entry: './src/index.js',  // Entry point for your React app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',  // Output bundled file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // Using Babel to transpile JSX
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};