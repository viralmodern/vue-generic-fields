<template>
  <v-menu :close-on-content-click="false" offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">
        <v-icon>settings</v-icon>Add/remove filters
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item avatar>
          <v-list-item-avatar>
            <v-icon>settings</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Filter settings</v-list-item-title>
            <v-list-item-subtitle
              >Add or remove filter by using checkbox</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <div class="list-group" style="max-height: 80vh;overflow: auto;">
        <v-list-item
          v-for="filter in filters"
          :key="filter.name"
          @click="$emit('turnOnOffFilter', filter)"
        >
          <v-list-item-action>
            <v-checkbox :input-value="filter.active"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>{{ filter.title }}</v-list-item-content>
        </v-list-item>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    filters: Array
  }
};
</script>
