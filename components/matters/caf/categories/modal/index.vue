<template>
  <v-dialog v-model="dialog"
            fullscreen
            scrollable
            hide-overlay
            transition="dialog-bottom-transition">
    <slot/>
  </v-dialog>
</template>

<script>
import BaseCateSearchCaf from "../BaseCateSearchCaf";
import PanelCateSearch from "../PanelCateSearch";
export default {
  name: 'LightBox',
  components: {PanelCateSearch, BaseCateSearchCaf},
  data() {
    return {
      dialog: true,
    }
  },
}
</script>

<style scoped>

</style>
