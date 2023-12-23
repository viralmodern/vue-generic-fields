<template>
  <div>
    <VDataTableExtend
      :headers="headers"
      :items="items"
      :server-items-length="totals"
      :loading="loading"
      :options.sync="pagination"
      @update:pagination="updatePagination"
      class="elevation-1 c-table slicktable"
      :hideActions="hideActions"
      ref="slicktable"
      :idGroup="idGroup"
      :group="group"
      :footer-props="{
        itemsPerPageOptions: [rowsPerPage],
      }"
    >
      <template
        :slot="!!$scopedSlots.headerCell ? 'headerCell' : '___'"
        slot-scope="props"
      >
        <slot name="headerCell" :header="props.header"></slot>
      </template>
      <template v-slot:top>
        <slot name="top" />
      </template>
      <template slot="filterRow">
        <tr class="filter-row" style="height: initial">
          <th v-for="column in headers" :key="column.id">
            <slot name="cellFilter" :column="column"></slot>
          </th>
        </tr>
      </template>
      <template v-slot:body="{ items }">
        <tbody :id="idGroup" :group="JSON.stringify(group)">
          <tr v-for="(item, index) in items" :key="item.id" :id="item.id">
            <slot
              v-for="column in headers"
              name="cell"
              :index="index"
              :column="column"
              :dataRow="item"
            ></slot>
          </tr>
        </tbody>
      </template>
    </VDataTableExtend>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import VDataTableExtend from "./VDataTableExtend";

