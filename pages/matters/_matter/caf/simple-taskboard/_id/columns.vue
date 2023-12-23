<template>
  <div>
    <ViewKanban />
  </div>
</template>

<script>
import ViewKanban from '../../../../../../features/taskboard/components/ViewKanban/index'

export default {
  props: {
    attributes: {}
  },
  components: { ViewKanban },
  created() {}
}
</script>

<style scoped></style>
