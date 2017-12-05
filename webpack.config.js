// Based on https://github.com/preboot/angular-webpack/blob/master/webpack.config.js

// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.ENV;
var isDeploy = ENV === 'deploy';
var isProd = (ENV === 'prod') || isDeploy;
var isDev = (ENV === 'dev') || (!isProd);
var envText = isDeploy ? 'deploy' : isProd ? 'prod' : 'dev'

console.debug('Resolved build environment: '  + envText);

module.exports = () => {
  var config = {};

  config.devtool = 'source-map';

  config.entry = {
    background: root('src', '/main.background.ts'),
    content_scripts: root('src','main.content_scripts.ts'),
    options: root('src', 'main.options.ts'),
  };

  config.output = {
    path: root('dist'),
    filename: '[name].bundle.js',
  };

  config.resolve = {
    extensions: ['.ts', '.js', '.json', '.html', '.css', '.scss'],
    alias: [{
      alias: 'jquery',
      name: 'jquery/src/jquery',
    }],
    modules: [
      root('src'),
      'node_modules',
    ]
  };

  var atlConfigFile = root('src', 'tsconfig.json');
  config.module = {
    rules: [
      {test: require.resolve("jquery"), loaders: ["expose-loader?$", "expose-loader?jQuery"] },
      {test: /\.ts$/, loader: 'awesome-typescript-loader?configFileName=' + atlConfigFile},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.(css|scss|sass)$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.(gif|png|jpg|svg|woff|woff2|ttf|eot)$/, loader: 'file-loader'},
      //{test: /\.html$/, loader: 'html-loader'}
    ]
  };

  config.plugins = [
    new CopyWebpackPlugin([{
      from: root('src', 'static'),
      flatten: false,
    }, {
      from: root('src', 'manifest-template.json'),
      to: 'manifest.json',
      transform: transformManifest,
    }]),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(envText),
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: root('src', 'browser-media-keys', 'options', 'options.html'),
      chunks: ['options'],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ];

  if (isProd) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: { keep_fnames: true }})
    );
  }

  return config
}

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function transformManifest(template) {
  let templateJSON = JSON.parse(template);
  let packageConfig = JSON.parse(require('fs').readFileSync(root('package.json')));

  templateJSON.version = packageConfig.version;
  templateJSON.background.scripts.push('background.bundle.js');

  let contentScriptsMatches = JSON.parse(require('fs').readFileSync(root('src', 'content_scripts_matches.json')));

  templateJSON.content_scripts.push({
    'matches': contentScriptsMatches,
    'js': ['content_scripts.bundle.js'],
  });

  return JSON.stringify(templateJSON);
}
