// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

// function addStyleResource(rule) {
//   rule
//     .use('style-resource')
//     .loader('style-resources-loader')
//     .options({
//       patterns: [path.resolve(__dirname, './src/assets/*.scss')],
//     })
// }

module.exports = {
  siteName: 'DSJIN',
  siteDescription: 'Lifestyle, Coding, etc. Blog',
  siteUrl: 'https://blog.dsjin.co',
  titleTemplate: `%s | DSJIN's Blog`,
  author: 'Thatchakon Jom-ud (DSJIN)',
  keywords: [],
  plugins: [
    {
      use: 'gridsome-plugin-typescript',
    },
    {
      use: '@gridsome/source-ghost',
      options: {
        baseUrl: process.env.GHOST_BASE_URL,
        contentKey: process.env.GHOST_CONTENT_KEY,
        routes: {
          post: '/post/:slug',
        },
      },
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: process.env.GA_ID,
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        config: {
          '/post/*': {
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: '2021-05-20',
          },
          '/tag/*': {
            changefreq: 'monthly',
            priority: 0.5,
            lastmod: '2020-05-20',
          }
        }
      }
    }
  ],
  templates: {
    GhostPost: '/post/:slug',
  },
  icon: {
    favicon: {
      src: './src/favicon.png',
      sizes: [16, 32, 96]
    },
    touchicon: {
      src: './src/apple-touch-icon.png',
      sizes: [76, 152, 120, 167],
      precomposed: true
    }
  },
  chainWebpack(config) {
    // Load variables for all vue-files
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach((type) => {
    //   addStyleResource(config.module.rule('scss').oneOf(type))
    // })

    // config
    //   .plugin('BundleAnalyzerPlugin')
    //   .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static' }])

    // config
    //   .plugin('LodashModuleReplacementPlugin')
    //   .use(new LodashModuleReplacementPlugin())
  },
}
