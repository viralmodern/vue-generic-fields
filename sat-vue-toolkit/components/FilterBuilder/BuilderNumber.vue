<template>
  <div class="d-flex align-center">
    <v-text-field placeholder="Value"
                  type="number"
                  :value="value.valueBefore"
                  @input="(valueBefore) => $emit('input', {valueBefore, valueAfter: value.valueAfter})"
                  v-bind="vBindField"/>
    <template v-if="isBetweenOperation">
      <div class="mx-2">And</div>
      <v-text-field placeholder="Value"
                    type="number"
                    :value="value.valueAfter"
                    @input="(valueAfter) => $emit('input', {valueAfter, valueBefore: value.valueBefore})"
                    v-bind="vBindField"/>
    </template>
  </div>
</template>
<script>
  import { vBindField } from "./configs"
  import builderProps from "./builderProps"
  export default {
    name: "BuilderNumber",
    props: {
      vBindField,
      ...builderProps
    },
    methods: {
      change() {
        let v = {
          valueBefore: '',
          valueAfter: ''
        }
        this.$emit('input', {})
      }
    }
  }
</script>

<style scoped>

</style>
