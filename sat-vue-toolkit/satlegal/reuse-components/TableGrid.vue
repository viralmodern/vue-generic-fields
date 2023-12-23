<template>
  <v-data-table
    :headers="headers"
    calculate-widths
    :fixed-header="fixedHeader"
    :hide-default-footer="hideDefaultFooter"
    :hide-default-header="hideDefaultHeader"
    v-bind="options"
    :items="list"
    :search="search"
    :loading="loading"
    class="elevation-1 table-grid"
  >
    <template v-slot:header="{ props: { headers } }">
      <tr v-if="hideDefaultHeader">
        <th
          @click="$emit('click-header', header['value'])"
          v-for="(header, index1) in headers"
          :key="index1"
          :class="index1 === 0 ? 'sticky_col' : ''"
          class="text-no-wrap cusor--pointer"
        >
          <div class="d-flex align-center">
            <v-btn
              v-if="index1 === 0"
              small
              text
              icon
              style="cursor: move; opacity: 0"
              class="drag-hander"
            >
              <v-icon>mdi-drag</v-icon>
            </v-btn>
            <slot v-if="!!$scopedSlots.headerCell" name="headerCell" :props="{ header }"></slot>
            <slot v-else :name="'header.' + header['value']">
              {{ header["text"] }}
            </slot>
          </div>
        </th>
      </tr>
    </template>
    <template v-slot:body="{ items }">
      <draggable v-model="list" handle=".drag-hander" tag="tbody">
        <!--<v-slide-y-transition group tag="tbody">-->
        <tr class="text-no-data" v-if="!items.length">
          <td class="text-caption" :colspan="headers.length">
            {{noDataText}}
          </td>
        </tr>
        <tr
          v-for="(item, index) in items"
          :key="index"
          @click="$emit('clickRow')"
        >
          <template v-for="(header, index1) in headers">
            <td :key="index1" v-if="header['value'] === 'drag'">
              <v-row>
                <v-col cols="6">
                  <v-btn
                    small
                    text
                    icon
                    style="cursor: move"
                    class="drag-hander"
                  >
                    <v-icon>mdi-drag</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <slot
                    :name="'item.' + header['value']"
                    :props="{ row: index, item: item }"
                  >
                    {{ item[header["value"]] }}
                  </slot></v-col
                >
              </v-row>
            </td>
            <td :key="index1" v-else :class="index1 === 0 ? 'sticky_col' : ''">
              <div v-if="index1 === 0" class="d-flex align-center">
                <v-btn small icon style="cursor: move" class="drag-hander">
                  <v-icon>mdi-drag</v-icon>
                </v-btn>
                <!-- <v-btn
                  small
                  style="transform: translateX(-10px)"
                  v-if="index1 === 0 && bookmark"
                  icon
                >
                  <v-icon small>
                    mdi-bookmark
                  </v-icon>
                </v-btn> -->
                <slot
                  :name="'item.' + header['value']"
                  :props="{ row: index, item: item }"
                >
                  {{ item[header["value"]] }}
              </slot>
              </div>
              <slot v-else-if="!$scopedSlots['item.' + header['value']] && $scopedSlots.tdCommon" name="tdCommon" :props="{ row: index, item: item, header }" />
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
        <!--</v-slide-y-transition>-->
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
      default: () => [
        // {isDrag: true, value: "drag"},
        { text: "Expense Name", value: "expense_name", active: true },
        { text: "Source", value: "source", active: true },
        { text: "Expense Category", value: "expense_category", active: true },
        { text: "Expense Code", value: "expense_code", active: true },
        { text: "Created by", value: "created_by", active: true },
        { text: "Reference", value: "reference", active: true },
        { text: "Paid Status", value: "paid_status", active: true },
        { text: "Action", value: "action", active: true }
      ]
    },
    desserts: {
      type: Array,
      default: () => [
        {
          // Fixed, Flat, Counseling
          expense_category: 2,
          expense_code: "E103",
          created_by: 4,
          expense_amount: 1548963,
          expense_name: "Expense Taskboard",
          expense_description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n" +
            "      Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.",
          source: [
            {
              content_type: 21,
              obj_id: 12,
              name: "Card log"
            },
            {
              content_type: 21,
              obj_id: 12,
              name: "Taskboard"
            }
          ],
          tax_1: "0",
          tax_2: "5",
          total_tax: 2562,
          amount_tax: 9603,
          billable: 2,
          activities_code: "A101",
          reference: "asfdgh",
          paid_status: 1,
          action: "asfdgh",
          children: [
            {
              // Fixed, Flat, Counseling
              expense_category: 2,
              expense_code: "E103",
              created_by: 4,
              expense_amount: 1548963,
              expense_name: "Expense Taskboard",
              expense_description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n" +
                "      Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.",
              source: [
                {
                  content_type: 21,
                  obj_id: 12,
                  name: "Card log"
                },
                {
                  content_type: 21,
                  obj_id: 12,
                  name: "Taskboard"
                }
              ],
              tax_1: "0",
              tax_2: "5",
              total_tax: 2562,
              amount_tax: 9603,
              billable: 2,
              activities_code: "A101",
              reference: "asfdgh",
              paid_status: 1,
              action: "asfdgh"
            }
          ]
        }
      ]
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
    isServerItemsLength: {
      type: Boolean,
      default: true
    },
    noDataText: {
      type: String,
      default: "No data available"
    }
  },
  computed: {
    options(){
      const restProps = {};
      if (this.isServerItemsLength) {
        restProps.serverItemsLength = this.list.length;
      }
      return restProps;
    },
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
    }
  },
  methods: {
    updateFields({ fields }) {
      this.$emit("resetFields", { fields });
    },
    resetFields({ fields }) {
      // eslint-disable-next-line
      console.log("resetFields", arguments);
      this.$emit("resetFields", { fields });
    }
  }
};
</script>

<style scoped lang="scss">
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

.table-grid tbody tr:nth-child(even) {
  background: hsla(0, 0%, 100%, 0.1);

  &:hover {
    .sticky_col {
      background: #eeeeee;
    }
  }

  .sticky_col {
    background: hsla(0, 0%, 100%, 1);
  }
}

.table-grid tbody tr:nth-child(odd) {
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

.sticky_col {
  position: sticky;
  left: 0;
  z-index: 3;
  background: hsla(0, 0%, 100%, 1);
}

.drag-hander {
  transform: translateX(-10px);
}

.text-no-data {
  color: rgba(0,0,0,.38);
  text-align: center;
}
</style>
