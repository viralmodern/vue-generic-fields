<template>
  <div>
    <SlickGrid
      :attributes="attributes"
      :height="height"
      disable-add-new-to-many
      :ui-show-add-row-modal="false"
      :has-report-row="false"
      :has-vote-row="false"
      main-cell-id="character"
      no-query-params
      disabled-add-new-column
    >
      <template :slot="`header.table.stacked.characters_mentioned`"> </template>
      <template
        v-slot:item.characters_mentioned="{
          item,
          groupByItem,
          fieldMain,
          attribute,
        }"
      >
        <table
          cellspacing="0"
          cellpadding="0"
          class="w-100 fill-height stacked-table-header"
        >
          <tr>
            <template v-for="column in attribute.stackedColumns">
              <td
                class="pa-1"
                :width="`${100 / attribute.stackedColumns.length}%`"
              >
                <template v-if="column.name === 'Concordance Plot'">
                  <div class="d-flex">
                    <v-sheet
                      class="d-flex"
                      width="1%"
                      color="primary lighten-3"
                      height="25"
                    >
                    </v-sheet>
                    <v-sheet
                      class="d-flex"
                      width="1%"
                      color="primary lighten-3"
                      height="25"
                    >
                    </v-sheet>
                    <v-sheet
                      class="d-flex"
                      width="1%"
                      color="primary lighten-3"
                      height="25"
                    >
                    </v-sheet>
                  </div>
                </template>
                <template v-else>
                  {{ column.name }}
                </template>
              </td>
            </template>
          </tr>
        </table>
      </template>
    </SlickGrid>
  </div>
</template>

<script>
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'

export default {
  name: 'NerCharacterDocketCompareODT',
  components: { SlickGrid },
  props: {
    height: {
      default: () => '300px',
    },
  },
  data() {
    return {
      attributes: [
        {
          name: 'character',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          readOnly: true,
          width: 200,
        },
        {
          name: 'docket_entry_1',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          readOnly: true,
          width: 500,
          stackedColumns: [
            { name: 'pdf_1' },
            { name: 'pdf_2' },
            { name: 'pdf_3' },
          ],
        },
        {
          name: 'docket_entry_2',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          readOnly: true,
          width: 500,
          stackedColumns: [
            { name: 'pdf_1' },
            { name: 'pdf_2' },
            { name: 'pdf_3' },
          ],
        },
        {
          name: 'docket_entry3',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          readOnly: true,
          width: 500,
          stackedColumns: [
            { name: 'pdf1' },
            { name: 'pdf2' },
            { name: 'pdf3' },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped></style>
