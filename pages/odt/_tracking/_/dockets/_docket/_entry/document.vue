<template>
  <div>
    <!--    <p>{{docket}}</p>-->
    <!--    <p>{{docketEntryDetail}}</p>-->
    <nuxt-child
      :docket="docket"
      :docketEntryDetail="docketEntryDetail"
      :key="`${$route.params.docket}-${$route.params.entry}-${$route.params.document}`"
    />
  </div>
</template>

<script>
export default {
  props: {
    docket: {
      type: Object,
      default: () => ({}),
    },
    docketEntryDetail: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style scoped></style>
