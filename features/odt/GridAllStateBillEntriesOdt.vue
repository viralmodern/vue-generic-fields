<template>
  <div></div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
let { BillActions, Sponsors, Votes } = ROUTES.StateBills

export default {
  name: 'GridAllStateBillEntriesOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${77}vh`,
    },
    includesSubs: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped></style>
