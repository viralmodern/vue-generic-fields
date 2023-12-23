<template>
  <div>
    <div>
      <p class="caption mb-1" v-html="docketEntryDetail.description"></p>
    </div>
    <p class="caption">
      <strong>Date Filed: </strong> {{ docketEntryDetail.date_filed }}
    </p>
  </div>
</template>

<script>
// import Bookmark from '@/sat-vue-toolkit/components/Bookmark/Bookmark'
export default {
  name: 'DocketEntryDetailThumbnailOdt',
  props: {
    docket: {
      type: Object,
      default: () => ({}),
    },
    docketEntryDetail: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
}
</script>

<style scoped></style>
