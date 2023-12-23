<template>
  <div class="d-flex align-center">
    <v-autocomplete placeholder="Value"
                    :items="sources"
                    :value="value.valueBefore"
                    :item-value="itemValue"
                    @change="(valueBefore) => $emit('input', {valueBefore})"
                    :item-text="itemText"
                    v-bind="vBindField"/>
  </div>
</template>
<script>
  import { vBindField } from "./configs"
  import builderProps from "./builderProps"
  export default {
    name: "BuilderList",
    props: {
      vBindField,
      ...builderProps
    },
  }
</script>

<style scoped>

</style>

