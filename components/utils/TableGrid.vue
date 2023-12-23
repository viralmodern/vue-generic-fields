<template>
  <TableGridModel>
    <template v-slot:default="{ data: post, loading, create, destroy, update }">
      <div>
        <PortalDropDownFieldsAttributes
          v-model="attributes"
          :to-model="toModel"
        />
        <v-data-table
          :headers="fields_attributes"
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
            <tr class="tr_header" v-if="hideDefaultHeader">
              <th
                @click="$emit('click-header', header['value'])"
                v-for="(header, index1) in headers"
                :key="header | headerName"
                :class="{
                  sticky_col: index1 === 0,
                  sticky_col_last: header['value'] === 'action',
                }"
                class="text-no-wrap cusor--pointer"
              >
                <v-btn
                  v-if="index1 === 0"
                  small
                  text
                  icon
                  style="cursor: move; opacity: 0;"
                  class="drag-hander"
                >
                  <v-icon>mdi-drag</v-icon>
                </v-btn>
                <slot :name="header | headerName">
                  <template v-if="header['value'] === 'action'">
                    <v-menu offset-y :close-on-content-click="false">
                      <template v-slot:activator="props">
                        <v-btn
                          color="primary"
                          v-on="props.on"
                          depressed
                          icon
                          title="Add a column"
                        >
                          <v-icon>
                            mdi-plus-circle
                          </v-icon>
                        </v-btn>
                      </template>
                      <portal-target
                        name="PortalDropDownFieldsAttributes"
                      ></portal-target>
                    </v-menu>
                  </template>
                  <template v-else>
                    <v-menu offset-y :close-on-content-click="false">
                      <template v-slot:activator="{ on }">
                        <template v-if="header['pk']">
                          <v-hover v-slot:default="{ hover }">
                            <v-chip v-on="on" label small color="transparent">
                              <v-icon
                                v-show="hover"
                                left
                                small
                                style="
                                  position: absolute;
                                  transform: translateX(-5px);
                                "
                                >mdi-drag</v-icon
                              >
                              <v-icon small left class="ml-2">
                                {{ header['type'] | getIconAttributeIcon }}
                              </v-icon>
                              {{ header['name'] }}
                              <v-icon right>mdi-menu-down</v-icon>
                            </v-chip>
                          </v-hover>
                        </template>
                        <template v-else>
                          <v-hover v-slot:default="{ hover }">
                            <v-chip v-on="on" label small color="transparent">
                              <v-icon
                                v-show="hover"
                                left
                                small
                                style="
                                  position: absolute;
                                  transform: translateX(-5px);
                                "
                                >mdi-drag</v-icon
                              >
                              &nbsp;
                              {{ header['text'] }}
                              <v-icon right>mdi-menu-down</v-icon>
                            </v-chip>
                          </v-hover>
                        </template>
                      </template>
                      <v-list dense nav shaped class="list-customize">
                        <v-list-item
                          link
                          dense
                          v-for="i in listDropdownHeader"
                          style="min-height: unset;"
                          :key="i.value"
                        >
                          <v-list-item-content>
                            <v-list-item-title>
                              <v-btn icon small>
                                <v-icon small :color="i.color">{{
                                  i.icon
                                }}</v-icon>
                              </v-btn>
                              {{ i.label }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </slot>
              </th>
            </tr>
          </template>
          <template v-slot:body="{ items, isSelected, select }">
            <draggable v-model="list" handle=".drag-hander" tag="tbody">
              <template v-for="(item, index) in items">
                <v-hover v-slot:default="{ hover }">
                  <tr
                    :key="index"
                    @click="$emit('clickRow', { row: index, item: item })"
                  >
                    <template v-for="(header, index1) in fields_attributes">
                      <td :key="index1" :class="{ sticky_col: index1 === 0 }">
                        <div class="d-flex align-center">
                          <template v-if="index1 === 0">
                            <div
                              :class="{
                                hide_base: !hover,
                                show_base: item === selectedRow || hover,
                              }"
                            >
                              <v-checkbox
                                class="ma-0"
                                :value="item === selectedRow"
                                @change="selectedRowChange(item, $event)"
                                dense
                                hide-details
                                :ripple="false"
                              ></v-checkbox>
                            </div>
                            <v-btn
                              small
                              icon
                              style="cursor: move;"
                              class="drag-hander"
                            >
                              <v-icon>mdi-drag</v-icon>
                            </v-btn>
                            <v-tooltip top v-if="bookmark">
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  @click="$emit('action-bookmark')"
                                  v-on="on"
                                  small
                                  style="transform: translateX(-10px);"
                                  icon
                                >
                                  <v-icon small>
                                    mdi-bookmark
                                  </v-icon>
                                </v-btn>
                              </template>
                              Bookmark
                            </v-tooltip>
                            <v-tooltip top v-if="flag">
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  v-on="on"
                                  small
                                  style="transform: translateX(-10px);"
                                  v-if="flag"
                                  @click="$emit('action-flag')"
                                  icon
                                >
                                  <v-icon small>
                                    mdi-flag
                                  </v-icon>
                                </v-btn>
                              </template>
                              Flag
                            </v-tooltip>
                          </template>
                          <div style="padding-left: 15px;">
                            <slot
                              :name="'item.' + header['value']"
                              :props="{ row: index, item: item }"
                            >
                              <template v-if="header['pk']">
                                <AttributesCellsBase
                                  :attr-type="header['type']"
                                />
                              </template>
                              <template
                                v-else-if="header['value'] !== 'action'"
                              >
                                {{ item[header['value']] }}
                                <v-btn
                                  icon
                                  v-if="!hasValue(item[header['value']])"
                                  :title="`Add ${header['text']}`"
                                  depressed
                                  small
                                  style="border: dashed 1px rgba(0, 0, 0, 0.2);"
                                >
                                  <v-icon x-small color="rgba(0,0,0,0.2)"
                                    >mdi-pencil</v-icon
                                  >
                                </v-btn>
                              </template>
                              <template v-else>
                                <v-btn x-small icon>
                                  <v-icon small color="dcdcdc">
                                    mdi-dots-vertical
                                  </v-icon>
                                </v-btn>
                              </template>
                            </slot>
                          </div>
                        </div>
                      </td>
                    </template>
                  </tr>
                </v-hover>
              </template>
            </draggable>
            <slot name="foot-rows"></slot>
          </template>
        </v-data-table>
        <v-bottom-sheet
          v-model="uiShowSelectedRow"
          no-click-animation
          persistent
          dark
        >
          <v-sheet class="text-center" height="40px">
            <div class="d-flex align-center" style="width: 100%;">
              <div class="flex-grow-1 text-left px-4">
                <div class="text-caption d-flex align-center">
                  <v-icon small>mdi-checkbox-marked-circle</v-icon>
                  <div class="mx-2"></div>
                  {{ nameTaskSelect }}
                </div>
              </div>
              <div>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" small>
                      <v-icon>mdi-tag</v-icon>
                    </v-btn>
                  </template>
                  <span>Set Labels</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" small>
                      <v-icon>mdi-account-multiple</v-icon>
                    </v-btn>
                  </template>
                  <span>Assigned Members</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" small>
                      <v-icon>mdi-book-open</v-icon>
                    </v-btn>
                  </template>
                  <span>Note</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" small>
                      <v-icon>mdi-message</v-icon>
                    </v-btn>
                  </template>
                  <span>Add Comment</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" small>
                      <v-icon>mdi-bookmark</v-icon>
                    </v-btn>
                  </template>
                  <span>Add to Bookmark</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" small>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </div>
              <div class="flex-grow-1"></div>
              <v-btn
                icon
                small
                text
                class="my-2 mx-4"
                @click="uiShowSelectedRow = !uiShowSelectedRow"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </div>
    </template>
  </TableGridModel>
