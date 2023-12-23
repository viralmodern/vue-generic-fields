<template>
  <v-app-bar
    color="primary"
    class="custom-toolbar"
    dark
    fixed
    app
    clipped-right
  >
    <v-app-bar-nav-icon class="hidden-md-and-up"></v-app-bar-nav-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn :to="{ name: 'HomeFeedPortal' }">Home feed</v-btn>
      <v-btn :to="{ name: 'DocumentRequestPortal' }">Document request</v-btn>
      <v-btn :to="{ name: 'MeetingPortal' }">Meeting</v-btn>
      <v-btn :to="{ name: 'BillingPortal' }">Billing</v-btn>
      <v-btn :to="{ name: 'MatterPortal' }">Matter</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-menu
      :nudge-width="250"
      :max-width="250"
      offset-y
      origin="center center"
      class="elelvation-1"
      :nudge-bottom="14"
      transition="scale-transition"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }"
        >>
        <v-btn v-on="on">
          Invoices
          <v-badge color="red" overlap>
            <span slot="badge">3</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
          </v-badge>
        </v-btn>
        <InvoiceNotificationList
          class="notification-list"
        ></InvoiceNotificationList>
      </template>
    </v-menu>
    <v-menu
      :nudge-width="250"
      :max-width="250"
      offset-y
      origin="center center"
      class="elelvation-1"
      :nudge-bottom="14"
      transition="scale-transition"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-badge color="red" overlap>
            <span slot="badge">3</span>
            <v-icon medium>mdi-message</v-icon>
          </v-badge>
        <MessageNotificationList
          class="notification-list"
        ></MessageNotificationList>
      </template>
    </v-menu>
    <v-menu
      :nudge-width="250"
      :max-width="250"
      offset-y
      origin="center center"
      class="elelvation-1"
      :nudge-bottom="14"
      transition="scale-transition"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-badge color="red" overlap>
            <span slot="badge">3</span>
            <v-icon medium>mdi-notifications</v-icon>
          </v-badge>
        </v-btn>
        <NotificationList class="notification-list"></NotificationList>
      </template>
    </v-menu>
    <v-menu
      offset-y
      origin="center center"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <v-btn icon large v-slot:activator="{ on }">
        <UserAvatar
          v-on="on"
          backgroundColor="grey"
          :avatarSize="36"
          :imageUrl="(avatar || {}).imageUrl"
          :name="username"
        />
      </v-btn>
      <v-list class="pa-0">
        <v-list-item
          v-for="(item, index) in items"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          @click="item.click"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="index"
        >
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-toolbar-items>
      <v-row class="align-center" no-gutters>
        <v-switch
          class="pt-0"
          hide-details
          :inputValue="dark"
          @change="switchTheme"
        ></v-switch>
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
import NotificationList from "../list/NotificationList";
import MessageNotificationList from "../list/MessageNotificationList";
import InvoiceNotificationList from "../list/InvoiceNotificationList";
export default {
  components: {
    UserAvatar,
    NotificationList,
    MessageNotificationList,
    InvoiceNotificationList
  },
  data() {
    return {
      itemsMenu: [
        {
          id: 1,
          name: "Home Feed",
          link: "HomeFeedPortal"
        },
        {
          id: 2,
          name: "Document request",
          link: "DocumentRequestPortal"
        },
        {
          id: 3,
          name: "Meeting",
          link: "MeetingPortal"
        },
        {
          id: 4,
          name: "Billing",
          link: "BillingPortal"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/layout", ["dark"]),

    ...mapState({
      username: ({ user }) =>
        user.currentUser ? user.currentUser.username || "Mark" : "",
      avatar: ({ user }) => (user.currentUser ? user.currentUser.avatar : null)
    }),
    items() {
      return [
        {
          name: "ProfilePortal",
          icon: "account_circle",
          title: "Profile",
          click: () => {}
        },
        {
          icon: "settings",
          href: "#",
          title: "Settings",
          click: () => {}
        },
        {
          icon: "fullscreen_exit",
          href: "#",
          title: "Logout",
          click: () => {}
        }
      ];
    }
  },
  methods: {
    ...mapMutations("ht_store/layout", ["switchTheme"]),
    ...mapActions("ht_store/clientPortal/inbox", ["getDataInboxRequest"]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"]),
    ...mapActions("ht_store/clientPortal/billing/invoice", ["getDataInvoiceRequest"])
  },
  mounted() {
    this.getDataInboxRequest();
    this.getDataClientRequest();
    this.getDataInvoiceRequest();
  }
};
</script>

<style scoped>
.notification-list {
  max-height: 70vh;
  overflow-y: auto;
}
.custom-toolbar /deep/ .v-toolbar__extension {
  height: initial !important;
  padding: 0px !important;
}
</style>
