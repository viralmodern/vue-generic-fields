<template>
  <div>
    <GridSearchResultsDocketsOdt
      disabled-dialog-phrase
      height="100%"
      quick-attribute
      :docket-id="$route.params.docket"
      pinned-row
      :pinned-row-id="`${sessionId}-${sessionSuffix}`"
    />
  </div>
</template>

<script>
import GridSearchResultsDocketsOdt from '~/features/odt/GridSearchResultsDocketsOdt'
export default {
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
  components: { GridSearchResultsDocketsOdt },
}
</script>

<style scoped></style>
