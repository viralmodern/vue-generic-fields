<template>
  <v-text-field
    class="ma-0 pa-0"
    :placeholder="config.placeholder"
    hide-details
    :value="value"
    @change="updateValue"
  ></v-text-field>
</template>

<script>
import fieldBase from "./FieldBase";
export default {
  mixins: [fieldBase]
};
</script>
