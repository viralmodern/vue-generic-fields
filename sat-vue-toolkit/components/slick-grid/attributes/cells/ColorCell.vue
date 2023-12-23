<template>
  <div class="w-100 d-flex align-center justify-center">
    <div class="text-left flex-grow-1 cursor--pointer"
         @click="$$openDropDownSource">
      <template v-if="val">
        <v-icon :color="`#${val}`">
          mdi-checkbox-blank-circle
        </v-icon>
      </template>
      <template v-else>
        <v-icon color="default">
          mdi-checkbox-blank-circle
        </v-icon>
      </template>
    </div>

  </div>
</template>

<script>

  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  export default {
    name: "ColorCell",
    data () {
      return {
        val: ""
      }
    },
    mixins: [mxAttributeItem],
    watch: {
      value: {
        immediate: true,
        handler (v) {
          this.val = v
        }
      }
    },

  }
</script>

<style scoped lang="scss">

</style>
