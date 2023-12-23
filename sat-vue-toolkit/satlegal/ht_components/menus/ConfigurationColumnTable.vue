<template>
  <v-menu :close-on-content-click="false" offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon color="primary">
        <v-icon>settings</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-row no-gutters>
        <v-col v-for="(type, index) in filterTypeHeader" :key="index">
          <v-list-item avatar>
            <v-list-item-content>
              <v-list-item-title>{{ type }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="column in headerGroup[type]"
            :key="column.name"
            @click="
              $emit('turnOnOffColumn', {
                name: column.name,
                visible: !column.visible
              })
            "
          >
            <v-list-item-action>
              <v-checkbox :input-value="column.visible"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>{{ column[keyText] }}</v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    columns: Array,
    keyText: String
  },
  computed: {
    headerGroup() {
      const group = {};
      this.columns.forEach(x => {
        (group[x.type] = group[x.type] || []).push(x);
      });
      return group;
    },
    filterTypeHeader() {
      const filterrType = [];
      Object.keys(this.headerGroup).forEach(key => filterrType.push(key));
      return filterrType;
    }
  }
};
</script>
