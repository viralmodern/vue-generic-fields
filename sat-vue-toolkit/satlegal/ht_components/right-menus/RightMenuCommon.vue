<template>
  <v-list dense>
    <v-container class="pa-2">
      <v-row no-gutters class="align-center">
        <v-col grow>
          <h2>Activities</h2>
        </v-col>
        <v-btn icon class="ma-0">
          <v-icon @click="close">mdi-close</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-row class="mt-2 mb-2 px-2" no-gutters>
      <slot name="rightmenu"></slot>
    </v-row>
  </v-list>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations("ht_store/layout", ["openRight"]),
    close() {
      this.openRight("rightMenuCommon");
    }
  }
};
</script>
