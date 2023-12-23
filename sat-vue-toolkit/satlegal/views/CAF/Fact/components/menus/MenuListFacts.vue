<template>
  <v-menu :close-on-content-click="false" :nudge-width="310" offset-x top>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon>
        <v-icon>mdi-add_circle_outline</v-icon>
      </v-btn>
    </template>
    <v-col cols="12">
      <v-row  no-gutters>
        <v-list style="width:100%">
          <v-col cols="12">
            <v-col cols="12" d-flex>
              <span class="text-xs-center text-h5 pa-1">{{ title }}</span>
            </v-col>
            <v-divider></v-divider>
            <v-row class="mt-2  justify-center" no-gutters>
              <v-col cols="11" style="height: 55px">
                <v-text-field
                  :label="labelSearch"
                  single-line
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" v-for="item in list" :key="item.id" class="my-2">
            <v-list-item avatar ripple @click="$emit('select', item)">
              <v-list-item-content>
                {{ item.title }}
                <div class="text--secondary text-caption">
                  <v-row no-gutters class="align-center">
                    <v-icon small>mdi-access_time</v-icon>
                    &nbsp;{{ item.createAt | formatMMDDYYYY }}
                  </v-row>
                </div>
              </v-list-item-content>
              <UserAvatar
                class="mr-1"
                v-for="user in item.characters"
                :key="user.id"
                :name="user.avatar.name"
                :imageUrl="(user.avatar || {}).imageUrl"
                :avatarSize="32"
              />
              <v-list-item-action>
                <v-icon v-if="item.check">mdi-done</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-col>
        </v-list>
      </v-row>
    </v-col>
  </v-menu>
</template>
<script>
import UserAvatar from "@/sat-vue-toolkit/satlegal/ht_components/avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    list: Array,
    labelSearch: String,
    title: String
  }
};
</script>
<style scoped>
.icon-close {
  position: absolute;
  right: 5px;
  top: 0px;
}
</style>
