<template>
  <div>
    <AttachmentFileUpload v-model="select" />
  </div>
</template>

<script>
import AttachmentFileUpload from '../../../../components/utils/AttachmentFileUpload'
export default {
  name: 'AttributesImageCell',
  components: { AttachmentFileUpload },
  props: {
    value: {}
  },
  data() {
    return {
      select: ''
    }
  },
  watch: {
    select: {
      handler(v) {
        this.$emit('input', v)
      },
      immediate: true
    }
  }
}
</script>

<style scoped></style>
