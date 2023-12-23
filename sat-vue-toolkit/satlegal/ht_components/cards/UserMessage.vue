<template>
  <v-card>
    <v-card-text>
      <v-row no-gutters>
        <div class="mr-2">
          <UserAvatarWithOnlineStatus
            :name="user.fullname"
            :imageUrl="user.avatar"
            :avatarSize="40"
            :status="userOnlineStatus"
          />
        </div>
        <v-col>
          <v-row no-gutters class="align-center justify-space-between">
            <h3>{{ user.fullName }}</h3>
            <TimeLable :time="commentDate" />
          </v-row>
          <v-row no-gutters class="mt-1">
            <span v-html="changeSpaceComment"></span>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import UserAvatarWithOnlineStatus from "../avatars/UserAvatarWithOnlineStatus";
import TimeLable from "../labels/TimerLabel";

export default {
  props: {
    user: Object,
    userOnlineStatus: String,
    comment: String,
    commentDate: String,
    mentions: Array
  },
  components: {
    UserAvatarWithOnlineStatus,
    TimeLable
  },
  computed: {
    changeSpaceComment() {
      let rep = this.comment;
      if (!rep) return rep;
      const names = rep.match(/@->user#\b\d+\b/gm);
      if (names) {
        names.forEach(n => {
          const data =
            this.mentions.find(x => x.id == n.split("#")[1]) || {};
          rep = rep.replace(n, `<a>${data.displayName}</a>`);
        });
      }
      return rep.replace(/\n/g, "<br/>");
    }
  }
};
</script>
