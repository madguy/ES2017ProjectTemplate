const LicenseInfoWebpackPlugin = require('license-info-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	webpack: {
		script: (mode = 'development') => {
			let isProduction = mode === 'production';

			let plugins = [
				new VueLoaderPlugin(),
			];
			if (isProduction) {
				plugins.push(new LicenseInfoWebpackPlugin({
					glob: '{LICENSE,license,License}*'
				}));
			}

			return {
				mode: mode,
				cache: true,
				output: {
					filename: '[name].min.js',
				},
				devtool: isProduction ? false : '#source-map',
				resolve: {
					modules: ['node_modules', 'app/js'],
					alias: {
						vue: 'vue/dist/vue.esm.js'
					},
				},
				module: {
					rules: [{
						test: /\.js$/,
						exclude: /(node_modules|bower_components)/,
						use: ['cache-loader'],
					}, {
						test: /\.vue$/,
						use: [
							'cache-loader',
							'vue-loader',
						],
					}, {
						test: /\.scss$/,
						use: [
							'vue-style-loader',
							'css-loader',
							{
								loader: 'postcss-loader',
								options: {
									browsers: ['last 2 versions'],
								},
							},
							{
								loader: 'sass-loader',
								options: {
									includePaths: ['node_modules'],
									outputStyle: 'compressed',
								}
							},
						]
					}],
				},
				plugins: plugins,
			};
		},
		style: (mode = 'development') => {
			let isProduction = mode === 'production';
			let isUseSourceMap = isProduction === false;

			return {
				mode: mode,
				cache: true,
				output: {
					filename: '[contenthash]',
				},
				devtool: isUseSourceMap ? '#source-map' : false,
				module: {
					rules: [{
						test: /\.(sass|scss)$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: 'css-loader',
								options: {
									sourceMap: isUseSourceMap,
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									browsers: ['last 2 versions'],
								},
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: isUseSourceMap,
									includePaths: ['node_modules'],
									outputStyle: 'compressed',
								}
							},
						],
					}],
				},
				plugins: [
					new MiniCssExtractPlugin({
						filename: '[name].css',
					}),
				],
			};
		},
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
