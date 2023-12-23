<template>

  <v-select
    class="custom ma-0 pa-0"
    menu-props="auto"
    :items="items"
    :item-text="itemText"
    :placeholder="placeholder"
    :item-value="itemValue"
    :disabled="disabled"
    :value="value"
    @change="$emit('change', $event)"
    :rules="rules"
  >
    <template slot="selection" slot-scope="{item}">
      <v-chip
        class="ml-0"
        small
        :color="item[itemColor] || 'grey'"
        text-color="white"
      >{{item[itemText]}}</v-chip>
    </template>
    <template slot="item" slot-scope="{item}">
      <v-chip class="white--text" rounded :color="item[itemColor] || 'grey'" small>{{item[itemText]}}</v-chip>
    </template>
  </v-select>
</template>


<script>
export default {
  props: {
    items: Array,
    itemText: String,
    placeholder: String,
    itemValue: String,
    itemColor: String,
    value: [Number, String, Array, Boolean],
    rules: Array,
    disabled: [Boolean],
  }
};
</script>

<style scoped>
.custom /deep/ .v-select__selections {
  font-size: 13px;
}
.custom /deep/ .v-input__append-inner {
  display: none;
}
</style>
