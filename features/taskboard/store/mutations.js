import Vue from 'vue'

// Lib to create guid
const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
const guid = () =>
  s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()

export default {
  // Set Initial Data
  SET_INITIAL_DATA(state, payload) {
    state.boards = payload
  },

  // Set Loading State
  SET_LOADING_STATE(state, payload) {
    state.isLoading = payload
  },

  // Save Task Board
  SAVE_TASKBOARD(state, payload) {
    const board = state.boards.find((b) => b.pk == payload.pk)
    const itemIdx = state.boards.findIndex((b) => b.pk == payload.pk)

    // For existing item
    if (itemIdx > -1) {
      board.name = payload.name
      board.description = payload.description
      board.color = payload.color
      Vue.set(state.boards, itemIdx, board)
    }
    // For new item
    else {
      let _pk = guid()
      const board = {
        id: _pk,
        pk: _pk,
        name: payload.name,
        description: payload.description,
        archived: false,
        lists: [],
        members: [],
        color: 'primary'
      }
      state.boards.push(board)
    }
  },

  // Archive Task Board
  ARCHIVE_TASKBOARD(state, payload) {
    const board = state.boards.find((b) => b.pk == payload.boardId)
    const boardIdx = state.boards.findIndex((b) => b.pk == payload.boardId)
    board.archived = true
    Vue.set(state.boards, boardIdx, board)
  },

  // Restore Task Board
  RESTORE_TASKBOARD(state, payload) {
    const board = state.boards.find((b) => b.pk == payload.boardId)
    const boardIdx = state.boards.findIndex((b) => b.pk == payload.boardId)
    board.archived = false
    Vue.set(state.boards, boardIdx, board)
  },

  // Save Task List
  SAVE_TASKLIST(state, payload) {
    const board = state.boards.find((b) => b.pk == payload.boardId)
    const list = board.lists.find((l) => l.pk == payload.listId)
    const listIdx = board.lists.findIndex((l) => l.pk == payload.listId)

    // For existing item
    if (listIdx > -1) {
      list.name = payload.name
      Vue.set(board.lists, listIdx, list)
    }
    // // For new item
    else {
      let _pk = guid()
      const list = {
        id: _pk,
        pk: _pk,
        name: payload.name,
        headerColor: '#607d8b',
        archived: false,
        items: []
      }
      board.lists.push(list)
    }
  },

  // Archive Task List
  ARCHIVE_TASKLIST(state, payload) {
    const board = state.boards.find((b) => b.pk == payload.boardId)
    const list = board.lists.find((l) => l.pk == payload.listId)
    const listIdx = board.lists.findIndex((l) => l.pk == payload.listId)
    list.archived = true
    Vue.set(board.lists, listIdx, list)
  },

  // Restore Task List
  RESTORE_TASKLIST(state, payload) {
    const board = state.boards.find((b) => b.pk == payload.boardId)
    const list = board.lists.find((l) => l.pk == payload.listId)
    const listIdx = board.lists.findIndex((l) => l.pk == payload.listId)
    list.archived = false
    Vue.set(board.lists, listIdx, list)
  },

  // Reorder TaskBoad ViewKanban
  REORDER_TASKLISTS(state, payload) {
    const board = state.boards.find((b) => b.pk == payload.boardId)
    Vue.set(board, 'lists', payload.lists)
  },

  // Reorder Task List Items
  REORDER_TASKLIST_ITEMS(state, payload) {
    const board = state.boards.find((b) => b.pk == payload.boardId)
    const listIdx = board.lists.findIndex((l) => l.pk == payload.listId)
    Vue.set(board.lists[listIdx], 'items', payload.items)
  },

  // Set Active Board
  SET_ACTIVE_TASKBOARD(state, payload) {
    state.activeBoard = payload.board
  },

  // Save Task List Item
  SAVE_TASKLIST_ITEM(state, payload) {
    const board = state.boards.find((b) => b.pk == payload.boardId)
    const list = board.lists.find((l) => l.pk == payload.listId)
    const itemIdx = list.items.findIndex((item) => item.pk == payload.item.pk)

    // For existing item
    if (itemIdx > -1) {
      Vue.set(list.items, itemIdx, payload.item)
    }
    // For new item
    else {
      payload.item.pk = guid()
      list.items.push(payload.item)
    }
  },

  // Delete Task List Item
  DELETE_TASKLIST_ITEM(state, payload) {
    const board = state.boards.find((b) => b.pk == payload.boardId)
    const list = board.lists.find((l) => l.pk == payload.listId)
    const itemIdx = list.items.findIndex((item) => item.pk == payload.item.pk)
    // For existing item
    if (itemIdx > -1) {
      Vue.delete(list.items, itemIdx)
    }
  }
}
