import { getSESSION, SESSION, setSESSION } from '~/utils'

const types = {
  updateLeftSidebarWidth: 'updateLeftSidebarWidth',
  toggleLeftSidebar: 'toggleLeftSidebar',
}

export const state = () => {
  return {
    leftSidebarWidth: getSESSION(SESSION.UI.leftSidebarWidth) || 300,
    leftSidebarCollapsed: getSESSION(SESSION.UI.leftSidebarCollapsed) === true,
  }
}

export const getters = {}

export const actions = {
  [types.updateLeftSidebarWidth]({ commit, dispatch, state }, width) {
    width = parseInt(width)
    commit(types.updateLeftSidebarWidth, width)
    if (state.leftSidebarCollapsed) {
      dispatch(types.toggleLeftSidebar)
    }
    setSESSION(SESSION.UI.leftSidebarWidth, width)
  },

  [types.toggleLeftSidebar]({ commit, state }) {
    let stt = !state.leftSidebarCollapsed
    commit(types.toggleLeftSidebar, stt)
    if (stt) {
      try {
        document.getElementById('style-app-left-sidebar').remove()
      } catch (e) {}
    }
    setSESSION(SESSION.UI.leftSidebarCollapsed, state.leftSidebarCollapsed)
  },
}

export const mutations = {
  [types.updateLeftSidebarWidth](state, width) {
    state.leftSidebarWidth = parseInt(width)
  },

  [types.toggleLeftSidebar](state, status) {
    state.leftSidebarCollapsed = status
  },
}
