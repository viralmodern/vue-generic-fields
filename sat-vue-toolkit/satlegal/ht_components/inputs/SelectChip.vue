<template>

  <v-select
    :prepend-icon="icon ? icon : 'beenhere'"
    menu-props="auto"
    :items="items"
    :label="label"
    :item-text="itemText"
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
        :color="item[itemColor]"
        text-color="white"
      >{{item[itemText]}}</v-chip>
    </template>
    <template slot="item" slot-scope="{item}">
      <v-chip class="white--text" rounded :color="item[itemColor]" small>{{item[itemText]}}</v-chip>
    </template>
  </v-select>
</template>


<script>
export default {
  props: {
    items: Array,
    label: String,
    itemText: String,
    itemValue: String,
    itemColor: String,
    value: [Number, String, Array, Boolean],
    rules: Array,
    disabled: [Boolean],
    icon: String
  }
};
</script>
