import comp from "/Users/jl4459/Documents/Work/Princeton/BRAIN CoGS/VRrigs-documentation/.vuepress/.temp/pages/software/index.html.vue"
const data = JSON.parse("{\"path\":\"/software/\",\"title\":\"Software\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Software\",\"lang\":\"en-US\"},\"headers\":[{\"level\":2,\"title\":\"Introduction\",\"slug\":\"introduction\",\"link\":\"#introduction\",\"children\":[]}],\"git\":{\"contributors\":[{\"name\":\"Juan Luna\",\"username\":\"Juan Luna\",\"email\":\"juanlopez@princeton.edu\",\"commits\":2,\"url\":\"https://github.com/Juan Luna\"},{\"name\":\"Alvaro Luna\",\"username\":\"Alvaro Luna\",\"email\":\"alvalunasan@gmail.com\",\"commits\":1,\"url\":\"https://github.com/Alvaro Luna\"}]},\"filePathRelative\":\"software/index.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
