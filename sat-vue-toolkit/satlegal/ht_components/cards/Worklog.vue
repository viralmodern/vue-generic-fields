<template>
  <v-card class="my-2">
    <v-card-text>
      <v-row no-gutters>
        <div class="mr-3">
          <UserAvatar
            :name="user.name"
            :imageUrl="(user.avatar || {}).imageUrl"
            :avatarSize="40"
          />
        </div>
        <div>
          <div>
            <span class="title">{{ user.name }}</span>
            <span class="caption ml-2 text--secondary">Logged work —</span>
            <TimerLabel :time="createdDate" />
          </div>
          <div class="mt-1">
            <p class="ma-0">
              Time spent:
              <strong>{{ timeSpentToDisplay }}</strong>
            </p>
            <blockquote
              class="ma-0 caption text--secondary"
              v-html="toBeNoComment | richTextToHtml"
            />
          </div>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import UserAvatar from "../avatars/UserAvatar";
import TimerLabel from "../labels/TimerLabel";
import { richTextToHtml } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"
export default {

  components: {
    UserAvatar,
    TimerLabel
  },
  props: {
    user: { type: Object, default: () => ({}) },
    createdDate: String,
    comment: String,
    timeSpent: Number
  },
  computed: {
    toBeNoComment() {
      return this.comment || "(no comment)";
    },
    timeSpentToDisplay() {
      const hr = Math.floor(this.timeSpent / 60);
      const mins = this.timeSpent % 60;
      return `${hr}h${mins ? ` ${mins}m` : ``}`;
    }
  }
};
</script>
