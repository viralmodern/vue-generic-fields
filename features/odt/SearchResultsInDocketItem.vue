<template>
  <div>
    <div>
      <p>
        <router-link
          v-html="item.short_description || item.description"
          :to="`/odt/dockets${item.docket_absolute_url}`"
          class="title mb-0"
        >
        </router-link>
      </p>
      <div>
        <strong>Docket Number:</strong> {{ item.docketNumber }}
        <strong class="mx-2"></strong>
        <strong>Date Filed:</strong> {{ item.dateFiled | $$formatFullDate }}
        <strong class="mx-2"></strong>
        <strong class="mx-2"></strong>
        <strong>Assigned To:</strong> {{ item.assignedTo }}
      </div>
      <p></p>
    </div>
    <div>
      <div v-html="item.snippet" class="text-caption"></div>
    </div>
  </div>
</template>

<script>
import {
  $$arrToString,
  $$formatFullDate,
  $$getYear,
  $$strNumFormat,
} from '@/sat-vue-toolkit/functions'

export default {
  name: 'SearchResultsInDocketItem',
  filters: {
    $$arrToString,
    $$formatFullDate,
    $$getYear,
    $$strNumFormat,
    f_pathDocketDetail(item) {
      console.log(item.docket_id, item.document_number)
      return `/odt/dockets${item.docket_absolute_url}`
    },
    f_pathDocketDocumentDetail(item) {
      console.log(item.docket_id, item.document_number)
      return `/odt/dockets${item.absolute_url}`
    },
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
