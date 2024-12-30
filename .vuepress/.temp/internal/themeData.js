export const themeData = JSON.parse("{\"repo\":\"\",\"editLink\":false,\"docsDir\":\"\",\"editLinkText\":\"\",\"lastUpdated\":false,\"navbar\":[{\"text\":\"Building\",\"link\":\"/building/\"},{\"text\":\"Maintenance\",\"link\":\"/maintenance/\"},{\"text\":\"Software\",\"link\":\"/software/\"}],\"sidebar\":{\"/building/\":[{\"text\":\"Building a Mini VR Rig\",\"link\":\"/building/\",\"collapsible\":true,\"children\":[\"/building/cabinet.md\",\"/building/stage.md\",\"/building/air-supply.md\",\"/building/positioning.md\",\"/building/projection.md\",\"/building/reward.md\",\"/building/air-puffs.md\",\"/building/control.md\",\"/building/pupillometry.md\",\"/building/lick-detection.md\"]}],\"/maintenance/\":[{\"text\":\"Maintenance\",\"link\":\"/maintenance/\",\"collapsible\":true,\"children\":[\"/maintenance/projection.md\",\"/maintenance/reward.md\",\"/maintenance/stage.md\",\"/maintenance/positioning.md\",\"/maintenance/miscellaneous.md\"]}],\"/software/\":[{\"text\":\"Software\",\"link\":\"/software/\",\"collapsible\":true,\"children\":[\"/software/db_access.md\",\"/software/db_organization.md\",\"/software/db_analysis.md\",\"/software/virmen_guide.md\",\"/software/automation_pipeline.md\",\"/software/automated_cronjobs.md\",\"/software/automation_pipeline_developer.md\",\"/software/configure_systems.md\",\"/software/alert_system.md\",\"/software/manipulation_pipeline.md\",\"/software/pupillometry_guide.md\",\"/software/subtask_pipeline.md\"]}]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"logo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

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
