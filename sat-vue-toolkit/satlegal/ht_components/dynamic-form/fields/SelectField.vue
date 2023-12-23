<template>
  <v-select
    class="ma-0 pa-0"
    :placeholder="config.placeholder"
    hide-details
    :items="config.options"
    :value="value"
    @change="updateValue"
    :multiple="config.multiple"
  ></v-select>
</template>

<script>
import fieldBase from "./FieldBase";
export default {
  mixins: [fieldBase]
};
</script>

