<template>
  <v-card-text class="chat-room--list pa-3">
    <template v-for="(item, index) in messageContent">
      <div :key="index">
        <v-row class="mt-2" no-gutters>
          <UserAvatar
            :avatarSize="35"
            :imageUrl="item.sender.avatar.imageUrl"
            :name="item.sender.avatar.name"
          />
          <v-col cols="12" class="ml-2">
            <v-row no-gutters class="justify-space-between">
              <div class="font-weight-bold">{{ item.sender.name }}</div>
              <div class="caption px-2 text--secondary">
                {{ new Date(item.created).toLocaleString() }}
                <v-icon
                  class="mouse-icon"
                  @click="$emit('essentialTick', item)"
                  small
                  :color="item.isTick === true ? 'yellow' : ''"
                  >{{ item.isTick === true ? "star" : "star_border" }}</v-icon
                >

                <v-icon v-if="item.sender.id !== myId" class="mouse-icon" small
                  >reply</v-icon
                >
              </div>
            </v-row>
            <div :value="true" v-html="item.content.text"></div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-divider v-if="!(index === messageContent.length - 1)"></v-divider>
      </div>
    </template>
  </v-card-text>
</template>
<script>
import UserAvatar from "../../../../ht_components/avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    messageContent: Array,
    myId: Number
  }
};
</script>
<style scoped>
.imessage {
  margin-bottom: 0px !important;
  border-radius: 10px;
  padding: 10px;
}
.messaging--body /deep/ p {
  margin-bottom: 0px !important;
}
.mouse-icon {
  cursor: pointer;
}
</style>
