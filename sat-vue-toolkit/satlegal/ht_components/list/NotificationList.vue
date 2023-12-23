<template>
  <v-card class="elevation-0">
    <v-app-bar card dense color="transparent">
      <v-toolbar-title>
        <h4>Notification</h4>
      </v-toolbar-title>
    </v-app-bar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list class="pa-0">
        <UserActivity
          v-for="(item, index) in news"
          :key="index"
          :action="item.action"
          :executor="item.executor"
          :executedDate="item.executedDate"
          :destinationObject="item.destinationObject"
        />
      </v-list>

      <v-divider></v-divider>
      <v-btn block class="ma-0">All</v-btn>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import UserActivity from "../cards/UserActivity";
import { mapGetters } from "vuex";
export default {
  components: {
    UserActivity
  },
  methods: {
    handleClick: () => {}
  },
  computed: {
    notifications() {
      return [
        {
          title: "New user registered",
          color: "light-green",
          icon: "account_circle",
          timeLabel: "Just now"
        },
        { divider: true, inset: true },
        {
          title: "New order received",
          color: "light-blue",
          icon: "shopping_cart",
          timeLabel: "2 min ago"
        },
        { divider: true, inset: true },
        {
          title: "New payment made",
          color: "cyan",
          icon: "payment",
          timeLabel: "24 min ago"
        },
        { divider: true, inset: true },
        {
          title: "New message from Michael",
          color: "red",
          icon: "email",
          timeLabel: "1 hour ago"
        }
      ];
    },
    ...mapGetters("ht_store/newsFeed", ["news"])
  }
};
</script>
