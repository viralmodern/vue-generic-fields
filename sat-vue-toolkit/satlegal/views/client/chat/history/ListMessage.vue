<template>
  <v-list two-line class="chat-history--list list-message">
    <SearchMessager @search="search" class="pa-2" style="height: 80px;" />
    <template v-for="(item, index) in filterChatGroup">
      <v-divider :key="index"></v-divider>
      <v-list-item
        class="chat-list"
        avatar
        :key="item.uuidRoom"
        :to="chatRoute(item.uuidRoom)"
      >
        <v-list-item-avatar>
          <UserAvatar
            v-if="item.userSendTo[0] && item.chat_room_type === 1"
            :avatarSize="40"
            :imageUrl="item.userSendTo[0].avatar.imageUrl"
            :name="item.userSendTo[0].avatar.name"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <span class="user-name">{{ item.title }}</span>
          <v-list-item-subtitle
            class="sub-name"
            style="display: flex;"
            v-html="subMessager(item.last_message.content.text)"
          ></v-list-item-subtitle>
          <v-row no-gutters>
            <v-chip
              v-for="(v, i) in item.tags.slice(0, 2)"
              :key="i"
              class="chip"
              :color="v.color"
              text-color="white"
              >{{ v.name }}</v-chip
            >
            <v-chip
              v-if="item.tags.length > 2"
              class="chip"
              color="primary"
              text-color="white"
              >+{{ item.tags.length - 2 }}</v-chip
            >
          </v-row>
          <v-list-item-action-text v-if="item.last_message" class="sub-time">{{
            item.last_message.created | formatMMDDYYYYHHMM
          }}</v-list-item-action-text>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>
<script>
import SearchMessager from "./SearchMessager";
import UserAvatar from "../../../../ht_components/avatars/UserAvatar";
import { formatMMDDYYYYHHMM } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"
export default {
  filters: {
    formatMMDDYYYYHHMM
  },
  components: {
    UserAvatar,
    SearchMessager
  },
  props: {
    chatGroups: Array
  },
  data() {
    return {
      searchMessage: ""
    };
  },
  computed: {
    filterChatGroup() {
      if (this.searchMessage) {
        return (this.chatGroups || []).filter(item => {
          const resultSearch = item.title
            .toLowerCase()
            .includes(this.searchMessage.toLowerCase());
          return resultSearch;
        });
      } else {
        return this.chatGroups;
      }
    }
  },
  methods: {
    subMessager(html) {
      return html.replace(/(<\w*>)|(<\/\w*>)/, "");
    },
    chatRoute(id) {
      return "/client/chat/messaging/" + id;
    },
    search(value) {
      this.searchMessage = value;
    }
  }
};
</script>
<style scoped>
.list-message {
  overflow-y: scroll;
  height: calc(100% - 64px) !important;
}
.chip {
  height: 20px;
}
.sub-name {
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.user-name {
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.sub-time {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
