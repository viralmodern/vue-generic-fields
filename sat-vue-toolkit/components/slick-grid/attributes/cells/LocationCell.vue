<template>
  <v-card color="transparent"
          flat
          class="text-border d-flex w-100 cursor--pointer"
          title="Location">
    <div class="flex-grow-1 text-left" @click="$$openDropDownSource">
      {{val | $$getRawAddress}}
    </div>

  </v-card>
</template>

<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  import { $$getRawAddress } from "@/sat-vue-toolkit/functions"

  export default {
    name: "LocationCell",
    mixins: [mxAttributeItem],
    data() {
      return {
        val: '',
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(v) {
          this.val = $$getRawAddress(v)
        }
      }
    },
    filters: {
      $$getRawAddress,
    }
  }
</script>

<style scoped lang="scss">

</style>
