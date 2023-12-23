export const fullScreenMixin = {
  methods: {
    onFullScreen(isFullScreen, idFullScreen) {
      if (!idFullScreen) return false
      this.handleDomFullScreen(!isFullScreen, idFullScreen)
      return !isFullScreen
    },
    handleDomFullScreen(isFullScreen, idFullScreen) {
      let el = document.getElementById(idFullScreen)
      if (isFullScreen) {
        el.classList.add('full_screen')
        document.documentElement.classList.add('full_screen')
      } else {
        el.classList.remove('full_screen')
        document.documentElement.classList.remove('full_screen')
      }
    },
  },
}
