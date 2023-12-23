<template>
  <div class="text-xs-center">
    <v-tooltip bottom>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="250"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <AvatarProjectGroup
            v-on="on"
            :name="item.avatar.name"
            :imageUrl="(item.avatar || {}).imageUrl"
            :avatarSize="32"
            @delete="showMenuRemove"
          />
        </template>
        <v-card>
          <v-list>
            <v-row  no-gutters>
              <v-col cols="2">
                <AvatarProjectGroup
                  :name="item.avatar.name"
                  :imageUrl="(item.avatar || {}).imageUrl"
                  :avatarSize="40"
                  class="ml-2"
                />
              </v-col>
              <v-col cols="9">
                <v-list-item-content class="ml-1">
                  <v-list-item-title class="font-weight-bold subheading">{{
                    item.avatar.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="caption">{{
                    item.email
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <v-col cols="1">
                <v-icon @click="menu = false">close</v-icon>
              </v-col>
            </v-row>
          </v-list>
          <v-list>
            <v-list-item @click="removeMember">
              <v-list-item-title class="font-weight-bold"
                >Remove</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <span>{{ item.avatar.name }} {{ `(${item.avatar.nickName})` }}</span>
    </v-tooltip>
  </div>
</template>
<script>
import AvatarProjectGroup from "../avatars/AvatarProjectGroup";
export default {
  components: {
    AvatarProjectGroup
  },
  props: {
    item: Object
  },
  data() {
    return {
      menu: false,
      itemMember: null
    };
  },
  methods: {
    showMenuRemove(item) {
      this.itemMember = item;
    },
    removeMember() {
      this.$emit("delete", this.itemMember);
    }
  }
};
</script>
