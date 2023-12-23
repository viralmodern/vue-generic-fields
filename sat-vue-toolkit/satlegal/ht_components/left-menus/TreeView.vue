<template>
  <v-list>
    <div>
      <v-list-item>
        <v-list-item-content>
          <v-btn small class="px-4" color="primary">
            <span>Add topic</span>
            <v-icon class="pl-1">mdi-add_circle</v-icon>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-btn small class="px-4" color="primary">
            <span>Add task</span>
            <v-icon class="pl-1">mdi-add_circle</v-icon>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="item in menus" :key="item.id">
        <router-link
          :to="`/tree-view/${item.link}`"
          active-class="active"
          style="text-decoration: none; color: rgba(0,0,0,0.54)"
        >
          <v-list-item-content>
            <v-list-item-title active-class="active">
              <v-icon small>menu</v-icon>
              <span class="ml-2">{{item.name}}</span>
            </v-list-item-title>
          </v-list-item-content>
        </router-link>
      </v-list-item>
    </div>
  </v-list>
</template>
<script>
export default {
  props: {
    menus: Array
  }
};
</script>
<style scoped>
.active {
  background: #6d42c7;
  border-radius: 8px;
  color: white !important;
  padding: 3px 10px;
}
</style>
