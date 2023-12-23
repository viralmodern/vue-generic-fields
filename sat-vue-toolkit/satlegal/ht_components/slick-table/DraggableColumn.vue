<template>
  <v-row no-gutters>
    <v-col>
      <v-list>
        <v-list-item avatar>
          <v-list-item-content>
            <v-list-item-title>{{title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list-item
        v-for="column in columns"
        :key="column.name"
        @click="$emit('turnOnOffColumn',{name:column.name,visible:!column.visible})"
      >
        <v-list-item-action>
          <v-checkbox :input-value="column.visible"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>{{column.title}}</v-list-item-content>
      </v-list-item>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    title: String,
    columns: Array,
    dragOptions: Object
  }
};
</script>