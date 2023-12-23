<template>
  <v-row no-gutters>
    <v-col>
      <v-list v-for="item in dataRelation" :key="item.id">
        <v-list-item>
          <v-list-item-action>
            <v-icon color="primary">label_important</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              icon
              @click="$emit('emitDeleteRelation', dataRelation, item)"
            >
              <v-icon>delete_outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider inset></v-divider>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    dataRelation: Array
  }
};
</script>
