<template>
  <v-row no-gutters>
    <v-combobox
      v-model="location"
      :items="items"
      :search-input.sync="search"
      hide-selected
      item-text="name"
      multiple
      persistent-hint
      deletable-chips
      small-chips
    >
      <template slot="no-data">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              No location matching "
              <strong>{{ search }}</strong
              >". Press <kbd>enter</kbd> to create a new one
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>
  </v-row>
</template>
<script>
export default {
  props: {
    items: Array,
    taskDetail: Object
  },
  data() {
    return {
      search: null,
      location: []
    };
  },
  watch: {
    taskDetail: {
      handler(val) {
        this.location = val.locations;
      },
      deep: true
    }
  }
};
</script>
