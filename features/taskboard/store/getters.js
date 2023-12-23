export default {
  isLoading: (state) => state.isLoading,
  allBoards: (state) => state.boards,
  activeBoard: (state) => state.activeBoard,
  findBoardByID: (state) => (boardID) => {
    return state.boards.find((board) => board.pk === boardID) || {}
  },
  unarchivedBoards: (state) => state.boards.filter((b) => !b.archived),
  archivedBoards: (state) => state.boards.filter((b) => b.archived),
  archivedLists: (state) =>
    state.activeBoard ? state.activeBoard.lists.filter((l) => l.archived) : [],
  unarchivedLists: (state) =>
    state.activeBoard ? state.activeBoard.lists.filter((l) => !l.archived) : []
}
