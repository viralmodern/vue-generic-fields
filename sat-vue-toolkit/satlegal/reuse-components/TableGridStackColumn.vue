<template>
  <v-data-table
    :headers="headersExtends"
    calculate-widths
    :fixed-header="fixedHeader"
    :hide-default-footer="hideDefaultFooter"
    :hide-default-header="hideDefaultHeader"
    :server-items-length="list.length"
    :items="list"
    :search="search"
    :loading="loading"
    class="elevation-1 table-grid"
  >
    <template v-slot:header="{ props: { headers } }">
      <tr v-if="hideDefaultHeader">
        <template v-for="(header, index1) in headers">
          <th
            @click="$emit('click-header', header['value'])"
            :key="index1"
            class="text-no-wrap cusor--pointer"
            :class="`${index1 === 0 ? 'sticky_col' : ''} ${checkBorder(headers, header, index1)}`"
            :rowspan="header.rowspan"
            :colspan="header.colspan"
          >
            <div :class="`d-flex align-center ${header.center ? 'justify-center' : ''} ${header.class}`">
              <slot
                v-if="!!$scopedSlots.headerCell"
                name="headerCell"
                :props="{ header }"
              ></slot>
              <slot v-else :name="'header.' + header['value']">
                {{ header["text"] }}
              </slot>
            </div>
          </th>
        </template>
      </tr>
      <tr class="header-stack">
        <td
          v-for="(hsc, index) in headerStackColumnActive"
          :key="index"
          :class="`text-caption font-weight-bold text-no-wrap ${checkEqualValue(index, headerStackColumnActive, hsc, 'headerValue') ? 'border-left' : ''}`"
        >
          <slot :name="`hsc.${hsc.value}`">
            <v-chip small label :color="hsc.color" :class="hsc.color && 'white--text'">{{ hsc.text }}</v-chip>
          </slot>
        </td>
      </tr>
    </template>
    <template v-slot:body="{ items }">
      <draggable
        v-model="list"
        handle=".drag-hander"
        class="body-stack"
        tag="tbody"
      >
        <template v-for="(item, index) in items">
          <tr :key="index" @click="$emit('clickRow')" :class="`${index % 2 === 0 ? 'tr-odd': 'tr-even'}`">
            <template v-for="(header, index1) in headers">
              <template v-if="header.isStackColumn">
                <!-- <td
                  class="text-center"
                  v-if="!item[header.value].length"
                  :key="header.value"
                  :colspan="filterByHeaderStackColumn(header).length"
                >
                  ( No data )
                </td> -->
                <td
                  v-for="(hsc, i) in filterByHeaderStackColumn(header)"
                  :key="i + '' + item.pk + '' + header.value"
                  class="td-hidden"
                >
                </td>
              </template>
              <td
                :key="index1"
                v-else
                :class="index1 === 0 ? 'sticky_col' : ''"
                :rowspan="bodyRowStackColumn[index].rowspan + (listIdItemNoShowFooterStackColumn.includes(item.pk) ? 0 : !!showFooterStackColumn)"
              >
                <div v-if="index1 === 0" class="d-flex align-center">
                  <slot
                    :name="'item.' + header['value']"
                    :props="{ row: index, item: item }"
                  >
                    {{ item[header["value"]] }}
                  </slot>
                </div>
                <slot
                  v-else-if="!$scopedSlots['item.' + header['value']] && $scopedSlots.tdCommon"
                  name="tdCommon"
                  :props="{ row: index, item: item, header }"
                />
                <slot
                  v-else
                  :name="'item.' + header['value']"
                  :props="{ row: index, item: item }"
                >
                  {{ item[header["value"]] }}
                </slot>
              </td>
            </template>
          </tr>
          <tr
            class="body-stack-tr"
            v-for="(item2, index2) in bodyRowStackColumn[index].items"
            :key="`${index2} ${item.pk}`"
          >
            <td
              style="border-top: 1px solid rgba(0,0,0,.12);"
              v-for="(hsc, i) in headerStackColumnActive"
              :key="i"
              :class="`body-stack-tr-td ${checkEqualValue(i, headerStackColumnActive, hsc, 'headerValue') ? 'border-left' : ''}`"
            >
              <slot :name="`itemStackColumn.${hsc.value}`" :props="{ itemStackColumn: item2, item }">
                {{ item2[hsc.value] }}
              </slot>
            </td>
          </tr>
          <tr
            v-if="listIdItemNoShowFooterStackColumn.includes(item.pk) ? false : showFooterStackColumn"
            :key="index + '' + 'append-item-stack-column'"
          >
            <td
              v-for="(h, i) in headersFilterIsStackColumn"
              :key="i"
              :class="`append-item-stack-column-td ${checkEqualValue(i, headersFilterIsStackColumn, h, 'value') ? 'border-left' : ''}`"
              :colspan="filterByHeaderStackColumn(h).length"
            >
              <slot
                :name="`appendItemStackColumn.${h.value}`"
                :props="{ item, itemStackColumn: item[h.value] }"
              ></slot>
            </td>
          </tr>
        </template>
      </draggable>

      <slot name="foot-rows"></slot>
    </template>
  </v-data-table>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "TableGrid",
  display: "Table",
  order: 8,
  components: {
    draggable
  },
  data() {
    return {
      internalValue: this.desserts
    };
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    headerStackColumn: {
      type: Array,
      default: () => []
    },
    desserts: {
      type: Array,
      default: () => []
    },
    hideDefaultFooter: {
      type: Boolean
    },
    fixedHeader: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },

    hideDefaultHeader: {
      type: Boolean
    },
    search: {
      type: String,
      default: ""
    },
    bookmark: {
      type: Boolean,
      default: true
    },
    showExpand: {
      type: Boolean,
      default: false
    },
    itemKey: {
      type: String,
      default: "name"
    },
    showFooterStackColumn: Boolean,
    listIdItemNoShowFooterStackColumn: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // making sure value goes from our parent to <input> and back properly...
    list: {
      get() {
        return this.desserts;
        // return this.internalValue
      },
      set(value) {
        this.internalValue = value;
        this.$emit("change", value);
      }
    },
    headersExtends() {
      const results = this.headers.map(h => {
        const colspan = this.filterByHeaderStackColumn(h).length;
        return {
          ...h,
          colspan
        };
      });
      return results;
    },
    headersFilterIsStackColumn() {
      return this.headersExtends.filter(h => h.isStackColumn);
    },
    headerStackColumnActive() {
      return this.headerStackColumn.filter(hsc =>
        this.headersFilterIsStackColumn.some(h => hsc.headerValue === h.value)
      );
    },
    bodyRowStackColumn() {
      let results = {};
      this.list.forEach((item, i) => {
        let max = 1;
        let items = [];
        this.headersFilterIsStackColumn.forEach(h => {
          if (Array.isArray(item[h.value])) {
            const countItem = item[h.value].length;
            item[h.value].forEach((x, i) => {
              if (typeof x === "object") {
                return (items[i] = { ...items[i], ...x });
              }
              return (items[i] = { ...items[i], [h.value]: x });
            });
            if (countItem >= max) {
              max = countItem + 1;
            }
          }
        });
        results[i] = {
          items,
          rowspan: max
        };
      });
      return results;
    }
  },
  methods: {
    updateFields({ fields }) {
      this.$emit("resetFields", { fields });
    },
    resetFields({ fields }) {
      this.$emit("resetFields", { fields });
    },
    filterByHeaderStackColumn(header) {
      return this.headerStackColumn.filter(x => x.headerValue === header.value)
    },
    checkEqualValue(index, list, value, key) {
      if(index > 0) {
        return list[index - 1][key] !== value[key];
      }
      return false;
    },
    checkBorder(headers, header, index) {
      if(index > 0 && header.isStackColumn) {
        if(headers[index + 1].isStackColumn) {
          return 'border-left border-bottom';
        } else {
          return 'border-left border-bottom border-right';
        }
      }
      return '';
    }
  }
};
</script>

