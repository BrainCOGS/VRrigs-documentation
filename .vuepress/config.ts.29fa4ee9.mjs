// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";

// package.json
var description = "Documentation for virtual reality rigs at Princeton BRAIN CoGS project";

// .vuepress/config.ts
import { webpackBundler } from "@vuepress/bundler-webpack";
import searchPluginModule from "@vuepress/plugin-search";
var { searchPlugin } = searchPluginModule;
var siteDescription = typeof description === "string" ? description : "Default site description";
var config_default = defineUserConfig({
  /**
   * Site Title
   * Ref: https://v2.vuepress.vuejs.org/reference/config.html#title
   */
  title: "BRAIN CoGS mini VR rigs",
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
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }]
  ],
  /**
   * Theme configuration
   * Ref: https://v2.vuepress.vuejs.org/reference/default-theme/config.html
   */
  theme: defaultTheme({
    repo: "",
    editLink: false,
    // Replaced editLinks with editLink
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    // This is correct for VuePress 2.x
    navbar: [
      { text: "Building", link: "/building/" },
      { text: "Maintenance", link: "/maintenance/" },
      { text: "Software", link: "/software/" }
    ],
    sidebar: {
      "/building/": getBuildingSidebar(),
      "/maintenance/": getMaintenanceSidebar(),
      "/software/": getSoftwareSidebar()
    }
  }),
  /**
   * Apply plugins
   * Ref: https://v2.vuepress.vuejs.org/reference/plugin-api.html
   */
  plugins: [
    searchPlugin({
      // Options for the search plugin
      maxSuggestions: 10,
      // Maximum number of search suggestions
      isSearchable: (page) => page.path !== "/",
      // Specify which pages are searchable
      locales: {
        "/": {
          placeholder: "Search..."
        }
      }
    })
  ],
  /**
   * Webpack Configuration
   * Ref: https://v2.vuepress.vuejs.org/reference/bundler-webpack/config.html
   */
  bundler: webpackBundler({
    configureWebpack: (config) => {
      const sassLoaderRule = config.module.rules.find((rule) => {
        return rule.use && rule.use.some((loader) => loader.loader.includes("sass-loader"));
      });
      if (sassLoaderRule) {
        sassLoaderRule.use = sassLoaderRule.use.map((loader) => {
          if (loader.loader.includes("sass-loader")) {
            loader.options = {
              ...loader.options,
              sassOptions: {
                quietDeps: true,
                logger: {
                  warn: () => {
                  }
                  // Suppresses warnings entirely
                }
              }
            };
          }
          return loader;
        });
      }
    }
  }),
  /**
   * Custom webpack chain
   */
  chainWebpack: (config, _isServer) => {
    config.module.rule("files").test(/\.(pdf|zip|ait|log|txt|stp)$/).use("file-loader").loader("file-loader").options({
      name: `[path][name].[ext]`
    });
    config.module.rule("vue").use("vue-loader").tap((options) => {
      options.transformAssetUrls = {
        video: ["src", "poster"],
        source: "src",
        img: "src",
        image: ["xlink:href", "href"],
        a: "href"
      };
      return options;
    });
  }
});
function getBuildingSidebar() {
  return [
    {
      text: "Building a Mini VR Rig",
      link: "/building/",
      collapsible: true,
      children: [
        "/building/cabinet.md",
        // Maps to `building/cabinet.md`
        "/building/stage.md",
        // Maps to `building/stage.md`
        "/building/air-supply.md",
        // Maps to `building/air-supply.md`
        "/building/positioning.md",
        // Maps to `building/positioning.md`
        "/building/projection.md",
        // Maps to `building/projection.md`
        "/building/reward.md",
        // Maps to `building/reward.md`
        "/building/air-puffs.md",
        // Maps to `building/air-puffs.md`
        "/building/control.md",
        // Maps to `building/control.md`
        "/building/pupillometry.md",
        // Maps to `building/pupillometry.md`
        "/building/lick-detection.md"
        // Maps to `building/lick-detection.md`
      ]
    }
  ];
}
function getMaintenanceSidebar() {
  return [
    {
      text: "Maintenance",
      link: "/maintenance/",
      collapsible: true,
      children: [
        "/maintenance/projection.md",
        // Maps to `maintenance/projection.md`
        "/maintenance/reward.md",
        // Maps to `maintenance/reward.md`
        "/maintenance/stage.md",
        // Maps to `maintenance/stage.md`
        "/maintenance/positioning.md",
        // Maps to `maintenance/positioning.md`
        "/maintenance/miscellaneous.md"
        // Maps to `maintenance/miscellaneous.md`
      ]
    }
  ];
}
function getSoftwareSidebar() {
  return [
    {
      text: "Software",
      link: "/software/",
      collapsible: true,
      children: [
        "/software/db_access.md",
        // Maps to `software/db_access.md`
        "/software/db_organization.md",
        // Maps to `software/db_organization.md`
        "/software/db_analysis.md",
        // Maps to `software/db_analysis.md`
        "/software/virmen_guide.md",
        // Maps to `software/virmen_guide.md`
        "/software/automation_pipeline.md",
        // Maps to `software/automation_pipeline.md`
        "/software/automated_cronjobs.md",
        // Maps to `software/automated_cronjobs.md`
        "/software/automation_pipeline_developer.md",
        // Maps to `software/automation_pipeline_developer.md`
        "/software/configure_systems.md",
        // Maps to `software/configure_systems.md`
        "/software/alert_system.md",
        // Maps to `software/alert_system.md`
        "/software/manipulation_pipeline.md",
        // Maps to `software/manipulation_pipeline.md`
        "/software/pupillometry_guide.md",
        // Maps to `software/pupillometry_guide.md`
        "/software/subtask_pipeline.md"
        // Maps to `software/subtask_pipeline.md`
      ]
    }
  ];
}
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZ1ZXByZXNzL2NvbmZpZy50cyIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamw0NDU5L0RvY3VtZW50cy9Xb3JrL1ByaW5jZXRvbi9CUkFJTiBDb0dTL1ZScmlncy1kb2N1bWVudGF0aW9uLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2psNDQ1OS9Eb2N1bWVudHMvV29yay9QcmluY2V0b24vQlJBSU4gQ29HUy9WUnJpZ3MtZG9jdW1lbnRhdGlvbi8udnVlcHJlc3MvY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qbDQ0NTkvRG9jdW1lbnRzL1dvcmsvUHJpbmNldG9uL0JSQUlOJTIwQ29HUy9WUnJpZ3MtZG9jdW1lbnRhdGlvbi8udnVlcHJlc3MvY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lVXNlckNvbmZpZyB9IGZyb20gJ3Z1ZXByZXNzJ1xuaW1wb3J0IHsgZGVmYXVsdFRoZW1lIH0gZnJvbSAnQHZ1ZXByZXNzL3RoZW1lLWRlZmF1bHQnXG5pbXBvcnQgeyBkZXNjcmlwdGlvbiB9IGZyb20gJy4uL3BhY2thZ2UuanNvbidcbmltcG9ydCB7IHdlYnBhY2tCdW5kbGVyIH0gZnJvbSAnQHZ1ZXByZXNzL2J1bmRsZXItd2VicGFjaydcbmltcG9ydCBzZWFyY2hQbHVnaW5Nb2R1bGUgZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi1zZWFyY2gnO1xuXG5jb25zdCB7IHNlYXJjaFBsdWdpbiB9ID0gc2VhcmNoUGx1Z2luTW9kdWxlO1xuXG5jb25zdCBzaXRlRGVzY3JpcHRpb24gPSB0eXBlb2YgZGVzY3JpcHRpb24gPT09ICdzdHJpbmcnID8gZGVzY3JpcHRpb24gOiAnRGVmYXVsdCBzaXRlIGRlc2NyaXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XG4gIC8qKlxuICAgKiBTaXRlIFRpdGxlXG4gICAqIFJlZjogaHR0cHM6Ly92Mi52dWVwcmVzcy52dWVqcy5vcmcvcmVmZXJlbmNlL2NvbmZpZy5odG1sI3RpdGxlXG4gICAqL1xuICB0aXRsZTogJ0JSQUlOIENvR1MgbWluaSBWUiByaWdzJyxcblxuICAvKipcbiAgICogU2l0ZSBEZXNjcmlwdGlvblxuICAgKiBSZWY6IGh0dHBzOi8vdjIudnVlcHJlc3MudnVlanMub3JnL3JlZmVyZW5jZS9jb25maWcuaHRtbCNkZXNjcmlwdGlvblxuICAgKi9cbiAgZGVzY3JpcHRpb246IHNpdGVEZXNjcmlwdGlvbixcblxuICAvKipcbiAgICogRXh0cmEgdGFncyB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBwYWdlIEhUTUwgPGhlYWQ+XG4gICAqIFJlZjogaHR0cHM6Ly92Mi52dWVwcmVzcy52dWVqcy5vcmcvcmVmZXJlbmNlL2NvbmZpZy5odG1sI2hlYWRcbiAgICovXG4gIGhlYWQ6IFtcbiAgICBbJ21ldGEnLCB7IG5hbWU6ICd0aGVtZS1jb2xvcicsIGNvbnRlbnQ6ICcjM2VhZjdjJyB9XSxcbiAgICBbJ21ldGEnLCB7IG5hbWU6ICdhcHBsZS1tb2JpbGUtd2ViLWFwcC1jYXBhYmxlJywgY29udGVudDogJ3llcycgfV0sXG4gICAgWydtZXRhJywgeyBuYW1lOiAnYXBwbGUtbW9iaWxlLXdlYi1hcHAtc3RhdHVzLWJhci1zdHlsZScsIGNvbnRlbnQ6ICdibGFjaycgfV1cbiAgXSxcblxuICAvKipcbiAgICogVGhlbWUgY29uZmlndXJhdGlvblxuICAgKiBSZWY6IGh0dHBzOi8vdjIudnVlcHJlc3MudnVlanMub3JnL3JlZmVyZW5jZS9kZWZhdWx0LXRoZW1lL2NvbmZpZy5odG1sXG4gICAqL1xuICB0aGVtZTogZGVmYXVsdFRoZW1lKHtcbiAgICByZXBvOiAnJyxcbiAgICBlZGl0TGluazogZmFsc2UsIC8vIFJlcGxhY2VkIGVkaXRMaW5rcyB3aXRoIGVkaXRMaW5rXG4gICAgZG9jc0RpcjogJycsXG4gICAgZWRpdExpbmtUZXh0OiAnJyxcbiAgICBsYXN0VXBkYXRlZDogZmFsc2UsIC8vIFRoaXMgaXMgY29ycmVjdCBmb3IgVnVlUHJlc3MgMi54XG4gICAgbmF2YmFyOiBbXG4gICAgICB7IHRleHQ6ICdCdWlsZGluZycsIGxpbms6ICcvYnVpbGRpbmcvJyB9LFxuICAgICAgeyB0ZXh0OiAnTWFpbnRlbmFuY2UnLCBsaW5rOiAnL21haW50ZW5hbmNlLycgfSxcbiAgICAgIHsgdGV4dDogJ1NvZnR3YXJlJywgbGluazogJy9zb2Z0d2FyZS8nIH1cbiAgICBdLFxuICAgIHNpZGViYXI6IHtcbiAgICAgICcvYnVpbGRpbmcvJzogZ2V0QnVpbGRpbmdTaWRlYmFyKCksXG4gICAgICAnL21haW50ZW5hbmNlLyc6IGdldE1haW50ZW5hbmNlU2lkZWJhcigpLFxuICAgICAgJy9zb2Z0d2FyZS8nOiBnZXRTb2Z0d2FyZVNpZGViYXIoKSxcbiAgICB9XG4gIH0pLFxuXG4gIC8qKlxuICAgKiBBcHBseSBwbHVnaW5zXG4gICAqIFJlZjogaHR0cHM6Ly92Mi52dWVwcmVzcy52dWVqcy5vcmcvcmVmZXJlbmNlL3BsdWdpbi1hcGkuaHRtbFxuICAgKi9cbiAgcGx1Z2luczogW1xuICAgIHNlYXJjaFBsdWdpbih7XG4gICAgICAvLyBPcHRpb25zIGZvciB0aGUgc2VhcmNoIHBsdWdpblxuICAgICAgbWF4U3VnZ2VzdGlvbnM6IDEwLCAvLyBNYXhpbXVtIG51bWJlciBvZiBzZWFyY2ggc3VnZ2VzdGlvbnNcbiAgICAgIGlzU2VhcmNoYWJsZTogKHBhZ2UpID0+IHBhZ2UucGF0aCAhPT0gJy8nLCAvLyBTcGVjaWZ5IHdoaWNoIHBhZ2VzIGFyZSBzZWFyY2hhYmxlXG4gICAgICBsb2NhbGVzOiB7XG4gICAgICAgICcvJzoge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiAnU2VhcmNoLi4uJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG5cbiAgLyoqXG4gICAqIFdlYnBhY2sgQ29uZmlndXJhdGlvblxuICAgKiBSZWY6IGh0dHBzOi8vdjIudnVlcHJlc3MudnVlanMub3JnL3JlZmVyZW5jZS9idW5kbGVyLXdlYnBhY2svY29uZmlnLmh0bWxcbiAgICovXG4gIGJ1bmRsZXI6IHdlYnBhY2tCdW5kbGVyKHtcbiAgICBjb25maWd1cmVXZWJwYWNrOiAoY29uZmlnKSA9PiB7XG4gICAgICAvLyBUZW1wb3Jhcmx5IHN1cHJlc3Mgd2FybmluZ3Mgd2hpbGUgdnVlcHJlc3MgMi4wIGZpeCBidWdzXG4gICAgICBjb25zdCBzYXNzTG9hZGVyUnVsZSA9IGNvbmZpZy5tb2R1bGUucnVsZXMuZmluZCgocnVsZSkgPT4ge1xuICAgICAgICByZXR1cm4gcnVsZS51c2UgJiYgcnVsZS51c2Uuc29tZSgobG9hZGVyKSA9PiBsb2FkZXIubG9hZGVyLmluY2x1ZGVzKCdzYXNzLWxvYWRlcicpKTtcbiAgICAgIH0pO1xuICAgIFxuICAgICAgaWYgKHNhc3NMb2FkZXJSdWxlKSB7XG4gICAgICAgIHNhc3NMb2FkZXJSdWxlLnVzZSA9IHNhc3NMb2FkZXJSdWxlLnVzZS5tYXAoKGxvYWRlcikgPT4ge1xuICAgICAgICAgIGlmIChsb2FkZXIubG9hZGVyLmluY2x1ZGVzKCdzYXNzLWxvYWRlcicpKSB7XG4gICAgICAgICAgICBsb2FkZXIub3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgLi4ubG9hZGVyLm9wdGlvbnMsXG4gICAgICAgICAgICAgIHNhc3NPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgcXVpZXREZXBzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvZ2dlcjoge1xuICAgICAgICAgICAgICAgICAgd2FybjogKCkgPT4ge30sIC8vIFN1cHByZXNzZXMgd2FybmluZ3MgZW50aXJlbHlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGxvYWRlcjtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbmZpZy5tb2R1bGUucnVsZXMucHVzaCh7XG4gICAgICAvLyAgIHRlc3Q6IC9cXC5qcyQvLFxuICAgICAgLy8gICBleGNsdWRlOiAvbm9kZV9tb2R1bGVzLyxcbiAgICAgIC8vICAgdXNlOiB7XG4gICAgICAvLyAgICAgbG9hZGVyOiAnYmFiZWwtbG9hZGVyJyxcbiAgICAgIC8vICAgICBvcHRpb25zOiB7XG4gICAgICAvLyAgICAgICBwcmVzZXRzOiBbJ0BiYWJlbC9wcmVzZXQtZW52J10sXG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIH0pO1xuICAgIH1cbiAgfSksXG5cbiAgLyoqXG4gICAqIEN1c3RvbSB3ZWJwYWNrIGNoYWluXG4gICAqL1xuICBjaGFpbldlYnBhY2s6IChjb25maWcsIF9pc1NlcnZlcikgPT4ge1xuICAgIGNvbmZpZy5tb2R1bGVcbiAgICAgIC5ydWxlKCdmaWxlcycpXG4gICAgICAudGVzdCgvXFwuKHBkZnx6aXB8YWl0fGxvZ3x0eHR8c3RwKSQvKVxuICAgICAgLnVzZSgnZmlsZS1sb2FkZXInKVxuICAgICAgLmxvYWRlcignZmlsZS1sb2FkZXInKVxuICAgICAgLm9wdGlvbnMoe1xuICAgICAgICBuYW1lOiBgW3BhdGhdW25hbWVdLltleHRdYFxuICAgICAgfSk7XG4gICAgXG4gICAgY29uZmlnLm1vZHVsZVxuICAgICAgLnJ1bGUoJ3Z1ZScpXG4gICAgICAudXNlKCd2dWUtbG9hZGVyJylcbiAgICAgIC50YXAoKG9wdGlvbnMpID0+IHtcbiAgICAgICAgb3B0aW9ucy50cmFuc2Zvcm1Bc3NldFVybHMgPSB7XG4gICAgICAgICAgdmlkZW86IFsnc3JjJywgJ3Bvc3RlciddLFxuICAgICAgICAgIHNvdXJjZTogJ3NyYycsXG4gICAgICAgICAgaW1nOiAnc3JjJyxcbiAgICAgICAgICBpbWFnZTogWyd4bGluazpocmVmJywgJ2hyZWYnXSxcbiAgICAgICAgICBhOiAnaHJlZidcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0aW9uc1xuICAgICAgfSk7XG4gIH1cbn0pXG5cbi8qKlxuICogU2lkZWJhciBjb25maWd1cmF0aW9uIGZvciAvYnVpbGRpbmcvXG4gKi9cbmZ1bmN0aW9uIGdldEJ1aWxkaW5nU2lkZWJhcigpIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICB0ZXh0OiAnQnVpbGRpbmcgYSBNaW5pIFZSIFJpZycsXG4gICAgICBsaW5rOiAnL2J1aWxkaW5nLycsXG4gICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICcvYnVpbGRpbmcvY2FiaW5ldC5tZCcsICAgICAgICAgICAvLyBNYXBzIHRvIGBidWlsZGluZy9jYWJpbmV0Lm1kYFxuICAgICAgICAnL2J1aWxkaW5nL3N0YWdlLm1kJywgICAgICAgICAgICAgLy8gTWFwcyB0byBgYnVpbGRpbmcvc3RhZ2UubWRgXG4gICAgICAgICcvYnVpbGRpbmcvYWlyLXN1cHBseS5tZCcsICAgICAgICAvLyBNYXBzIHRvIGBidWlsZGluZy9haXItc3VwcGx5Lm1kYFxuICAgICAgICAnL2J1aWxkaW5nL3Bvc2l0aW9uaW5nLm1kJywgICAgICAgLy8gTWFwcyB0byBgYnVpbGRpbmcvcG9zaXRpb25pbmcubWRgXG4gICAgICAgICcvYnVpbGRpbmcvcHJvamVjdGlvbi5tZCcsICAgICAgICAvLyBNYXBzIHRvIGBidWlsZGluZy9wcm9qZWN0aW9uLm1kYFxuICAgICAgICAnL2J1aWxkaW5nL3Jld2FyZC5tZCcsICAgICAgICAgICAgLy8gTWFwcyB0byBgYnVpbGRpbmcvcmV3YXJkLm1kYFxuICAgICAgICAnL2J1aWxkaW5nL2Fpci1wdWZmcy5tZCcsICAgICAgICAgLy8gTWFwcyB0byBgYnVpbGRpbmcvYWlyLXB1ZmZzLm1kYFxuICAgICAgICAnL2J1aWxkaW5nL2NvbnRyb2wubWQnLCAgICAgICAgICAgLy8gTWFwcyB0byBgYnVpbGRpbmcvY29udHJvbC5tZGBcbiAgICAgICAgJy9idWlsZGluZy9wdXBpbGxvbWV0cnkubWQnLCAgICAgIC8vIE1hcHMgdG8gYGJ1aWxkaW5nL3B1cGlsbG9tZXRyeS5tZGBcbiAgICAgICAgJy9idWlsZGluZy9saWNrLWRldGVjdGlvbi5tZCcsICAgIC8vIE1hcHMgdG8gYGJ1aWxkaW5nL2xpY2stZGV0ZWN0aW9uLm1kYFxuICAgICAgXSxcbiAgICB9LFxuICBdO1xufVxuXG4vKipcbiAqIFNpZGViYXIgY29uZmlndXJhdGlvbiBmb3IgL21haW50ZW5hbmNlL1xuICovXG5mdW5jdGlvbiBnZXRNYWludGVuYW5jZVNpZGViYXIoKSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgdGV4dDogJ01haW50ZW5hbmNlJyxcbiAgICAgIGxpbms6ICcvbWFpbnRlbmFuY2UvJyxcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgJy9tYWludGVuYW5jZS9wcm9qZWN0aW9uLm1kJywgICAgICAvLyBNYXBzIHRvIGBtYWludGVuYW5jZS9wcm9qZWN0aW9uLm1kYFxuICAgICAgICAnL21haW50ZW5hbmNlL3Jld2FyZC5tZCcsICAgICAgICAgIC8vIE1hcHMgdG8gYG1haW50ZW5hbmNlL3Jld2FyZC5tZGBcbiAgICAgICAgJy9tYWludGVuYW5jZS9zdGFnZS5tZCcsICAgICAgICAgICAvLyBNYXBzIHRvIGBtYWludGVuYW5jZS9zdGFnZS5tZGBcbiAgICAgICAgJy9tYWludGVuYW5jZS9wb3NpdGlvbmluZy5tZCcsICAgICAvLyBNYXBzIHRvIGBtYWludGVuYW5jZS9wb3NpdGlvbmluZy5tZGBcbiAgICAgICAgJy9tYWludGVuYW5jZS9taXNjZWxsYW5lb3VzLm1kJywgICAvLyBNYXBzIHRvIGBtYWludGVuYW5jZS9taXNjZWxsYW5lb3VzLm1kYFxuICAgICAgXSxcbiAgICB9LFxuICBdO1xufVxuXG4vKipcbiAqIFNpZGViYXIgY29uZmlndXJhdGlvbiBmb3IgL3NvZnR3YXJlL1xuICovXG5mdW5jdGlvbiBnZXRTb2Z0d2FyZVNpZGViYXIoKSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgdGV4dDogJ1NvZnR3YXJlJyxcbiAgICAgIGxpbms6ICcvc29mdHdhcmUvJyxcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgJy9zb2Z0d2FyZS9kYl9hY2Nlc3MubWQnLCAgICAgICAgICAgICAgICAgLy8gTWFwcyB0byBgc29mdHdhcmUvZGJfYWNjZXNzLm1kYFxuICAgICAgICAnL3NvZnR3YXJlL2RiX29yZ2FuaXphdGlvbi5tZCcsICAgICAgICAgICAvLyBNYXBzIHRvIGBzb2Z0d2FyZS9kYl9vcmdhbml6YXRpb24ubWRgXG4gICAgICAgICcvc29mdHdhcmUvZGJfYW5hbHlzaXMubWQnLCAgICAgICAgICAgICAgIC8vIE1hcHMgdG8gYHNvZnR3YXJlL2RiX2FuYWx5c2lzLm1kYFxuICAgICAgICAnL3NvZnR3YXJlL3Zpcm1lbl9ndWlkZS5tZCcsICAgICAgICAgICAgICAvLyBNYXBzIHRvIGBzb2Z0d2FyZS92aXJtZW5fZ3VpZGUubWRgXG4gICAgICAgICcvc29mdHdhcmUvYXV0b21hdGlvbl9waXBlbGluZS5tZCcsICAgICAgIC8vIE1hcHMgdG8gYHNvZnR3YXJlL2F1dG9tYXRpb25fcGlwZWxpbmUubWRgXG4gICAgICAgICcvc29mdHdhcmUvYXV0b21hdGVkX2Nyb25qb2JzLm1kJywgICAgICAgIC8vIE1hcHMgdG8gYHNvZnR3YXJlL2F1dG9tYXRlZF9jcm9uam9icy5tZGBcbiAgICAgICAgJy9zb2Z0d2FyZS9hdXRvbWF0aW9uX3BpcGVsaW5lX2RldmVsb3Blci5tZCcsIC8vIE1hcHMgdG8gYHNvZnR3YXJlL2F1dG9tYXRpb25fcGlwZWxpbmVfZGV2ZWxvcGVyLm1kYFxuICAgICAgICAnL3NvZnR3YXJlL2NvbmZpZ3VyZV9zeXN0ZW1zLm1kJywgICAgICAgICAvLyBNYXBzIHRvIGBzb2Z0d2FyZS9jb25maWd1cmVfc3lzdGVtcy5tZGBcbiAgICAgICAgJy9zb2Z0d2FyZS9hbGVydF9zeXN0ZW0ubWQnLCAgICAgICAgICAgICAgLy8gTWFwcyB0byBgc29mdHdhcmUvYWxlcnRfc3lzdGVtLm1kYFxuICAgICAgICAnL3NvZnR3YXJlL21hbmlwdWxhdGlvbl9waXBlbGluZS5tZCcsICAgICAvLyBNYXBzIHRvIGBzb2Z0d2FyZS9tYW5pcHVsYXRpb25fcGlwZWxpbmUubWRgXG4gICAgICAgICcvc29mdHdhcmUvcHVwaWxsb21ldHJ5X2d1aWRlLm1kJywgICAgICAgIC8vIE1hcHMgdG8gYHNvZnR3YXJlL3B1cGlsbG9tZXRyeV9ndWlkZS5tZGBcbiAgICAgICAgJy9zb2Z0d2FyZS9zdWJ0YXNrX3BpcGVsaW5lLm1kJywgICAgICAgICAgLy8gTWFwcyB0byBgc29mdHdhcmUvc3VidGFza19waXBlbGluZS5tZGBcbiAgICAgIF0sXG4gICAgfSxcbiAgXTtcbn0iLCAie1xuICBcIm5hbWVcIjogXCJ2cnJpZ3NcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkRvY3VtZW50YXRpb24gZm9yIHZpcnR1YWwgcmVhbGl0eSByaWdzIGF0IFByaW5jZXRvbiBCUkFJTiBDb0dTIHByb2plY3RcIixcbiAgXCJtYWluXCI6IFwiaW5kZXguanNcIixcbiAgXCJhdXRob3JzXCI6IHtcbiAgICBcIm5hbWVcIjogXCJKdWFuIExvcGV6IEx1bmFcIixcbiAgICBcImVtYWlsXCI6IFwianVhbmxvcGV6QHByaW5jZXRvbi5lZHVcIlxuICB9LFxuICBcInJlcG9zaXRvcnlcIjogXCIvVlJfcmlnc19kb2NzXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2dWVwcmVzcyBkZXZcIixcbiAgICBcImJ1aWxkXCI6IFwidnVlcHJlc3MgYnVpbGRcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGJhYmVsL2NvcmVcIjogXCJeNy4yNi4wXCIsXG4gICAgXCJAYmFiZWwvcHJlc2V0LWVudlwiOiBcIl43LjI2LjBcIixcbiAgICBcIkB2dWVwcmVzcy9idW5kbGVyLXdlYnBhY2tcIjogXCIyLjAuMC1yYy4xOVwiLFxuICAgIFwiQHZ1ZXByZXNzL3BsdWdpbi1iYWNrLXRvLXRvcFwiOiBcIl4yLjAuMC1yYy42OFwiLFxuICAgIFwiQHZ1ZXByZXNzL3BsdWdpbi1tZWRpdW0tem9vbVwiOiBcIl4yLjAuMC1yYy42OFwiLFxuICAgIFwiQHZ1ZXByZXNzL3BsdWdpbi1zZWFyY2hcIjogXCJeMS45LjEwXCIsXG4gICAgXCJAdnVlcHJlc3MvdGhlbWUtZGVmYXVsdFwiOiBcIjIuMC4wLXJjLjE5XCIsXG4gICAgXCJiYWJlbC1sb2FkZXJcIjogXCJeOS4yLjFcIixcbiAgICBcImVudmluZm9cIjogXCJeNy4xNC4wXCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNDkuMFwiLFxuICAgIFwic2Fzcy1sb2FkZXJcIjogXCJeMTIuNC4wXCIsXG4gICAgXCJ2dWVwcmVzc1wiOiBcIjIuMC4wLXJjLjE5XCIsXG4gICAgXCJ3ZWJwYWNrXCI6IFwiXjVcIixcbiAgICBcIndlYnBhY2stY2xpXCI6IFwiXjRcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJoaWdobGlnaHQuanNcIjogXCJeMTEuMTEuMVwiLFxuICAgIFwidnVlXCI6IFwiXjMuMi4wXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwWixTQUFTLHdCQUF3QjtBQUMzYixTQUFTLG9CQUFvQjs7O0FDRTNCLGtCQUFlOzs7QURBakIsU0FBUyxzQkFBc0I7QUFDL0IsT0FBTyx3QkFBd0I7QUFFL0IsSUFBTSxFQUFFLGFBQWEsSUFBSTtBQUV6QixJQUFNLGtCQUFrQixPQUFPLGdCQUFnQixXQUFXLGNBQWM7QUFFeEUsSUFBTyxpQkFBUSxpQkFBaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSzlCLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTVAsYUFBYTtB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
