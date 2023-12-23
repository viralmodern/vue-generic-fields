import { BOARDS_MOCK } from './data'
const path_boards = (matterID) => `/api/projects/${matterID}/boards/`
export default {
  async fetchData({ commit }, payload) {
    try {
      let matterID = payload.matterID || ''
      await commit('SET_LOADING_STATE', true)
      let rs = await this.$axios.get(path_boards(matterID))
      console.log(rs.data, BOARDS_MOCK)
      let boards = rs.data
      await commit(
        'SET_INITIAL_DATA',
        boards.map((board) => Object.assign({}, { ...board }, { lists: [] }))
      )
      // await commit('SET_INITIAL_DATA', BOARDS_MOCK)
      await commit('SET_LOADING_STATE', false)
    } catch (e) {
      console.error('PO', e.message)
    }
  },
  async saveTaskBoard({ commit }, payload) {
    let board = await this.$axios.post(path_boards(payload.matterID), payload)
    console.log('board', board.data)
    commit('SAVE_TASKBOARD', board.data)
    // commit('SAVE_TASKBOARD', payload)
  },
  async archiveTaskBoard({ commit }, payload) {
    commit('ARCHIVE_TASKBOARD', payload)
  },
  async restoreTaskBoard({ commit }, payload) {
    commit('RESTORE_TASKBOARD', payload)
  },
  async setActiveTaskBoard({ commit }, payload) {
    commit('SET_ACTIVE_TASKBOARD', payload)
  },

  async saveTaskList({ commit }, payload) {
    commit('SAVE_TASKLIST', payload)
  },
  async archiveTaskList({ commit }, payload) {
    commit('ARCHIVE_TASKLIST', payload)
  },
  async restoreTaskList({ commit }, payload) {
    commit('RESTORE_TASKLIST', payload)
  },

  async reorderTaskLists({ commit }, payload) {
    commit('REORDER_TASKLISTS', payload)
  },
  async reorderTaskListItems({ commit }, payload) {
    commit('REORDER_TASKLIST_ITEMS', payload)
  },
  async fetchAllItem({ commit }) {},
  async saveTaskListItem({ commit }, payload) {
    try {
      let matterID = payload.matterID,
        boardID = payload.boardId,
        data = payload.item

      this.$axios.post(
        `/api/projects/${matterID}/boards/${boardID}/cards/`,
        data
      )
      commit('SAVE_TASKLIST_ITEM', payload)
    } catch (e) {
      console.log('saveTaskListItem', e.message)
    }
  },
  async deleteTaskListItem({ commit }, payload) {
    commit('DELETE_TASKLIST_ITEM', payload)
  }
}
