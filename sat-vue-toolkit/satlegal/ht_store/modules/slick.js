
// initial state
// shape: [{ id, quantity }]
// column: {name: 'cardName', title: 'Card name', priority: 0, visible: true}
const state = {
  allColumns: []
};
function priorityByNull(priority) {
  if (priority === 0) return 0;
  if (!priority) return 10000;
  return priority;
}
// getters
const getters = {
  visibleColumns: state => state
    .allColumns
    .filter(x => x.visible).slice()
    .sort((a, b) => priorityByNull(a.priority) - priorityByNull(b.priority)),
  columns: state => state
    .allColumns.slice()
    .sort((a, b) => priorityByNull(a.priority) - priorityByNull(b.priority))
};

const mutations = {
  initializeAllColumns(state, columns) {
    state.allColumns = columns;
  },
  updateArrColumn(state, { column, columnsAdditional }) {
    if (column.name === "statuteOfLimitations" && column.visible === true) {
      state.allColumns = state.allColumns.concat(columnsAdditional);
    } else if (column.name === "statuteOfLimitations" && column.visible === false) {
      state.allColumns = state.allColumns.slice(0, 51);
    }
  },
  turnOnOffColumn(state, { name, visible }) {
    const column = state.allColumns.filter(x => x.name === name)[0];
    if (column) {
      column.visible = visible;
    }
  },
  moveColumn(state, { name, priority, isMoveUp }) {
    const column = state.allColumns.filter(x => x.name === name)[0];
    if (!column) return;

    state.allColumns.filter(x => x.priority > (priority - (isMoveUp ? 1 : 0))).forEach(column => {
      column.priority += 2;
    });
    column.priority = priority + 1;
    state.allColumns.sort((a, b) => priorityByNull(a.priority) - priorityByNull(b.priority)).forEach((column, index) => {
      column.priority = index;
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