</template>

<script>
import draggable from 'vuedraggable'
import PortalDropDownFieldsAttributes from '../../features/portals/PortalDropDownFieldsAttributes'
import TableGridModel from './TableGridModel'
import {
  getAttributeComponentCellName,
  getIconAttributeIcon,
} from '../../features/generic-fields/fields_config'
import AttributesCellsBase from '../../features/generic-fields/components/AttributesCellsBase'
import { v4 as uuid } from 'uuid'
export default {
  name: 'TableGrid',
  display: 'Table',
  order: 8,
  components: {
    AttributesCellsBase,
    TableGridModel,
    PortalDropDownFieldsAttributes,
    draggable,
  },
  data() {
    return {
      selectedRow: null,
      uiShowSelectedRow: false,
      attributes: [],
      items: [],
      listDropdownHeader: [
        {
          label: 'Edit',
          value: 'edit',
          icon: 'mdi-pencil',
        },
        {
          label: 'Pin column',
          value: 'pin_column',
          icon: 'mdi-pin',
        },
        {
          label: 'Sort',
          value: 'sort_column',
          icon: 'mdi-sort',
        },
        {
          label: 'Hide column',
          value: 'hide_column',
          icon: 'mdi-eye-off',
        },

        {
          label: 'Delete column',
          value: 'delete_column',
          icon: 'mdi-delete',
          color: 'red',
        },
      ],
    }
  },
  props: {
    headers: {
      type: Array,
      default: () => [
        { text: 'Expense Name', value: 'expense_name', active: true },
        { text: 'Source', value: 'source', active: true },
        { text: 'Expense Category', value: 'expense_category', active: true },
        { text: 'Expense Code', value: 'expense_code', active: true },
        { text: 'Created by', value: 'created_by', active: true },
        { text: 'Reference', value: 'reference', active: true },
        { text: 'Paid Status', value: 'paid_status', active: true },
        { text: 'Action', value: 'action', active: true },
      ],
    },
    desserts: {
      type: Array,
      default: () => [
        {
          // Fixed, Flat, Counseling
          pk: uuid(),
          expense_category: 2,
          expense_code: 'E103',
          created_by: 4,
          expense_amount: 1548963,
          expense_name: 'Expense Taskboard',
          expense_description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
            '      Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
          source: [
            {
              content_type: 21,
              obj_id: 12,
              name: 'Card log',
            },
            {
              content_type: 21,
              obj_id: 12,
              name: 'Taskboard',
            },
          ],
          tax_1: '0',
          tax_2: '5',
          total_tax: 2562,
          amount_tax: 9603,
          billable: 2,
          activities_code: 'A101',
          reference: 'asfdgh',
          paid_status: 1,
          action: 'asfdgh',
          children: [
            {
              // Fixed, Flat, Counseling
              expense_category: 2,
              expense_code: 'E103',
              created_by: 4,
              expense_amount: 1548963,
              expense_name: 'Expense Taskboard',
              expense_description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
                '      Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
              source: [
                {
                  content_type: 21,
                  obj_id: 12,
                  name: 'Card log',
                },
                {
                  content_type: 21,
                  obj_id: 12,
                  name: 'Taskboard',
                },
              ],
              tax_1: '0',
              tax_2: '5',
              total_tax: 2562,
              amount_tax: 9603,
              billable: 2,
              activities_code: 'A101',
              reference: 'asfdgh',
              paid_status: 1,
              action: 'asfdgh',
            },
          ],
        },
      ],
    },
    value: {},
    hideDefaultFooter: {
      type: Boolean,
    },
    fixedHeader: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },

    hideDefaultHeader: {
      type: Boolean,
    },
    search: {
      type: String,
      default: '',
    },
    bookmark: {
      type: Boolean,
      default: true,
    },
    flag: {
      type: Boolean,
      default: true,
    },

    showExpand: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: 'name',
    },
    toModel: {
      type: String,
      required: true,
      default: () => 'card.card',
    },
    showAttribute: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {
    // making sure value goes from our parent to <input> and back properly...
    list: {
      get() {
        return this.desserts
      },
      set(value) {
        console.log('DESSERTS', value)
        // this.$emit('input', value)
        this.items = value
      },
    },
    fields_attributes: {
      get() {
        // if (this.attributes.length === 0) return this.headers
        if (!this.showAttribute) return this.headers
        let temp = [...this.headers]
        temp.splice(temp.length - 1, 0, ...this.attributes)
        return temp
      },
      set(v) {
        console.error('fields_attributes', v)
      },
    },
    nameTaskSelect() {
      try {
        return this.selectedRow.name
      } catch (e) {
        return 'N/A'
      }
    },
  },
  methods: {
    selectedRowChange(item, e) {
      // console.log('selectedRowChange', item, e)
      this.selectedRow = null
      if (e) {
        this.selectedRow = item
      } else {
      }
    },
    keyRowCell({ row, header }) {
      try {
        let pk_cell = header['pk'] || header['value']
        return `row_${row.pk}_cell_${pk_cell}`
      } catch (e) {
        return `row_${uuid()}_cell_${uuid()}`
      }
    },
    hasValue(cellItem) {
      // console.log('cellItem', cellItem)
      return !!cellItem
    },
  },
  watch: {
    selectedRow(value) {
      this.uiShowSelectedRow = !!value
    },
    desserts: {
      handler(v) {
        this.items = v
      },
      deep: true,
      immediate: true,
    },
    value(v) {
      this.items = v
    },
  },
  filters: {
    getIconAttributeIcon(type) {
      return getIconAttributeIcon({ type })
    },
    getAttributeCell(type) {
      return getAttributeComponentCellName({ type })
    },
    headerName(header) {
      // console.log('headerName', header)
      if (header['value']) return `header.${header['value']}`
      return `header.${header['pk']}`
    },
    keyRow(row) {
      try {
        return row.pk
      } catch (e) {
        return uuid()
      }
    },
  },
}
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

th.sticky_col {
  z-index: 4 !important;
}

.sticky_col_last {
  /*border: solid 1px red !important;*/

  position: sticky;
  right: 0px;
  background: hsla(0, 0%, 100%, 1);
}

.drag-hander {
  transform: translateX(-10px);
}

.tr_header {
  border: solid 1px blue !important;

  th {
    position: sticky;
    top: 0;
    z-index: 3;
    background: #ffffff;
  }
}
</style>
<style>
.table-grid .v-data-table__wrapper {
  max-height: 65vh;
  /*border: solid 1px red !important;*/
}
</style>
<style scoped>
.snack_curd /deep/ .v-snack__content {
  padding: 0 !important;
  background: unset !important;
  margin-bottom: 0px !important;
  width: 100% !important;
  max-width: unset !important;
  min-width: unset !important;
  /*background: red !important;*/
}
</style>
<style lang="scss">
.list-customize {
  .v-list-item--dense,
  .v-list--dense .v-list-item,
  .v-list-item {
    min-height: unset;
  }
  .v-list-item__action {
    margin: 0px;
    transform: scale(0.6);
  }
}
</style>
