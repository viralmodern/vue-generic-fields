<template>
  <v-list dense>
    <v-container class="pa-2">
      <v-row no-gutters class="align-center">
        <v-col grow>
          <h2>Mentions</h2>
        </v-col>
        <v-col shrink class="font-weight-bold mr-1">LIVE</v-col>
        <v-col shrink>
          <v-switch class="pt-0 ma-0" hide-details></v-switch>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <UserActivity
      v-for="(mention, index) in mentions"
      :key="index"
      :action="mention.action"
      :executor="mention.executor"
      :executedDate="mention.executedDate"
      :destinationObject="mention.destinationObject"
    />
    <v-divider></v-divider>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import UserActivity from "../cards/UserActivity";

export default {
  components: {
    UserActivity
  },
  computed: mapGetters("ht_store/mention", ["mentions"])
};
</script>
