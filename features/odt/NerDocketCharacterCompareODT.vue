<template>
  <div>
    <SlickGrid
      :attributes="attributes"
      :height="height"
      disable-add-new-to-many
      :ui-show-add-row-modal="false"
      :has-report-row="false"
      :has-vote-row="false"
      main-cell-id="docket"
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
                  <span class="caption">
                    {{ column.name | $$labelByName }}
                  </span>
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
import { $$labelByName } from '@/sat-vue-toolkit/functions'

export default {
  name: 'NerDocketCharacterCompareODT',
  components: { SlickGrid },
  props: {
    height: {
      default: () => '300px',
    },
  },
  filters: {
    $$labelByName,
  },
  data() {
    return {
      attributes: [
        {
          name: 'docket',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          readOnly: true,
          width: 500,
          stackedColumns: [
            { name: 'date_created' },
            { name: 'docket_entry_type' },
            { name: 'document_number' },
            { name: 'description' },
            { name: 'pdf_name' },
          ],
        },
        {
          name: 'Characters_Mentioned',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          readOnly: true,
          width: 500,
          stackedColumns: [
            { name: 'Character_1' },
            { name: 'Character_2' },
            { name: 'Character_3' },
            { name: 'Character_4' },
            { name: 'Character_5' },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped></style>
