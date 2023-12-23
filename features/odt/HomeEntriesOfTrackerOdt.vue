<template>
  <div>
    <GridEntriesOfTrackerOdt
      :height="height"
      :includes-fields="includesFields"
    />
  </div>
</template>

<script>
export default {
  name: 'HomeEntriesOfTrackerOdt',
  props: {
    height: {
      default: () => `${77}vh`,
    },
    includesFields: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    GridEntriesOfTrackerOdt: () =>
      import('~/features/odt/GridEntriesOfTrackerOdt'),
  },
}
</script>

<style scoped></style>
