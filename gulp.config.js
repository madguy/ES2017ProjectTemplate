const webpack = require('webpack-stream');

module.exports = {
	webpack: {
		cache: true,
		output: {
			filename: '[name].min.js'
		},
		resolve: {
			modulesDirectories: ['node_modules', 'app/js']
		},
		devtool: '#source-map',
		module: {
			loaders: [{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['es2015'],
					plugins: ['transform-runtime', 'syntax-async-functions', 'transform-async-to-generator']
				}
			}]
		},
		plugins: [
			// minify
			new webpack.webpack.optimize.UglifyJsPlugin()
		],
		externals: {
			jquery: 'jQuery',
			moment: 'moment'
		}
	},
	sass: {
		outputStyle: 'compressed'
	},
	paths: {
		src: {
			js: './app/js',
			css: './app/scss'
		},
		dist: {
			js: './app/js',
			css: './app/css'
		}
	}
};
