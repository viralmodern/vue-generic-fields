<template>
  <v-container fluid fill-height class="pa-0 mail-reply" id="mailReply">
    <v-row no-gutters class="mail-reply--layout">
      <v-app-bar>
        <v-toolbar-title>
          <UserAvatar
            :avatarSize="40"
            :imageUrl="(item.from || {}).avatar"
            :name="item.from.name || ''"
          />
          <span>&nbsp;{{ item.from.name }}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('update', { rate: !item.rate })">
          <v-icon color="primary" v-if="item.rate">star</v-icon>
          <v-icon color="primary" v-else>mdi-star_border</v-icon>
        </v-btn>
        <div class="text-caption">{{ item.created_at | formatMMDDYYYYHHMM }}</div>
        <v-btn icon small :to="{ name: 'InboxPortal' }" exact>
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </v-app-bar>
      <v-col class="mail-reply--content">
        <v-card>
          <v-card-text class="pa-4">
            <div class="mail-reply--item">
              <div class="layout column">
                <h3 class="text-h5">{{ item.title }}</h3>
                <div class="text--secondary my-4" v-html="item.content"></div>
                <div class="text-h5">Sender: {{ item.from.name }}</div>
                <v-divider class="my-4"></v-divider>
                <CommentInput
                  class="elevation-3 mb-2"
                  :mentions="[]"
                  placeholder="Insert your comment here... (use @ to tag someone)"
                />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
import CommentInput from "../inputs/CommentInput";
import { formatMMDDYYYYHHMM } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"
export default {
  filters: {
    formatMMDDYYYYHHMM
  },
  components: {
    CommentInput,
    UserAvatar
  },
  props: {
    item: Object
  }
};
</script>
