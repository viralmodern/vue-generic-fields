<template>
  <div class="w-100">
    <v-progress-linear color="green"
                       class="cursor--pointer"
                       height="25px"
                       reactive
                       @click="$$openDropDownSource"
                       :value="val | getValue">
      <strong>{{ Math.ceil(val) }}%</strong>

    </v-progress-linear>
  </div>
</template>

<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  export default {
    name: "ProgressCell",
    data() {
      return {
        val: 0
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
    filters: {
      getValue(prc) {
        if (prc && typeof prc === "number") {
          return prc
        }
        return 0
      }
    }
  }
</script>

<style scoped>

</style>
