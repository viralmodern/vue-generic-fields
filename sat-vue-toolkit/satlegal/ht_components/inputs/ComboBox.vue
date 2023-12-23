<template>
  <v-combobox
    :value="item"
    :items="items"
    :search-input.sync="search"
    hide-selected
    :hint="hint"
    :label="label"
    persistent-hint
    multiple
    :item-text="itemText"
    :item-value="itemValue"
    @change="$emit('change', $event)"
    small-chips
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            No results matching "
            <strong>{{ search }}</strong>". Press
            <kbd>enter</kbd> to create a new one
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-combobox>
</template>
<script>
export default {
  props: {
    label: String,
    hint: String,
    item: Array,
    items: Array,
    itemValue: String,
    itemText: String
  },
  data() {
    return {
      search: null
    };
  }
};
</script>
