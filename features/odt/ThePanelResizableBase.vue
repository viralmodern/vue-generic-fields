<template>
  <div
    class="panel-resizeable fill-height d-flex flex-column"
    ref="panel-resize"
    :style="{ 'border-color': color }"
    style="max-width: 2000px"
  >
    <v-app-bar height="38px" :flat="true" style="z-index: 4; flex: unset">
      <slot name="header" v-if="!collapsed" :label="label">
        <v-chip v-if="label" :dark="dark" :light="!dark" :color="color" small>{{
          label
        }}</v-chip>
      </slot>
      <v-spacer />
      <div class="pr-1 d-flex panel-resizeable-settings">
        <DragContentHandler />
        <ToggleContentHandler
          :value="collapsed"
          @input="change"
          ref="panel-resize-handler"
        />
      </div>
    </v-app-bar>
    <v-card
      tile
      flat
      :class="{ collapsed: collapsed }"
      class="panel-resizeable-content"
    >
      <div class="label-panel">
        <v-chip v-if="label" :dark="dark" :light="!dark" :color="color" small>{{
          label
        }}</v-chip>
      </div>
      <div :class="{ hide_base: collapsed }" class="label-content">
        <slot></slot>
      </div>
    </v-card>
  </div>
</template>

<script>
import ToggleContentHandler from '~/features/odt/ToggleContentHandler'
import DragContentHandler from '~/features/odt/DragContentHandler'
function $$resizeElement($el, minWidth, maxWidth, onCollapsed) {
  try {
    minWidth = minWidth || 50
    maxWidth = maxWidth || 420
    function closeContent() {}
    function openContent() {}
    function resizeEnd(event, end) {
      const {
        currentTarget,
        rect: { width },
      } = event
      const newWidth = `${width}px`
      currentTarget.style.width = newWidth // card-resize
      let isCollapsed = width <= minWidth
      if (isCollapsed) {
        closeContent()
      } else {
        openContent()
      }
      if (onCollapsed && typeof onCollapsed === 'function') {
        // if (isCollapsed) {
        onCollapsed(isCollapsed, end)
        // }
      }
    }
    let interactJs = require('interactjs')
    const interactEl = interactJs($el)
      .resizable({
        edges: {
          left: true,
          right: true,
        },
        restrictSize: {
          min: {
            width: minWidth,
          },
          max: {
            width: maxWidth,
          },
        },
        inertia: {
          resistance: 100,
          minSpeed: 200,
          endSpeed: 100,
        },
      })
      .on('resizemove', (event) => {
        resizeEnd(event)
        // toggleElement
      })
      .on('resizeend', (event) => {
        resizeEnd(event, true)
      })
    return interactEl
  } catch (e) {
    console.error('RESIZEABLE_FUNC', e.message)
    return false
  }
}
export default {
  name: 'ThePanelResizableBase',
  components: { DragContentHandler, ToggleContentHandler },
  props: {
    height: {
      type: String,
      default: () => `60vh`,
    },
    label: {
      type: [String, Boolean],
      default: () => 'Label',
    },
    color: {
      type: String,
      default: () => '',
      // default: () => 'primary',
    },
    colorChip: {
      type: String,
      default: () => 'primary',
    },

    dark: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      collapsed: false,
      minWidth: 50,
      maxWidth: 2000,
      maxWidthExpanded: 450,
    }
  },
  async mounted() {
    this.initResize()
  },
  methods: {
    initResize() {
      let $el = this.$refs['panel-resize']
      let maxWidth = this.maxWidth
      let resizeable = $$resizeElement(
        $el,
        50,
        maxWidth,
        (isCollapsed, end) => {
          if (end) {
            this.collapsed = isCollapsed
          }
        }
      )
      // console.log(resizeable)
    },
    change(collapsed) {
      this.collapsed = collapsed
      let $el = this.$refs['panel-resize']
      if (collapsed) {
        $el.style.width = `${this.minWidth}px`
      } else {
        $el.style.width = `${this.maxWidthExpanded}px`
      }
    },
  },
}
</script>
<style lang="scss"></style>
<style scoped lang="scss">
.panel-resizeable {
  border: solid 1px rgba(0, 0, 0, 0.05);
  position: relative;
  border-radius: 0 !important;
  .panel-resizeable--handler {
    right: 0px;
    top: 0px;
  }
  .panel-resizeable-settings {
    transform: translateX(-2px);
  }
  .panel-resizeable-content {
    position: relative;
    flex: 1 1 auto;
    overflow: hidden;
    overflow-y: auto;
    .label-panel {
      display: none;
      padding: 10px 10px;
      margin: 0 0 10px 0;
      line-height: 24px;
      position: absolute;
      top: 0;
      left: 48px;
      background: none;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    &.collapsed {
      /*border-left: 48px solid rgba(0, 0, 0, 0);*/
      overflow: hidden;
      .label-panel {
        display: block;
      }
      .label-content {
        width: 100%;
        overflow: hidden;
        height: 100%;
      }
    }
  }
}
.theme--dark {
  .panel-resizeable {
    border: solid 1px rgba(255, 255, 255, 0.2);
  }
}
</style>
