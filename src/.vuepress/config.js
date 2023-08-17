const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'BRAIN CoGS mini VR rigs',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      { text: 'Building', link: '/building/' },
      { text: 'Maintenance', link: '/maintenance/' },
      { text: 'Software', link: '/software/' }
    ],
    sidebar: {
      '/building/': getBuildingSidebar(),
      '/maintenance/': getMaintenanceSidebar(),
      '/software/': getSoftwareSidebar(),
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom'
  ],

  chainWebpack: (config, _isServer) => {
    config.module
      .rule('files')
      .test(/\.(pdf|zip|ait|log|txt|stp)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: `[path][name].[ext]`
      });
    
    config.module.rule('vue')
      .uses.store
      .get('vue-loader').store
      .get('options').transformAssetUrls = {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: ['xlink:href', 'href'],
        a: 'href'
      };
  },
}

function getBuildingSidebar () {
  return [
    '',
    'cabinet',
    'stage',
    'air-supply',
    'positioning',
    'projection',
    'reward',
    'air-puffs',
    'control'
  ]
}

function getMaintenanceSidebar () {
  return [
    '',
    'projection',
    'reward',
    'stage'
  ]
}

function getSoftwareSidebar () {
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
    'subtask_pipeline'
  ]
}