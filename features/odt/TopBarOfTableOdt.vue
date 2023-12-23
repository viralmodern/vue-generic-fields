<template>
  <v-app-bar height="30px" dense flat>
    <slot>
      <v-tabs :class="{ 'tab-content-subs': isSettings }" show-arrows>
        <v-tabs-slider color="warning"></v-tabs-slider>
        <v-tab
          v-for="(tab, index) in tabs"
          :key="index"
          :exact="!tab.to.path"
          :to="tab.to"
          replace
        >
          <div
            class="text-capitalize caption text-no-wrap text-title-pin"
            v-html="tab.label"
          ></div>
        </v-tab>
      </v-tabs>
    </slot>
    <v-spacer />
    <template v-if="isSettings">
      <div class="fill-height">
        <div class="fill-height d-flex align-center" style="flex-grow: 1">
          <slot name="right">
            <v-toolbar-items>
              <v-btn v-bind="linkOption" class="text-uppercase">
                Add View
              </v-btn>
              <div class="ml-1"></div>
              <template v-for="setting in settings">
                <v-btn
                  small
                  fab
                  text
                  class="ml-2"
                  color="primary"
                  :title="setting.label"
                  v-on="setting.on"
                >
                  <v-icon v-if="setting.icon" :color="setting.color">
                    {{ setting.icon }}
                  </v-icon>
                  <template v-else></template>
                </v-btn>
              </template>
            </v-toolbar-items>
          </slot>
        </div>
      </div>
    </template>
  </v-app-bar>
</template>

<script>
import { SETTINGS } from '@/features/odt/helpers/odt.json'

export default {
  name: 'TopBarOfTableOdt',
  props: {
    idFullScreen: {
      type: String,
      default: () => '',
    },

    tabs: {
      type: Array,
      default: () => [],
    },
    disabledSetting: {
      type: Boolean,
      default: () => false,
    },
    linkOption: {
      type: Object,
      default: () => ({
        small: true,
        rounded: false,
        depressed: true,
        class: 'caption text-capitalize',
        activeClass: 'primary--text',
      }),
    },
  },
  data() {
    return {
      isFullScreen: false,
    }
  },
  computed: {
    settings() {
      let { isFullScreen } = this
      return [
        SETTINGS.EDIT,
        SETTINGS.DELETE,
        {
          ...SETTINGS.FULL_SCREEN,
          label:
            (isFullScreen && SETTINGS.FULL_SCREEN.labelRollback) ||
            SETTINGS.FULL_SCREEN.label,
          icon:
            (isFullScreen && SETTINGS.FULL_SCREEN.iconRollback) ||
            SETTINGS.FULL_SCREEN.icon,
          on: {
            click: this.onFullScreen,
          },
        },
      ]
    },
    isSettings() {
      let { disabledSetting, idFullScreen } = this
      return !disabledSetting && idFullScreen
    },
  },
  methods: {
    onFullScreen() {
      let { idFullScreen } = this
      if (!idFullScreen) return
      let isFullScreen = !this.isFullScreen
      this.handleDomFullScreen(isFullScreen)
      this.isFullScreen = isFullScreen
    },
    handleDomFullScreen(isFullScreen) {
      let { idFullScreen } = this
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
</script>

<style lang="scss">
.v-app-bar.v-app-bar--fixed,
#app-left-sidebar,
.v-footer,
.pinned-layout-link {
  transition: all 0.25s ease-in-out !important;
}
html.full_screen {
  .v-app-bar.v-app-bar--fixed,
  #app-left-sidebar,
  .v-footer,
  .pinned-layout-link {
    opacity: 0 !important;
    pointer-events: none;
    z-index: -999;
    visibility: hidden;
  }
  .full_screen:not(.dashboard-table-scroll) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
  }
  .dashboard-table-scroll {
    height: 89.2vh !important;
  }
}
.tab-content-subs {
  /*border: solid 1px red;*/
  /*flex-grow: 1;*/
  max-width: 85%;
}
</style>
