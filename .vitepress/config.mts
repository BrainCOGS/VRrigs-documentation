import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { figure } from '@mdit/plugin-figure'
import { defineConfig, type DefaultTheme } from 'vitepress'

const root = fileURLToPath(new URL('..', import.meta.url))

/**
 * Sidebar entry for a page, labelled with its frontmatter `title` (what
 * VuePress showed automatically; VitePress needs the text spelled out).
 */
function page(link: string): DefaultTheme.SidebarItem {
  const source = readFileSync(`${root}${link.replace(/^\//, '')}.md`, 'utf8')
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  const title = frontmatter.match(/^title:\s*(.+?)\s*$/m)?.[1].replace(/^(['"])(.*)\1$/, '$2')
  if (!title) throw new Error(`${link}.md has no frontmatter title for the sidebar`)
  return { text: title, link }
}

export default defineConfig({
  /**
   * Site Title
   * Ref: https://vitepress.dev/reference/site-config#title
   */
  title: 'BRAIN CoGS Mini VR Rigs',
  description: 'Documentation for virtual reality rigs at Princeton BRAIN CoGS project',

  /**
   * Extra tags to be injected into the page HTML <head>
   * Ref: https://vitepress.dev/reference/site-config#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  // The repo README is not a site page.
  srcExclude: ['.github/**'],

  // Pages stay at /<section>/<page>.html, as they were under VuePress.
  cleanUrls: false,

  markdown: {
    // Bare URLs stay plain text, as under VuePress. With linkify on, the URL
    // text of raw-HTML links (`<a href="https://x">https://x</a>`) was wrapped
    // in a second, nested <a>.
    linkify: false,

    // Images get `loading="lazy"`; pages here carry dozens of large PNGs.
    // Only applies to Markdown images, not raw-HTML <img>. (VitePress 2 names
    // this `lazyLoad`; VitePress 1 called it `lazyLoading`.)
    image: { lazyLoad: true },

    // An image alone in its paragraph becomes a <figure>, and its alt text
    // (`![Caption](./assets/x.png)`) becomes the <figcaption>. Links in the
    // alt text stay links in the caption. `focusable: false` leaves out the
    // plugin's default tabindex="0" on every image, which would add ~200
    // extra tab stops with nothing to activate.
    config: (md) => {
      md.use(figure, { focusable: false })
    },
  },

  // Dead links already fail `vitepress build` by default (ignoreDeadLinks is
  // false). Raw-HTML links and downloads are covered by `pnpm run test:links`.

  /**
   * Theme configuration
   * Ref: https://vitepress.dev/reference/default-theme-config
   */
  themeConfig: {
    nav: [
      { text: 'Building', link: '/building/' },
      { text: 'Maintenance', link: '/maintenance/' },
      { text: 'Software', link: '/software/' },
    ],

    sidebar: {
      '/building/': [
        {
          text: 'Building a Mini VR Rig',
          link: '/building/',
          collapsed: false,
          items: [
            page('/building/cabinet'),
            page('/building/stage'),
            page('/building/air-supply'),
            page('/building/positioning'),
            page('/building/projection'),
            page('/building/reward'),
            page('/building/air-puffs'),
            page('/building/control'),
            page('/building/pupillometry'),
            page('/building/lick-detection'),
          ],
        },
      ],
      '/maintenance/': [
        {
          text: 'Maintenance',
          link: '/maintenance/',
          collapsed: false,
          items: [
            page('/maintenance/projection'),
            page('/maintenance/reward'),
            page('/maintenance/stage'),
            page('/maintenance/positioning'),
            page('/maintenance/miscellaneous'),
          ],
        },
      ],
      '/software/': [
        {
          text: 'Software',
          link: '/software/',
          collapsed: false,
          items: [
            page('/software/db_access'),
            page('/software/db_organization'),
            page('/software/db_analysis'),
            page('/software/configure_systems'),
            page('/software/virmen_guide'),
            page('/software/virmen_developer'),
            page('/software/automation_pipeline'),
            page('/software/automation_pipeline_developer'),
            page('/software/pupillometry_guide'),
            page('/software/automated_cronjobs'),
            page('/software/alert_system'),
            page('/software/subtask_pipeline'),
            page('/software/manipulation_pipeline'),
          ],
        },
      ],
    },

    // Same depth as the old sidebar (h2 and h3), shown as "On this page".
    outline: [2, 3],

    search: { provider: 'local' },

    footer: { message: 'Made by BRAIN CoGS at Princeton Neuroscience Institute' },
  },
})
