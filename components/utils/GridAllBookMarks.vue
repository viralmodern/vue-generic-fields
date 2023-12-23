<template>
  <div>
    <SlickGrid
      :items="temp"
      no-query-params
      disabled-add-new-column
      :has-vote-row="false"
      :has-report-row="false"
      disabled-bookmark-row
      disabled-add-new-row
      no-group
      disabled-sort
      :attributes="attributes"
    />
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
export default {
  name: 'GridAllBookMarks',
  components: { SlickGrid },
  computed: {
    temp() {
      return {
        '': {
          count: 1,
          results: [
            {
              description:
                'https://dribbble.com/shots/12074086/attachments/3704756?mode=media effect UIUX',
              date_time: 'Tue Aug 25 2020 09:09:53 GMT+0700 (Indochina Time)',
            },
          ],
        },
      }
    },
    attributes() {
      return [
        {
          name: 'description',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 400,
        },
        {
          name: 'date_time',
          type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
