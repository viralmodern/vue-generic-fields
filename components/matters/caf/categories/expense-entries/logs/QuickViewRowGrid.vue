<template>
  <DrawerPicker :value="open" @input="input" title="Expense Detail">
    <LogsRowItemFormDetail />
  </DrawerPicker>
</template>

<script>
import LogsRowItemFormDetail from './LogsRowItemFormDetail'
import DialogPicker from '../../../../../utils/DialogPicker'
import DrawerPicker from '../../../../../utils/DrawerPicker'

export default {
  name: 'QuickViewRowGrid',
  components: { DrawerPicker, DialogPicker, LogsRowItemFormDetail },
  data() {
    return {}
  },
  props: {
    open: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    matter() {
      try {
        return this.$store.getters['matters/matterDetail']
      } catch (e) {
        return {}
      }
    },
  },
  methods: {
    submit() {},
    input(drawer) {
      if (!drawer) {
        this.$emit('close')
      }
    },
  },
}
</script>

<style scoped></style>
