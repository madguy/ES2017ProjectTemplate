const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	webpack: {
		cache: true,
		output: {
			filename: '[name].min.js'
		},
		resolve: {
			modules: ['node_modules', 'app/js']
		},
		devtool: 'source-map',
		module: {
			rules: []
		},
		plugins: [
			// minify
			new UglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					ecma: 8
				}
			})
		],
		externals: {
			moment: 'moment'
		}
	},
	sass: {
		includePaths: ['node_modules'],
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
