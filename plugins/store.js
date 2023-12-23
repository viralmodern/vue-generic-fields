import taskboard from '../features/taskboard'
import genericFields from '../features/generic-fields/store'
import filterBuilder from '../features/taskboard/components/controls/filter_builder/store/builder.filter'
import simpleDocket from '../features/simple-docket/store'

import { getStore, ht_store } from '@/sat-vue-toolkit/satlegal/ht_store'

export default function({ $axios, route, store, redirect, app: { router } }) {
  // todo: ht_store
  store.registerModule('ht_store', ht_store)

  store.registerModule('da_taskboard', taskboard.store)
  store.registerModule('filterBuilder', filterBuilder)
  store.registerModule('genericAttributes', genericFields)
  store.registerModule('simpleDocket', simpleDocket)

  getStore(store)
}
