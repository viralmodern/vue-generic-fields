<template>
  <div>
    <v-tabs color="orange" :value="value" @change="onChangeTab">
      <v-tabs-slider></v-tabs-slider>
      <v-tab :href="`#${PANEL_MODE.OUTLINE.type}`" active-class="orange--text"
             class="text-capitalize subtitle-2 font-weight-regular">
        {{PANEL_MODE.OUTLINE.label}}
      </v-tab>
      <v-tab :href="`#${PANEL_MODE.TOOLTIP.type}`" active-class="orange--text"
             class="text-capitalize subtitle-2 font-weight-regular">
        {{PANEL_MODE.TOOLTIP.label}}
      </v-tab>
    </v-tabs>
    <v-divider/>
  </div>
</template>

<script>
  import { PANEL_MODE } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"
  export default {
    name: "TopViewModeAttributeDetail",
    props: {
      value: {

      }
    },
    data() {
      return {
        PANEL_MODE,
      }
    },

    methods: {
      onChangeTab(tab) {
        this.$emit('input', tab)
      }
    }
  }
</script>

<style scoped>

</style>
