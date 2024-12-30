import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { description } from '../package.json'
import { webpackBundler } from '@vuepress/bundler-webpack'

const siteDescription = typeof description === 'string' ? description : 'Default site description';

export default defineUserConfig({
  /**
   * Site Title
   * Ref: https://v2.vuepress.vuejs.org/reference/config.html#title
   */
  title: 'BRAIN CoGS mini VR rigs',

  /**
   * Site Description
   * Ref: https://v2.vuepress.vuejs.org/reference/config.html#description
   */
  description: siteDescription,

  /**
   * Extra tags to be injected into the page HTML <head>
   * Ref: https://v2.vuepress.vuejs.org/reference/config.html#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration
   * Ref: https://v2.vuepress.vuejs.org/reference/default-theme/config.html
   */
  theme: defaultTheme({
    repo: '',
    editLink: false, // Replaced editLinks with editLink
    docsDir: '',
    editLinkText: '',
    lastUpdated: false, // This is correct for VuePress 2.x
    navbar: [
      { text: 'Building', link: '/building/' },
      { text: 'Maintenance', link: '/maintenance/' },
      { text: 'Software', link: '/software/' }
    ],
    sidebar: {
      '/building/': getBuildingSidebar(),
      '/maintenance/': getMaintenanceSidebar(),
      '/software/': getSoftwareSidebar(),
    }
  }),

  /**
   * Apply plugins
   * Ref: https://v2.vuepress.vuejs.org/reference/plugin-api.html
   */
  plugins: [
  ],

  /**
   * Webpack Configuration
   * Ref: https://v2.vuepress.vuejs.org/reference/bundler-webpack/config.html
   */
  bundler: webpackBundler({
    configureWebpack: (config) => {
      // Temporarly supress warnings while vuepress 2.0 fix bugs
      const sassLoaderRule = config.module.rules.find((rule) => {
        return rule.use && rule.use.some((loader) => loader.loader.includes('sass-loader'));
      });
    
      if (sassLoaderRule) {
        sassLoaderRule.use = sassLoaderRule.use.map((loader) => {
          if (loader.loader.includes('sass-loader')) {
            loader.options = {
              ...loader.options,
              sassOptions: {
                quietDeps: true,
                logger: {
                  warn: () => {}, // Suppresses warnings entirely
                },
              },
            };
          }
          return loader;
        });
      }

      // config.module.rules.push({
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env'],
      //     },
      //   },
      // });
    }
  }),

  /**
   * Custom webpack chain
   */
  chainWebpack: (config, _isServer) => {
    config.module
      .rule('files')
      .test(/\.(pdf|zip|ait|log|txt|stp)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: `[path][name].[ext]`
      });
    
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.transformAssetUrls = {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: ['xlink:href', 'href'],
          a: 'href'
        }
        return options
      });
  }
})

/**
 * Sidebar configuration for /building/
 */
function getBuildingSidebar (): string[] {
  return [
    '',
    'cabinet',
    'stage',
    'air-supply',
    'positioning',
    'projection',
    'reward',
    'air-puffs',
    'control',
    'pupillometry',
    'lick-detection'
  ]
}

/**
 * Sidebar configuration for /maintenance/
 */
function getMaintenanceSidebar (): string[] {
  return [
    '',
    'projection',
    'reward',
    'stage',
    'positioning',
    'miscellaneous'
  ]
}

/**
 * Sidebar configuration for /software/
 */
function getSoftwareSidebar (): string[] {
  return [
    '',
    'db_access',
    'db_organization',
    'db_analysis',
    'virmen_guide',
    'automation_pipeline',
    'automated_cronjobs',
    'automation_pipeline_developer',
    'configure_systems',
    'alert_system',
    'manipulation_pipeline',
    'pupillometry_guide',
    'subtask_pipeline'
  ]
}

if (process.env.NODE_ENV === 'development') {
  console.warn = () => {} // Suppress all warnings
}