<template>
  <div>
    <AttachmentFileUpload v-model="select" />
  </div>
</template>

<script>
import AttachmentFileUpload from '../../../../components/utils/AttachmentFileUpload'
export default {
  name: 'AttributesAttachmentCell',
  components: {
    AttachmentFileUpload
  },
  data() {
    return {
      select: ''
    }
  },
  props: {
    value: {}
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
