import path from 'path'

export default {
	mode: 'spa',
	head: {
		titleTemplate: '%s - Karazann',
		meta: [
			{
				charset: 'utf-8'
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || ''
			}
		],
		link: [
			{
				rel: 'icon',
				type: 'image/x-icon',
				href: '/favicon.ico'
			}
		]
	},
	workbox: {
		offline: true,
		offlineStrategy: 'NetworkFirst'
	},
	loading: {},
	css: ['@assets/global.scss'],
	plugins: ['~/plugins/components.js'],
	modules: ['@nuxtjs/pwa', '@nuxtjs/style-resources', '@nuxtjs/sitemap'],
	styleResources: {
		scss: ['@assets/scss/bootstrap-grid.scss', '@assets/scss/global.scss']
	},
	sitemap: {
		hostname: 'https://karazann.com',
		gzip: true,
		exclude: [],
		routes: []
	},
	build: {
		analyze: false,
		optimization: {
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: 6,
				minSize: 0,//50000,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
							// or node_modules/packageName
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

							// npm package names are URL-safe, but some servers don't like @ symbols
							return `npm.${packageName.replace('@', '')}`
						}
					}
				}
			}
		},
		maxChunkSize: 100000,
		devtool: true,
		extractCSS: true,
		filenames: {
			app: process.env.NODE_ENV !== 'production' ? '[name].js' : '[name].[chunkhash].js' 
		},
		extend(config, ctx) {
			console.log(process.env.NODE_ENV);
			if (ctx.isClient) config.devtool = '#source-map'
			const alias = (config.resolve.alias = config.resolve.alias || {})
			alias['@pages'] = path.join(this.buildContext.options.rootDir, 'pages')
			alias['@components'] = path.join(this.buildContext.options.rootDir, 'components')
			alias['@assets'] = path.join(this.buildContext.options.rootDir, 'assets')
			alias['jquery'] = 'jquery-slim'
		}
	}
}
