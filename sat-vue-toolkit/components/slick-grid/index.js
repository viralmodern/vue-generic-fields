import Vue from 'vue'
import axios from 'axios';
import bus from '../../plugins/bus'
import api from '../../plugins/api'
const eventbus = new Vue()

// todo: inject $api to store with
/*
import store from '@/store'
store.$api = axios
*/

Vue.use(bus, { eventbus })
Vue.use(api, { axios })

import SlickGrid from './SlickGrid'
export default SlickGrid
