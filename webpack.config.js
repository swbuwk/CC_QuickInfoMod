const path = require('path');
const webpack = require('webpack');

module.exports = function (env) {
  return {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimize: !!env.minimize,
    },
    entry: './src/main.ts',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.js', ".ts"],
    },
    output: {
      filename: 'QuickInfo.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: 'QuickInfo.js.map',
        publicPath: "",
        fileContext: 'public',
      }),
    ],
  };
};