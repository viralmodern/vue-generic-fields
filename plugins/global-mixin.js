import Vue from 'vue'
import PortalVue from 'portal-vue'
Vue.use(PortalVue)
// Vue.config.devtools = true
// Vue.config.performance = true

import bus from '@/sat-vue-toolkit/plugins/bus'
const eventBus = new Vue()
Vue.use(bus, { eventBus })
// import '@/sat-vue-toolkit/satlegal/ht_plugins/filter'

import vueEventManager from 'vue-event-manager'
Vue.use(vueEventManager)

import LoadScript from 'vue-plugin-load-script'
Vue.use(LoadScript)
const MODE_PATH = 'tracking'
const DEFAULT_MODE = 't' // d, t
Vue.mixin({
  props: {
    $$productName: {
      type: String,
      required: false,
      default: process.env.productName,
    },
    $$currency: {
      type: String,
      required: false,
      default: () => '$',
    },
  },
  computed: {
    $$isTrackerDocketsOdt() {
      let { params } = this.$route
      return (
        params.hasOwnProperty(MODE_PATH) && params[MODE_PATH] === DEFAULT_MODE
      )
    },
    $$rootPathDocketOdt() {
      let { params, path } = this.$route
      if (params.hasOwnProperty(MODE_PATH)) {
        if (params[MODE_PATH] === 'd') {
          return `/odt/${params[MODE_PATH]}/${1}/dockets`
        }
        return `/odt/${params[MODE_PATH]}/${params['pathMatch']}/dockets`
      }
      return `/odt/${DEFAULT_MODE}`
    },
  },
})
// import tippy from 'tippy.js';
// import 'tippy.js/dist/tippy.css'; // optional for styling

export default function ({ $axios, app, route, store, redirect }, inject) {
  // store.$api = axios
  inject('api', $axios)
  // inject('tippy', tippy)
}
