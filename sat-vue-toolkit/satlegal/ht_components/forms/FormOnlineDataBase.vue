<template>
  <v-form ref="form">
    <v-divider></v-divider>
    <strong class="py-3">Online database publication info</strong>
    <v-combobox
      :value="location"
      @input="onChange('location', $event)"
      :items="locations"
      :search-input.sync="search"
      label="Location"
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
    <v-text-field
      :value="database"
      @input="onChange('database', $event)"
      label="Database"
      required
    ></v-text-field>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-on="on"
          :value="dateAccessedOnlineDatabase"
          label="Date accessed"
          append-icon="mdi-calendar"
          readonly
        ></v-text-field>
      </template>
      <v-date-picker
        :value="dateAccessedOnlineDatabase"
        @input="
          menu = false;
          onChange('dateAccessedOnlineDatabase', $event);
        "
        no-title
        scrollable
      ></v-date-picker>
    </v-menu>
    <v-radio-group
      :value="searchType"
      @change="onChange('searchType', $event)"
      label="Search type"
    >
      <v-radio label="Keyword" value="Keyword"></v-radio>
      <v-radio label="Path" value="Path"></v-radio>
      <v-radio label="Url" value="Url"></v-radio>
    </v-radio-group>
    <v-text-field
      :value="searchTextOrUrl"
      @input="onChange('searchTextOrUrl', $event)"
      label="Search text / URL"
      required
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  props: {
    location: String,
    locations: Array,
    database: String,
    dateAccessedOnlineDatabase: String,
    searchType: String,
    searchTextOrUrl: String
  },
  data() {
    return {
      search: null,
      menu: false
    };
  },
  methods: {
    onChange(name, value) {
      const data = {
        name,
        value
      };
      this.$emit("onChange", data);
    }
  }
};
</script>
