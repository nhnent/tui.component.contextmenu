/**
 * Configs file for bundling
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */

const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const FILENAME = pkg.name + (isProduction ? '.min.js' : '.js');
  const BANNER = [
    'TOAST UI Context Menu',
    `@version ${pkg.version}`,
    `@author ${pkg.author}`,
    `@license ${pkg.license}`
  ].join('\n');

  return {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
      library: ['tui', 'ContextMenu'],
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'dist/',
      filename: FILENAME
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(test|node_modules|bower_components)/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /(dist|node_modules|bower_components)/,
          enforce: 'pre',
          options: {
            failOnError: isProduction
          }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({filename: `${pkg.name}.css`}),
      new webpack.BannerPlugin(BANNER)
    ],
    devServer: {
      historyApiFallback: false,
      progress: true,
      host: '0.0.0.0',
      disableHostCheck: true
    }
  };
};
