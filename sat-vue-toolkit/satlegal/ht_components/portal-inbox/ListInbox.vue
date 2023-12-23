<template>
  <v-container fluid fill-height class="pa-0 mail-list" id="mailList">
    <v-row no-gutters class="mail-list--layout">
      <v-col class="mail-content white">
        <v-list two-line class="mail-list--list">
          <template v-for="(item, index) in list">
            <v-list-item
              avatar
              ripple
              :key="index"
              :to="computeMailPath(item.id)"
              exact
            >
              <v-list-item-action @click.stop.prevent>
                <v-checkbox
                  v-model="checked[item.id]"
                  @change="$emit('check', item.id)"
                ></v-checkbox>
              </v-list-item-action>
              <UserAvatar
                :avatarSize="40"
                :imageUrl="(item.from || {}).avatar"
                :name="item.from.name || ''"
              />
              <v-list-item-content class="pl-3">
                <v-list-item-title>{{ item.from.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>{{
                  item.created_at | formatMMDDYYYYHHMM
                }}</v-list-item-action-text>
                <v-btn
                  class="ma-0"
                  icon
                  @click.stop.prevent="
                    $emit('update', { id: item.id, rate: !item.rate })
                  "
                >
                  <v-icon color="primary" v-if="item.rate">mdi-star</v-icon>
                  <v-icon color="primary" v-else>mdi-star_border</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="'divider' + index"></v-divider>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
import { formatMMDDYYYYHHMM } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"
export default {
  filters: {
    formatMMDDYYYYHHMM: formatMMDDYYYYHHMM
  },
  components: {
    UserAvatar
  },
  props: {
    list: Array
  },
  data() {
    return {
      checked: {}
    };
  },
  methods: {
    computeMailPath(id) {
      return { name: "InboxPortalDetail", params: { idInbox: id } };
    }
  },
  watch: {
    list() {
      this.checked = {};
    }
  }
};
</script>
