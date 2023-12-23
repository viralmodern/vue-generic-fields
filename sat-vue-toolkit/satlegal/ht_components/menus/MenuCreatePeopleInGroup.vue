<template>
  <v-menu v-model="isShow" :close-on-content-click="false" :nudge-width="50" offset-x>
    <template v-slot:activator="{ on }">
      <!-- <v-row justify="center" no-gutters> -->
        <v-btn v-on="on" icon>
          <v-icon>mdi-add_circle_outline</v-icon>
        </v-btn>
      <!-- </v-row> -->
    </template>
    <v-col cols="12" class="pa-0">
      <v-card>
        <v-row no-gutters>
          <v-list style="width:100%">
            <v-col cols="12">
              <v-col cols="12" d-flex>
                <span class="text-xs-center text-h5 pa-1">{{ title }}</span>
                <v-icon size="20" @click="isShow = false" class="icon-close mt-1">close</v-icon>
              </v-col>
              <v-divider></v-divider>
              <v-row class="mt-2 justify-center" no-gutters>
                <v-col cols="11" style="height: 55px">
                  <v-text-field
                    :label="labelSearch"
                    @input="$emit('searchText', searchQuery)"
                    v-model="searchQuery"
                    single-line
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" v-for="(item, index) in members" :key="index">
              <v-list-item avatar ripple @click="$emit('toggleSelectMember', item)">
                <UserAvatar
                  :name="item.avatar.name"
                  :imageUrl="(item.avatar || {}).imageUrl"
                  :avatarSize="32"
                />
                <v-list-item-content class="ml-2">
                  <v-row no-gutters class="align-center">
                    <v-list-item-title v-html="item.avatar.name"></v-list-item-title>
                    <span
                      class="ml-2 caption"
                      v-if="messageFilter === 'person'"
                    >{{ `(${item.avatar.nickName})` }}</span>
                    <span class="ml-2 caption" v-else>
                      {{
                      `(${item.avatar.email})`
                      }}
                    </span>
                  </v-row>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon v-if="item.check">done</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-col>
            <v-col cols="11" d-flex class="mx-2 err-span" v-if="members.length === 0">
              <slot name="message">
                <v-list-item class="text-xs-center">
                  <span class="mt-5 text-body-1">
                    There is no person is matched with your search pattern or the
                    person you are looking for could not be added to in this
                    situation.
                  </span>
                </v-list-item>
              </slot>
            </v-col>
          </v-list>
        </v-row>
      </v-card>
    </v-col>
  </v-menu>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    members: Array,
    labelSearch: String,
    title: String,
    messageFilter: String
  },
  data() {
    return {
      isShow: "",
      searchQuery: ""
    };
  }
};
</script>
<style scoped>
.icon-close {
  position: absolute;
  right: 5px;
  top: 0px;
}
.err-span {
  width: 310px;
  /* height: 100px; */
}
</style>
