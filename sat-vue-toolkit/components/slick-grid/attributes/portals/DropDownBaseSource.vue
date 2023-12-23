<template>
  <v-menu :activator="activatorId"
          transition="slide-y-transition"
          offset-y
          right
          v-model="uiShowMenu" max-width="450px"
          :close-on-content-click="false">
    <div v-if="attribute.type">
      <component :is="attribute.type | getSourceLayout"
                 :attribute="attribute"
                 :endPointList="endPointList"
                 :endPoint="endPoint"
                 v-model="val"
                 :$$execute="$$execute"></component>
    </div>
  </v-menu>
</template>


<script>
  import mxAttributeDropDownSource from "../mixins/mxAttributeDropDownSource"
  import {
    getSourceLayout,
    getSourcesComponentAttributes
  } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"

  export default {
    name: "DropDownBaseSource",
    components: {
      ...getSourcesComponentAttributes
    },
    mixins: [mxAttributeDropDownSource],
    filters: {
      getSourceLayout
    }
  }
</script>

<style scoped>

</style>
