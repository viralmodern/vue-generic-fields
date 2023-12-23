<template>
  <v-navigation-drawer
    ref="drawer"
    app
    left
    bottom
    fixed
    permanent
    :width="$store.state.ui.leftSidebarWidth"
    :mini-variant="$store.state.ui.leftSidebarCollapsed"
    :mini-variant-width="miniVariantWidth"
    height="100vh"
    id="app-left-sidebar"
  >
    <v-btn
      @click="$store.dispatch('ui/toggleLeftSidebar')"
      class="left-sidebar-toggle"
      fab
      x-small
      width="25px"
      height="25px"
      depressed
      style="border: solid 1px rgba(0, 0, 0, 0.2);"
      :style="{ right: toggleIconRight }"
    >
      <v-icon small v-html="toggleIcon" />
    </v-btn>
    <v-row
      class="fill-height"
      no-gutters
      style="height: 100vh; overflow: hidden; overflow-y: auto;"
    >
      <v-navigation-drawer
        ref="mini"
        dark
        style="position: sticky; top: 0; z-index: 3;"
        mini-variant
        :mini-variant-width="miniVariantWidth"
        permanent
      >
        <slot name="mini" />
      </v-navigation-drawer>
      <div :style="{ width: `calc(100% - ${miniVariantWidth}px)` }">
        <slot name="side-bar" />
      </div>
    </v-row>
  </v-navigation-drawer>
</template>
<script>
import interactjs from 'interactjs'

const MINI_VARIANT_WIDTH = 56
const MIN_WIDTH = 315
export default {
  name: 'ResizableSidebar',
  props: {
    minWidth: {
      type: Number,
      default: MIN_WIDTH,
    },
    miniVariantWidth: {
      type: Number,
      default: MINI_VARIANT_WIDTH,
    },
  },
  computed: {
    toggleIcon() {
      // mdi-chevron-right-circle mdi-chevron-left-circle-outline
      let _l = 'mdi-chevron-double-left',
        _r = 'mdi-chevron-double-right'
      return this.$store.state.ui.leftSidebarCollapsed ? _r : _l
    },
    toggleIconRight() {
      return this.$store.state.ui.leftSidebarCollapsed ? '0rem' : '0px'
      // return this.$store.state.ui.leftSidebarCollapsed ? '-1.3rem' : '0px'
    },
  },
  methods: {
    initInteract() {
      const id = 'style-app-left-sidebar'
      let styleElement = document.getElementById(id)
      if (!styleElement) {
        let head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style')
        head.appendChild(style)
        style.type = 'text/css'
        style.id = id

        styleElement = style
      }
      interactjs(this.$refs.drawer.$el)
        .resizable({
          edges: {
            right: true,
          },
          restrictSize: {
            min: {
              width: this.minWidth,
            },
          },
          inertia: {
            resistance: 50,
            minSpeed: 200,
            endSpeed: 100,
          },
        })
        .on('resizemove', (event) => {
          const newWidth = `${event.rect.width}px`
          styleElement.textContent = `
              #app-left-sidebar {
                  width: ${newWidth} !important
              }
              main.v-main {
                  padding-left: ${newWidth} !important
              }
              header.v-app-bar {
                  left: ${newWidth} !important
              }
          `
        })
        .on('resizeend', (event) => {
          //this.$vuetify.application.left = event.rect.width;
          this.$store.dispatch('ui/updateLeftSidebarWidth', event.rect.width)
        })
    },
  },
  mounted() {
    this.initInteract()
  },
}
</script>
<style>
.v-navigation-drawer {
  /*overflow: unset !important;*/
  touch-action: none;
}

.left-sidebar-toggle {
  position: absolute;
  overflow: hidden;
  top: 2.9rem;
  z-index: 5;
  cursor: pointer;
  right: 0px;
}
</style>
