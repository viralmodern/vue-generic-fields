<template>
  <v-list class="v-list">
    <v-row no-gutters class="justify-space-between align-center">
      <v-btn icon to="/client" exact>
        <v-icon color="text--secondary">mdi-keyboard_arrow_left</v-icon>
      </v-btn>
      <!-- <template>
        <v-row row>
          <span class="title">title</span>
        </v-row>
      </template>-->
      <v-spacer></v-spacer>
      <!-- <v-toolbar-title>
        <h4>{{nameUserChat.username}}</h4>
      </v-toolbar-title>-->
      <v-spacer></v-spacer>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn color="text--secondary" icon v-on="on">
            <v-icon>mdi-settings</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in itemSettings"
            :key="index"
            @click="handleSettings(item)"
          >
            <v-list-item-title>
              <v-icon class="mr-2">{{ item.icon }}</v-icon>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      nameUserChat: {
        username: ""
      },
      menu: false,
      itemSettings: [
        { id: 1, text: "Open", icon: "lock_open" },
        { id: 2, text: "Close", icon: "block" },
        { id: 3, text: "Archive", icon: "archive" }
      ]
    };
  },
  methods: {
    handleSettings(item) {
      switch (item.text) {
        case "Archive":
          this.$emit("archiveMessage");
          break;
        case "Open":
          this.$emit("openMessage");
          break;
        case "Close":
          this.$emit("closeMessage");
          break;
      }
      this.menu = false;
    }
  }
};
</script>
<style scoped>
.v-list /deep/ .v-toolbar__content {
  padding: 0px;
  box-shadow: none;
}
</style>
