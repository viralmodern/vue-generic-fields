<template>
  <div class="w-100">
    <EditorDocs v-model="val"/>
    <div class="mb-4"></div>
  </div>
</template>

<script>
  import FilePondUpload from "@/sat-vue-toolkit/components/uploader/FilePondUpload.vue"
  import EditorDocs from "@/sat-vue-toolkit/components/slick-grid/attributes/notes/EditorDocs.vue"
  export default {
    name: "NoteContentItem",
    components: { EditorDocs, FilePondUpload },
    props: {
      label: {
        type: [String],
        default: () => 'Label'
      },
      placeholder: {
        type: [String],
        default: () => 'Label'
      },

      value: {

      },
      required: {

      },
      errorMessages: {

      }
    },
    data() {
      return {
        val: ''
      }
    },
    watch: {
      val: {
        immediate: true,
        handler(v) {
          this.$emit('input', v)
        }
      },
      value: {
        immediate: true,
        handler(v) {
          this.val = v
        }
      }
    }
  }
</script>

<style scoped>

</style>
