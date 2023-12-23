<template>
  <div class="w-100 d-flex align-center justify-center">
    <div class="text-border text-left flex-grow-1"
         @click="$$openDropDownSource">
      <template v-if="val">
        {{val | $$formatFullDate}}
      </template>
      <div class="text-center" v-else></div>
    </div>
  </div>
</template>

<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  import { $$formatFullDate } from "@/sat-vue-toolkit/functions"
  export default {
    name: "DateCell",
    mixins: [mxAttributeItem],
    filters: {
      $$formatFullDate
    },
    data() {
      return {
        val: ''
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(v) {
          this.val = v
        }
      }
    },
  }
</script>

<style scoped lang="scss">

</style>
