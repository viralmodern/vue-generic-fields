<template>
  <v-menu :close-on-content-click="false" offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="ma-0 my-2" color="primary">
        <v-icon>mdi-settings</v-icon>Configuration
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item avatar>
          <v-list-item-avatar>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Grid settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list-item
        v-for="column in headers"
        :key="column.id"
        @click="
          $emit('turnOnOffColumn', {
            id: column.id,
            name: column.text,
            visible: !column.visible
          })
        "
      >
        <v-list-item-action>
          <v-checkbox :input-value="column.visible"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>{{ column.name }}</v-list-item-content>
      </v-list-item>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    headers: Array
  }
};
</script>
