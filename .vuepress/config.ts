import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { description } from '../package.json'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { searchPlugin } from '@vuepress/plugin-search';

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
    contributors: false, // Disable contributors feature
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
    searchPlugin({
      // Options for the search plugin
      maxSuggestions: 10, // Maximum number of search suggestions
      isSearchable: (page) => page.path !== '/', // Specify which pages are searchable
      locales: {
        '/': {
          placeholder: 'Search...',
        },
      },
    }),
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
function getBuildingSidebar() {
  return [
    {
      text: 'Building a Mini VR Rig',
      link: '/building/',
      collapsible: true,
      children: [
        '/building/cabinet.md',           // Maps to `building/cabinet.md`
        '/building/stage.md',             // Maps to `building/stage.md`
        '/building/air-supply.md',        // Maps to `building/air-supply.md`
        '/building/positioning.md',       // Maps to `building/positioning.md`
        '/building/projection.md',        // Maps to `building/projection.md`
        '/building/reward.md',            // Maps to `building/reward.md`
        '/building/air-puffs.md',         // Maps to `building/air-puffs.md`
        '/building/control.md',           // Maps to `building/control.md`
        '/building/pupillometry.md',      // Maps to `building/pupillometry.md`
        '/building/lick-detection.md',    // Maps to `building/lick-detection.md`
      ],
    },
  ];
}

/**
 * Sidebar configuration for /maintenance/
 */
function getMaintenanceSidebar() {
  return [
    {
      text: 'Maintenance',
      link: '/maintenance/',
      collapsible: true,
      children: [
        '/maintenance/projection.md',      // Maps to `maintenance/projection.md`
        '/maintenance/reward.md',          // Maps to `maintenance/reward.md`
        '/maintenance/stage.md',           // Maps to `maintenance/stage.md`
        '/maintenance/positioning.md',     // Maps to `maintenance/positioning.md`
        '/maintenance/miscellaneous.md',   // Maps to `maintenance/miscellaneous.md`
      ],
    },
  ];
}

/**
 * Sidebar configuration for /software/
 */
function getSoftwareSidebar() {
  return [
    {
      text: 'Software',
      link: '/software/',
      collapsible: true,
      children: [
        '/software/db_access.md',                 // Maps to `software/db_access.md`
        '/software/db_organization.md',           // Maps to `software/db_organization.md`
        '/software/db_analysis.md',               // Maps to `software/db_analysis.md`
        '/software/virmen_guide.md',              // Maps to `software/virmen_guide.md`
        '/software/automation_pipeline.md',       // Maps to `software/automation_pipeline.md`
        '/software/automated_cronjobs.md',        // Maps to `software/automated_cronjobs.md`
        '/software/automation_pipeline_developer.md', // Maps to `software/automation_pipeline_developer.md`
        '/software/configure_systems.md',         // Maps to `software/configure_systems.md`
        '/software/alert_system.md',              // Maps to `software/alert_system.md`
        '/software/manipulation_pipeline.md',     // Maps to `software/manipulation_pipeline.md`
        '/software/pupillometry_guide.md',        // Maps to `software/pupillometry_guide.md`
        '/software/subtask_pipeline.md',          // Maps to `software/subtask_pipeline.md`
      ],
    },
  ];
}