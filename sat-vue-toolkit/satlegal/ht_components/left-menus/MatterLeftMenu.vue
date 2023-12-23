<template>
  <v-card
    class="mt-2"
    :class="{ 'small-menu': $vuetify.breakpoint.xs || $vuetify.breakpoint.sm }"
  >
    <v-list>
      <div v-for="(item, index) in matterLeftMenu" :key="index">
        <v-list-item v-if="!item.subs" @click="showContent">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-menu v-else no-action offset-y>
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item
              v-for="(val, e) in item.subs"
              :key="e"
              @click="showContent"
            >
              <v-list-item-content>
                <v-list-item-title>{{ val }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-list>
  </v-card>
</template>
<script>
import { matterLeftMenu } from "../../config.js";
export default {
  data() {
    return {
      matterLeftMenu
    };
  },
  methods: {
    showContent() {}
  }
};
</script>
<style scoped>
.small-menu {
  width: 60px;
}
</style>
