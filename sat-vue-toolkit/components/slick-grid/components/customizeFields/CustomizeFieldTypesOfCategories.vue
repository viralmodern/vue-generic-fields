<template>
  <div>
    <PanelTreeChoices item-text="label"
                      item-key="type"
                      item-key-cate="cate"
                      :choices="items" @input="data => $emit('input', data)"/>
    <!--<PanelTreeChoices item-text="LABEL"
                      item-key="TYPE"
                      item-key-cate="CATEGORY_TYPE"
                      :choices="items" @input="data => $emit('input', data)"/>
    -->
  </div>
</template>

<script>
  import PanelTreeChoices from "~/sat-vue-toolkit/components/Common/PanelTreeChoices"
  export default {
    name: "CustomizeFieldTypesOfCategories",
    components: { PanelTreeChoices },
    props: {
      items: {
        type: Array,
        default: () => []
      },

    }
  }
</script>

<style scoped>

</style>
