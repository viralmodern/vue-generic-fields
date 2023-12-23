import { LINKS_ODT } from '~/features/odt/configs/linksOdt'

const types = {
  resetSettingsLinksOdt: 'resetSettingsLinksOdt',
  loading: 'loading',
  complete: 'complete',
  resetLinks: 'resetLinks',
}
export const state = () => {
  return {
    linksOdt: LINKS_ODT,
    loading: false,
  }
}
export const getters = {
  loading: (state) => state.loading,
}

export const actions = {}

export const mutations = {
  [types.loading](state) {
    state.loading = true
  },
  [types.complete](state) {
    state.loading = false
  },
}
