import Vue from 'vue'
import routes from './router'
import './plugins'
import store from './store'
import { Bus } from './utils/bus'
Vue.prototype.$eventHub = Bus
export default {
  store,
  routes
}
