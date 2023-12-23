<template>
  <div>
    <v-data-table dense
                  :headers="reduceColumns"
                  :items="reduceRows"
                  :items-per-page="10"
                  class="elevation-0 compare-table">
      <template v-for="column in reduceColumns" :slot="`item.${column.value}`"
                slot-scope="{item, header}">
        <div :class="getCellHeatmap(item.field_type, header.name === 'field_name')">
          <template v-if="header.name !== 'field_name'">
            <component :is="item.field_type | getCellLayout"
                       class="caption"
                       :value="item[header['value']]"
                       :attribute="item.attribute"
                       :row="item"
                       :uniqueId="uniqueId"/>
          </template>
          <template v-else>
            <span class="caption">
              {{item[header["value"]]}}
            </span>
          </template>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>

  import { ATTRIBUTE_FIELDS, getCellLayout } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"
  import keyBy from "lodash/keyBy"

  export default {
    name: "ListCompareEntries",
    props: {
      fieldsConfig: {
        type: Array,
        default: () => []
      },
      rows: {
        type: Array,
        default: () => []
      },
      uniqueId: {
        type: String,
        default: () => "pk"
      },
      mainCellId: {
        type: String,
        default: () => "name"
      }

    },

    computed: {
      attributesByName () {
        let { fieldsConfig } = this
        return { ...keyBy(fieldsConfig, "name") }
      },
      reduceColumns () {
        let { rows, uniqueId, mainCellId, attributesByName } = this
        let firstColumn = {
          text: attributesByName[mainCellId]["label"],
          align: "start",
          sortable: false,
          value: "field_name",
          name: "field_name",
          class: "cell-entry-compare",
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 150
        }
        return [firstColumn, ...rows.map(row => {
          let column = {
            text: "",
            align: "start",
            // filterable: true,
            sortable: false,
            class: "cell-entry-compare",
            value: "field_name",
            name: "field_name",
            type: "",
            width: 150
          }
          column.text = row[mainCellId] || row[uniqueId]
          column.value = `${uniqueId}_${row[uniqueId]}`
          column.name = `${uniqueId}_${row[uniqueId]}`
          console.log({ column, row, mainCellId })
          return { ...column }
        })]
      },
      reduceRows () {
        let { fieldsConfig, rows, uniqueId, mainCellId } = this
        let newRows = []
        fieldsConfig.forEach((column, columnIndex) => {
          let columnName = column["name"]
          let columnLabel = column["label"]
          let columnType = column["type"]
          columnType = columnType === ATTRIBUTE_FIELDS.LINK_TEXT.TYPE ? ATTRIBUTE_FIELDS.TEXT.TYPE : columnType
          let row = {
            field_name: columnLabel,
            field_type: columnType,
            attribute: { ...column }
          }
          rows.forEach((r, rIndex) => {
            let rowId = r[uniqueId]
            // let rowValue = r[columnName]
            row[`${uniqueId}_${rowId}`] = r[columnName]
            if (rIndex === rows.length - 1 && columnIndex !== 0) {
              newRows.push(row)
            }
          })
        })
        return newRows
      }

    },
    methods: {
      getCellHeatmap (type, isFirst) {
        return {
          "fill-height": type === ATTRIBUTE_FIELDS.HEATMAP.TYPE && !isFirst
        }
      }
    },
    filters: {
      getCellLayout
    }
  }
</script>

<style lang="scss">
  .theme--dark {
    .compare-table {
      border-color: rgba(255, 255, 255, 0.2);
    }
  }

  .compare-table {
    border: solid 1px rgba(0, 0, 0, 0.05);

    .cell-entry-compare {
      font-size: 0.65rem !important;
    }
  }
</style>