export default {
  components: {
    VDataTableExtend
  },
  props: {
    items: Array,
    headers: Array,
    totals: Number,
    loading: Boolean,
    rowsPerPage: {
      type: Number,
      default: () => 20
    },
    groupRows: {
      type: String,
      default: "rows"
    },
    groupColumns: {
      type: String,
      default: "columns"
    },
    hideActions: Boolean,
    idGroup: [Number, String],
    group: Object
  },
  data() {
    return {
      pagination: {},
      filterObject: {}
    };
  },
  methods: {
    changeFilter(filter) {
      this.$emit("update:filterObject", filter);
    },
    updatePagination(pagination) {
      this.$emit("update:pagination", pagination);
    },
    dragRowsTable() {
      const ref = this.$refs.slicktable;
      if (!ref) return;
      const tbody = ref.$el.getElementsByTagName("tbody")[0];
      if (!tbody) return;
      const _self = this;
      Sortable.create(tbody, {
        onMove(event) {
          const fromId = event.dragged.id;
          if (fromId && event.to.id != event.from.id) {
            const toList = [];
            event.to.childNodes.forEach(x => toList.push(x.id));
            return !toList.includes(fromId); // nếu row này ko tồn tại ở table kéo vào thì mới cho thả xuống
          } else {
            return false;
          } // tam thoi khong cho keo trong 1 table voi nhau
        },
        onEnd(event) {
          const rows = JSON.parse(JSON.stringify(_self.items));
          const newIndex = event.newIndex;
          const oldIndex = event.oldIndex;
          const fromList = JSON.parse(event.from.getAttribute("group"));
          const toList = JSON.parse(event.to.getAttribute("group"));
          const fromListId = event.from.id;
          const toListId = event.to.id;
          const taskId = parseInt(event.item.id);
          let data = {
            rows,
            taskId,
            newIndex,
            oldIndex,
            fromListName: fromList.name,
            fromList,
            toListId,
            fromListId
          };
          if (fromListId !== toListId) {
            data.toListName = toList.name;
            _self.$emit("onEndDragRows", data);
          }
        },
        animation: 200,
        group: _self.groupRows,
        disabled: false,
        ghostClass: "ghost"
      });
    },
    dragColumsTable() {
      var tableColumn = this.$refs.slicktable.$el.querySelectorAll("tr")[0];
      var _self = this;
      tableColumn.style.cursor = "move";
      new Sortable(tableColumn, {
        animation: 200,
        group: _self.groupColumns,
        disabled: false,
        ghostClass: "ghost",
        onStart: function(evt) {
          const tableRows = _self.$refs.slicktable.$el.querySelectorAll("tr");
          const checkEmptyBody = tableRows[3].querySelectorAll("td").length;
          const countColumn = tableRows[0].querySelectorAll("th").length;
          if (checkEmptyBody !== countColumn) return;
          for (var i = 3; i < tableRows.length; i++) {
            const rows = tableRows[i].querySelectorAll("td")[evt.oldIndex];
            rows.classList.add("sorting");
          }
        },
        onChange: function(evt) {
          const tableRows = _self.$refs.slicktable.$el.querySelectorAll("tr");
          const checkEmptyBody = tableRows[3].querySelectorAll("td").length;
          const countColumn = tableRows[0].querySelectorAll("th").length;
          if (checkEmptyBody !== countColumn) return;
          for (var i = 3; i < tableRows.length; i++) {
            var thisRow = tableRows[i];
            var oldPos = thisRow.querySelector(".sorting");
            var newPos = thisRow.querySelectorAll("td")[evt.newIndex];
            var cells = thisRow.querySelectorAll("td");
            for (var x = 0; x < cells.length; x++) {
              if (cells[x].classList.contains("sorting")) {
                var oldIndex = x;
              }
            }
            if (oldIndex < evt.newIndex) {
              newPos = thisRow.querySelectorAll("td")[evt.newIndex + 1];
              oldPos.classList.add("sort-right");
              const rows = thisRow.querySelectorAll(i === 1 ? "th" : "td")[
                evt.newIndex
              ];
              rows.classList.add("sort-left");
            } else {
              oldPos.classList.add("sort-left");
              const rows = thisRow.querySelectorAll(i === 1 ? "th" : "td")[
                evt.newIndex
              ];
              rows.classList.add("sort-right");
            }
            _self.setNewPos(oldPos, newPos, cells, evt.newIndex, thisRow);
          }
        },
        onEnd: function(event) {
          const tableRows = _self.$refs.slicktable.$el.querySelectorAll("tr");
          const checkEmptyBody = tableRows[3].querySelectorAll("td").length;
          const countColumn = tableRows[0].querySelectorAll("th").length;
          if (checkEmptyBody !== countColumn) return;
          for (var i = 3; i < tableRows.length; i++) {
            tableRows[i]
              .querySelector("td.sorting")
              .classList.remove("sorting");
          }
          const columns = JSON.parse(JSON.stringify(_self.headers));
          const newIndex = event.newIndex;
          const oldIndex = event.oldIndex;
          const result = _self.array_move(columns, oldIndex, newIndex);
          _self.$emit("onEndDragColumns", result);
        }
      });
    },
    setNewPos(oldPos, newPos, cells, newIndex, thisRow) {
      setTimeout(function() {
        oldPos.classList.remove("sort-left", "sort-right");
        cells[newIndex].classList.remove("sort-left", "sort-right");
        thisRow.insertBefore(oldPos, newPos);
      }, 150);
    },
    array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
    }
  },
  mounted() {
    this.dragRowsTable();
    this.dragColumsTable();
  },
  updated() {
    this.dragRowsTable();
    this.dragColumsTable();
  },
  watch: {
    pagination: {
      handler (val, oldVal) {
        if (Object.keys(oldVal).length) {
          this.$emit('watchPagination', val);
        }
      },
      deep: true,
    },
  }
};
</script>

<style scoped>
.slicktable /deep/ .sort-left {
  transition: all 0.15s;
  transform: translateX(-100%);
}
.slicktable /deep/ .sort-right {
  transition: all 0.15s;
  transform: translateX(100%);
}
.filter-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.c-table /deep/ .v-table thead tr:first-child {
  border: none !important;
}
.c-table /deep/ .v-table thead tr {
  height: 50px;
}
.c-table /deep/ .v-table thead tr:first-child th {
  padding-top: 10px;
}
.c-table /deep/ .v-table thead tr.filter-row th {
  padding-bottom: 10px;
}
</style>
