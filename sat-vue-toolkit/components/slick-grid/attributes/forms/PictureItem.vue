<template>
  <div>
    <div class="d-flex justify-center align-center">
      <div class="text-left">
        <p class="ma-0">{{label}}</p>
      </div>
      <div class="flex-grow-1 d-flex justify-center align-center">
        <FilePondUpload v-model="val"/>
      </div>
    </div>
    <div class="text-caption error--text">{{errorMessages | $$arrToString}}</div>
  </div>
</template>

<script>
  import FilePondUpload from "@/sat-vue-toolkit/components/uploader/FilePondUpload.vue"
  import { $$arrToString } from "@/sat-vue-toolkit/functions"

  export default {
    name: "PictureItem",
    components: { FilePondUpload },
    filters: {
      $$arrToString
    },
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
