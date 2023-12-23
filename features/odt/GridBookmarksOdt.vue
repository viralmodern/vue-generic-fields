<template>
  <div>
    <SlickGrid
      :height="height"
      :attributes="attributes"
      disabled-add-new-column
      disabled-add-new-row
      :has-report-row="false"
      :has-vote-row="false"
      disabled-bookmark-row
      :end-point="endPoint"
      disabled-owner-row
      no-link-detail
    />
  </div>
</template>

<script>
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { convertLinkBookmarkToContentType } from '@/sat-vue-toolkit/components/slick-grid/helpers/helpers'
export default {
  name: 'GridBookmarksOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => '83vh',
    },
    endPoint: {
      type: String,
      default: () => `/api/dockets/bookmarks/`,
    },
  },
  computed: {
    attributes() {
      return [
        {
          name: 'name',
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          readOnly: true,
          width: 350,
          pathLink: function () {
            return `${convertLinkBookmarkToContentType(
              this.link,
              this.object_pk
            )}`
          },
        },
        {
          name: 'created',
          type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
          readOnly: true,
        },
        {
          name: 'description',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 350,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
