<template>
  <div></div>
</template>

<script>
export default {
  name: 'TreeTableTaskBoardWorkLog',
  components: {},
  data() {
    return {}
  },
  props: {
    stripe: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showSummary: {
      type: Boolean,
      default: true,
    },
    showRowHover: {
      type: Boolean,
      default: false,
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    treeType: {
      type: Boolean,
      default: true,
    },
    isFold: {
      type: Boolean,
      default: false,
    },
    expandType: {
      type: Boolean,
      default: false,
    },
    selectionType: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      default: () => {
        return []
      },
    },
    desserts: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    cellClick(row, rowIndex, column, columnIndex, $event) {
      // alert(1)
      console.log('ALL', row, rowIndex, column, columnIndex, $event)
    },
  },
}
</script>

<style>
.zktable-custom {
  /*border: solid 1px red !important;*/
}
.zk-table__body-cell:nth-child(1),
.zk-table__footer-cell:nth-child(1),
.zk-table__header-cell:nth-child(1) {
  /*border: solid 1px blue !important;*/
  left: 0px;
}
.zk-table__body-cell:nth-child(2),
.zk-table__footer-cell:nth-child(2),
.zk-table__header-cell:nth-child(2) {
  /*border: solid 1px blue !important;*/
  left: 200px;
}
.zk-table__body-cell:nth-child(3),
.zk-table__footer-cell:nth-child(3),
.zk-table__header-cell:nth-child(3) {
  /*border: solid 1px blue !important;*/
  left: 400px;
}

.zk-table__body-cell:nth-child(1),
.zk-table__footer-cell:nth-child(1),
.zk-table__header-cell:nth-child(1),
.zk-table__body-cell:nth-child(2),
.zk-table__footer-cell:nth-child(2),
.zk-table__header-cell:nth-child(2),
.zk-table__body-cell:nth-child(3),
.zk-table__footer-cell:nth-child(3),
.zk-table__header-cell:nth-child(3) {
  position: sticky;
  z-index: 1;
  background: #ffffff;
}

.zk-table__header-cell:nth-child(1),
.zk-table__header-cell:nth-child(2),
.zk-table__header-cell:nth-child(3) {
  background: #f8f8f9;
}
.zk-table__cell-inner {
  white-space: nowrap;
}
.zk-table__footer-cell {
  font-weight: bold;
  text-transform: capitalize;
}
</style>
