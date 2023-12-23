<template>
  <div class="w-100 d-flex align-center fill-height">

  </div>
</template>
<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  export default {
    name: "ConcordancePlotCell",
    data() {
      return {
        val: {}
      }
    },
    mixins: [mxAttributeItem],
    watch: {
      value: {
        immediate: true,
        handler(v) {
          this.val = v
        }
      }
    },
    methods: {

    },

  }
</script>

<style scoped>

</style>
