<template>
  <BaseSideBarDocketDetail>
    <DocsTreeSideBar
      :items="items"
      :matter-id="matterId"
      :docket-entry="docketEntry"
    />
  </BaseSideBarDocketDetail>
</template>

<script>
import BaseSideBarDocketDetail from './BaseSideBarDocketDetail'
import DocsTreeSideBar from './components/DocsTreeSideBar'
export default {
  name: 'ListDirectoriesDocket',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    matterId: {},
    docketEntry: {},
  },
  components: { DocsTreeSideBar, BaseSideBarDocketDetail },
  computed: {},
}
</script>

<style scoped></style>
