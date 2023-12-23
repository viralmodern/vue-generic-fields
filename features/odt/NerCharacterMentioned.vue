<template>
  <div>
    <SlickGrid
      :attributes="attributes"
      :height="height"
      disable-add-new-to-many
      :ui-show-add-row-modal="false"
      :has-report-row="false"
      :has-vote-row="false"
      main-cell-id="date_created"
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
  name: 'NerCharacterMentioned',
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
          name: 'date_created',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          readOnly: true,
          width: 200,
        },
        {
          name: 'Characters_Mentioned',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          readOnly: true,
          width: 500,
          stackedColumns: [
            { name: 'character' },
            { name: 'frequency' },
            { name: 'Concordance Plot' },
          ],
        },
        {
          name: 'docket_entry_type',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          readOnly: true,
          width: 200,
        },
        {
          name: 'entry_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          readOnly: true,
          width: 200,
        },
        {
          name: 'description',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          readOnly: true,
          width: 200,
        },
        {
          name: 'pdf_name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          readOnly: true,
          width: 200,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
