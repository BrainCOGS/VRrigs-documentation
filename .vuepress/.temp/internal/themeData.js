export const themeData = JSON.parse("{\"repo\":\"\",\"editLink\":false,\"docsDir\":\"\",\"editLinkText\":\"\",\"lastUpdated\":false,\"navbar\":[{\"text\":\"Building\",\"link\":\"/building/\"},{\"text\":\"Maintenance\",\"link\":\"/maintenance/\"},{\"text\":\"Software\",\"link\":\"/software/\"}],\"sidebar\":{\"/building/\":[\"\",\"cabinet\",\"stage\",\"air-supply\",\"positioning\",\"projection\",\"reward\",\"air-puffs\",\"control\",\"pupillometry\",\"lick-detection\"],\"/maintenance/\":[\"\",\"projection\",\"reward\",\"stage\",\"positioning\",\"miscellaneous\"],\"/software/\":[\"\",\"db_access\",\"db_organization\",\"db_analysis\",\"virmen_guide\",\"automation_pipeline\",\"automated_cronjobs\",\"automation_pipeline_developer\",\"configure_systems\",\"alert_system\",\"manipulation_pipeline\",\"pupillometry_guide\",\"subtask_pipeline\"]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"logo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