<style scoped lang="scss">
@mixin border($direction, $color: rgba(0, 0, 0, 0.12)) {
  border-#{$direction}: 1px solid $color !important;
}

.td-hidden {
  border-width: 0px;
  padding: 0px;
  height: 0px;
}

.tr-odd {
  background: #f4f5f7;

  &:hover {
    .sticky_col {
      background: #eeeeee;
    }
  }

  .sticky_col {
    background: #f4f5f7;
  }
}

.tr-even {
  background: rgba(255,255,255,.1);

  &:hover {
    .sticky_col {
      background: #eeeeee;
    }
  }

  .sticky_col {
    background: hsla(0, 0%, 100%, 1);
  }
}

.table-grid > thead tr th {
  /*border: solid 1px red !important;*/
  white-space: nowrap;
}

.table-grid > tr td {
  border-bottom: none;
}

.theme--light.v-data-table.table-grid
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border-bottom: none;
}

.sticky_col {
  position: sticky;
  left: 0;
  z-index: 3;
  background: hsla(0, 0%, 100%, 1);
}

.drag-hander {
  transform: translateX(-10px);
}

.header-stack {
  td:first-child {
    @extend .border-left;
  }
  td:last-child {
    @extend .border-right;
  }
}
.body-stack {
  &-tr {
    &-td {
      // @extend .border-top;
      // @extend .border-bottom;
    }
    &-td:first-child {
      @extend .border-left;
    }
    &-td:last-child {
      @extend .border-right;
    }
  }
}

.border-right {
  @include border("right");
}

.border-left {
  @include border("left");
}

.border-top {
  @include border("top");
}

.border-bottom {
  @include border("bottom");
}

.append-item-stack-column {
  &-action {
    text-decoration: none;
  }
  &-td {
    @include border('top');
  }

  &-td:first-child {
    @extend .border-left;
  }
  &-td:last-child {
    @extend .border-right;
  }
}

</style>
