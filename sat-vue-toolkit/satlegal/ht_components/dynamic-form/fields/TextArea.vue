<template>
  <v-textarea
    solo
    :row="3"
    :placeholder="config.placeholder"
    hide-details
    :value="value"
    @change="updateValue"
  ></v-textarea>
</template>

<script>
import fieldBase from "./FieldBase";
export default {
  mixins: [fieldBase]
};
</script>

