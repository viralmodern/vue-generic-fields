<template>
  <div>
    <v-text-field placeholder="Value"
                  style="font-size: 12px;"
                  v-bind="vBindField"
                  @input="(valueBefore) => $emit('input', {valueBefore})"
                  :value="value.valueBefore"/>
  </div>
</template>

<script>
import { vBindField } from "./configs"
import builderProps from "./builderProps"

export default {
  name: 'BuilderTextField',
  props: {
    vBindField,
    ...builderProps
  }
}
</script>

<style scoped></style>
