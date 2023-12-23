<template>
  <BaseDocketEntries>
    <v-container fluid py-0>
      <AllDocketEntries height="85vh" />
    </v-container>
  </BaseDocketEntries>
</template>

<script>
import BaseDocketEntries from '@/features/simple-docket/BaseDocketEntries.vue'
import AllDocketEntries from '@/features/simple-docket/AllDocketEntries.vue'

export default {
  components: {
    AllDocketEntries,
    BaseDocketEntries,
  },
}
</script>
