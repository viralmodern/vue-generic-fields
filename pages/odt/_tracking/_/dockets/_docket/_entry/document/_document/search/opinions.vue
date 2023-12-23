<template>
  <div>
    <SearchKeyWordOpinions
      pinned-row
      :pinned-row-id="`${sessionId}-${sessionSuffix}`"
      @click-row="clickRow"
      disabled-input-search
      height="100%"
      :key-word="$route.query.q"
    />
  </div>
</template>

<script>
import SearchKeyWordOpinions from '~/features/odt/SearchKeyWordOpinions'
export default {
  components: { SearchKeyWordOpinions },
  props: {
    sessionId: {
      type: String,
      default: () => ``,
    },
    sessionSuffix: {
      type: String,
      default: () => ``,
    },
  },
  methods: {
    clickRow(data) {
      this.$emit('click-opinion', data)
    },
  },
}
</script>

<style scoped></style>
