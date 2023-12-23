<template>
  <v-dialog v-model="uiShowModal" width="65vw" persistent transition="fade">
    <v-card class="fill-height w-100 pa-4">
      <v-btn icon text @click="uiShowModal = false" absolute right top>
        <v-icon small>mdi-close</v-icon>
      </v-btn>
      <v-card-title>
        Lorem ipsum dolor sit amet
      </v-card-title>
      <v-card-text>
        <SearchODTContent />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import SearchODTContent from '~/features/odt/SearchODTContent'

export default {
  name: 'SearchTermODT',
  components: { SearchODTContent },
  props: {
    value: {},
  },
  data() {
    return {}
  },
  computed: {
    uiShowModal: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      },
    },
  },
}
</script>

<style scoped></style>
