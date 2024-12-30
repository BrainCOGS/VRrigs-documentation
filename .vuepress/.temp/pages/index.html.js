import comp from "/Users/jl4459/Documents/Work/Princeton/BRAIN CoGS/VRrigs-documentation/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"heroImage\":\"./images/braincogslogo.png\",\"tagline\":\"Documentation for building and mantain mini virtual reality rigs at Princeton BRAIN CoGS\",\"actionText\":\"Quick start\",\"actions\":[{\"text\":\"Quick start\",\"link\":\"building/\",\"type\":\"primary\"}],\"features\":[{\"title\":\"Build a mini VR rig\",\"details\":\"Detailed documentation to build a mini VR rig from scratch\"},{\"title\":\"Maintenance of a mini VR\",\"details\":\"Documentation for the maintenance of a mini virtual reality rig modules\"},{\"title\":\"Software\",\"details\":\"Documentation for the software\"}],\"footer\":\"Made by BRAIN CoGS at Princeton Neuroscience Institute\"},\"headers\":[],\"git\":{\"contributors\":[{\"name\":\"Juan Luna\",\"username\":\"Juan Luna\",\"email\":\"juanlopez@princeton.edu\",\"commits\":4,\"url\":\"https://github.com/Juan Luna\"}]},\"filePathRelative\":\"index.md\"}")
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
