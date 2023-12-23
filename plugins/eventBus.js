import Vue from 'vue'
const eventBus = {}
eventBus.install = function(Vue) {
  Vue.prototype.$eventHub = new Vue()
  Vue.prototype.$eventBusTypes = {
    setBreadcrumbsMatterSetting: 'set-breadcrumbs-matter-setting',
    openQuickAllCAF: 'openQuickAllCAF'
  }
}

Vue.use(eventBus)
