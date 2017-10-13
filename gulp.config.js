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
	postcss: {
		browsers: ['last 2 versions']
	},
	paths: {
		js: {
			src: './app/js',
			dist: './app/js'
		},
		css: {
			src: './app/scss',
			dist: './app/css'
		}
	}
};
