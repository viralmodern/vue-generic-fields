const MODE_PATH = 'tracking'
const DEFAULT_MODE = 'd'
export const mxRootPathDocketsOdt = {
  computed: {
    $$isTrackerDockets() {
      let { params } = this.$route
      return params.hasOwnProperty(MODE_PATH) && params[MODE_PATH] === 't'
    },
    $$rootPathOdtDocket() {
      let { params } = this.$route
      if (params.hasOwnProperty(MODE_PATH)) {
        return `/odt/${params[MODE_PATH]}/dockets`
      }
      return `/odt/d/1/dockets`
    },
  },
}
