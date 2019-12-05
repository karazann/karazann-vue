import path from 'path'

export default {
    mode: 'spa',
    srcDir: 'src',
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
    modules: ['@nuxtjs/pwa', '@nuxtjs/style-resources', '@nuxtjs/sitemap'],
    buildModules: ['@nuxt/typescript-build'],
    workbox: {
        offline: true,
        offlineStrategy: 'NetworkFirst'
    },
    css: ['@assets/global.scss', '@assets/reset.scss'],
    plugins: ['~/plugins/components.ts'],
    styleResources: {
        scss: ['@assets/grid.scss']
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
                minSize: 0, // 50000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module: any) {
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
            app: (c: any) => c.isDev ? '[name].js' : '[name].[chunkhash].js',
            chunk: (c: any) => c.isDev ? '[name].js' : '[name].[chunkhash].js',
            css: (c: any) => c.isDev ? '[name].css' : '[contenthash].css',
            img: (c: any) => c.isDev ? '[path][name].[ext]' : 'img/[hash:7].[ext]',
            font: (c: any) => c.isDev ? '[path][name].[ext]' : 'fonts/[hash:7].[ext]',
            video: (c: any) => c.isDev ? '[path][name].[ext]' : 'videos/[hash:7].[ext]'
        },
        extend(this: any, config: any, ctx: any) {
            if (ctx.isClient) config.devtool = '#source-map'
            const alias = (config.resolve.alias = config.resolve.alias || {})
            alias['@'] = path.join(this.buildContext.options.rootDir, 'src')
            alias['jquery'] = 'jquery-slim'
        }
    }
}
