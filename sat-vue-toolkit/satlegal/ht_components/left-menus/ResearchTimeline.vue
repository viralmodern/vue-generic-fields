<template>
  <v-row no-gutters fill-height>
    <v-list>
      <div>
        <v-list-item class="pa-2">
          <v-btn block color="primary" @click="$emit('openModal')">
            <span>Add timeline</span>
            <v-icon class="pl-1">mdi-add_circle</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <b>TAGS</b>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div class="filterCheckbox">
        <v-list-item v-for="item in tags" :key="item.id">
          <v-list-item-action>
            <v-checkbox v-model="tagTimeline" :value="item.name"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-chip small :color="item.color" class="white--text">
                <span>{{ item.name }}</span>
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      tagTimeline: []
    };
  },
  props: {
    tags: Array
  },
};
</script>

