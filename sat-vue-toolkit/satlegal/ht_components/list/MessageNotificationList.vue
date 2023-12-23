<template>
  <v-card class="elevation-0">
    <v-app-bar card dense color="transparent">
      <v-toolbar-title>
        <h4>Messages</h4>
      </v-toolbar-title>
    </v-app-bar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list class="pa-0">
        <v-list-item
          avatar
          v-for="item in dataInbox.slice(0, 3)"
          :key="item.id"
          :to="toDetail(item.id)"
        >
          <UserAvatarWithOnlineStatus
            :name="item.from.name || ''"
            :imageUrl="(item.from || {}).avatar"
            :avatarSize="40"
            status="true"
            is-in-list
          />
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-btn block class="ma-0" :to="{ name: 'InboxPortal' }" exact>All</v-btn>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import UserAvatarWithOnlineStatus from "../avatars/UserAvatarWithOnlineStatus";
import { mapGetters } from "vuex";
export default {
  components: {
    UserAvatarWithOnlineStatus
  },
  methods: {
    toDetail(id) {
      return {
        name: "InboxPortalDetail",
        params: {
          idInbox: id
        }
      };
    },
    handleClick: () => {}
  },
  computed: {
    ...mapGetters("ht_store/newsFeed", ["news"]),
    ...mapGetters("ht_store/clientPortal/inbox", ["dataInbox"])
  }
};
</script>
