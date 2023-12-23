<template>
  <div>
    <v-text-field
      v-model="search"
      rounded
      filled
      dense
      placeholder="Search"
      single-line
      label="Search Company Directory"
      flat
      clearable
      hide-details
      append-icon="mdi-map-marker"
      @click:append="openCourts"
    />
  </div>
</template>

<script>
import didYouMean from 'didyoumean2'

export default {
  name: 'SearchODTContent',
  data() {
    return {
      search: '',
      list: ['facebook', 'twitter', 'instagram', 'linkedin'],
    }
  },
  computed: {
    getDidYouMean() {
      console.log(didYouMean(this.search, this.list))
      return didYouMean(this.search, this.list)
    },
  },
  methods: {
    openCourts() {},
  },
}
</script>

<style scoped></style>
