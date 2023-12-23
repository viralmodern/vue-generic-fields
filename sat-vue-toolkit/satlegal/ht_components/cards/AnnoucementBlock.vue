<template>
  <v-card>
    <v-card-text>
      <v-row no-gutters="">
        <div class="mr-3">
          <UserAvatar
            :name="user.name"
            :imageUrl="(user.avatar || {}).imageUrl"
            :avatarSize="40"
          />
        </div>
        <div>
          <div>
            <span class="title">{{ user.name + " " }}</span>
            <TimerLabel :time="createdDate" />
          </div>
          <div class="mt-2" v-html="content"></div>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import UserAvatar from "../avatars/UserAvatar";
import TimerLabel from "../labels/TimerLabel";
export default {
  components: {
    UserAvatar,
    TimerLabel
  },
  props: {
    user: { type: Object, default: () => ({}) },
    content: String,
    createdDate: String
  }
};
</script>
