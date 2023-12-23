<template>
  <td>
    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <v-chip v-for="item in dataRow.location" :key="item" small>{{
            item
          }}</v-chip>
          <span v-if="!dataRow.location.length">(No place)</span>
        </div>
      </template>
      <v-card>
        <v-combobox
          v-model="location"
          :items="locations"
          :search-input.sync="search"
          hide-selected
          item-text="name"
          multiple
          persistent-hint
          deletable-chips
          small-chips
          @change="changeLocation"
          class="mx-2"
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
      </v-card>
    </v-menu>
  </td>
</template>
<script>
import { mapActions } from "vuex";
import { locations } from "../../config";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      search: null,
      location: [],
      locations,
      menu: false
    };
  },
  methods: {
    ...mapActions("ht_store/task/list", ["updateTask"]),
    changeLocation(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.updateTask(data);
      this.menu = false;
    }
  },
  mounted() {
    this.location = this.dataRow.location;
  }
};
</script>
