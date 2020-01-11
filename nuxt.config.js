import path from 'path'

const development = process.env.NODE_ENV !== 'production'

export default {
    mode: 'spa',
    srcDir: 'src',
    env: {
        staticUrl: development ? 'https://storage.cloud.google.com/static-ra0pc18m' : 'https://static.karazann.com'
    },
    generate: {
        fallback: true
    },
    dev: development,
    modules: ['@nuxtjs/style-resources', '@nuxtjs/sitemap', '@nuxtjs/axios'],
    buildModules: ['@nuxt/typescript-build'],
    plugins: ['plugins/components.ts', 'plugins/axios', 'plugins/init-store'],
    head: {
        titleTemplate: '%s - Karazann',
        htmlAttrs: {
            theme: 'dark'
        },
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
    router: {
        linkExactActiveClass: 'active'
    },
    loading: {
        color: '#0396ff',
        throttle: 500,
        height: '3px',
        failedColor: '#eb5757'
    },
    axios: {
        baseURL: development ? 'http://localhost:8080/' : 'https://api.karazann.com/',
        prefix: '/',
        progress: false,
        credentials: false,
        debug: true
    },
    workbox: {
        offline: true,
        offlineStrategy: 'NetworkFirst'
    },
    typescript: {
        typeCheck: development ? true : false
    },
    css: ['assets/reset.scss', 'assets/themes.scss', 'assets/global.scss', 'assets/_fonts.scss'],
    styleResources: {
        scss: ['assets/grid.scss', 'assets/_variables.scss', 'assets/_mixins.scss']
    },
    sitemap: {
        hostname: 'https://karazann.com',
        gzip: true,
        exclude: [],
        routes: []
    },
    build: {
        extractCSS: true,
        analyze: false,
        optimization: {
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: 6,
                minSize: 0, // 50000,
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
            app: c => (c.isDev ? '[name].js' : '[name].[chunkhash].js'),
            chunk: c => (c.isDev ? '[name].js' : '[name].[chunkhash].js'),
            css: c => (c.isDev ? '[name].css' : '[contenthash].css'),
            img: c => (c.isDev ? '[path][name].[ext]' : 'img/[hash:7].[ext]'),
            font: c => (c.isDev ? '[path][name].[ext]' : 'fonts/[hash:7].[ext]'),
            video: c => (c.isDev ? '[path][name].[ext]' : 'videos/[hash:7].[ext]')
        },
        extend(config, ctx) {
            if (ctx.isClient) config.devtool = '#source-map'
            const alias = (config.resolve.alias = config.resolve.alias || {})
            alias['@'] = path.join(this.buildContext.options.rootDir, 'src')
            alias['~'] = path.join(this.buildContext.options.rootDir, 'src')
            alias['jquery'] = 'jquery-slim'
        }
    }
}
