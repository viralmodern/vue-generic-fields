<template>
  <v-row no-gutters>
    <v-col class="mt-1 ml-1">
      <UserAvatar
        :name="item.user.fullName"
        :imageUrl="(item.user.avatar || {}).imageUrl"
        :avatarSize="avatarSize"
      />
    </v-col>
    <v-col cols="12" class="ml-2">
      <v-row no-gutters>
        <v-col>
          <span class="subheading font-weight-bold">{{
            item.user.fullName
          }}</span>
          <div class="text-body-1" v-html="changeSpaceComment"></div>
        </v-col>

        <v-row no-gutters class="mt-2">
          <v-col>
            <span
              v-if="!checkLike"
              @click="like"
              class="text-caption-cursor text-caption text--secondary"
              >Like</span
            >
            <span
              v-if="checkLike"
              @click="unlike"
              class="caption-cursor text-caption text--secondary"
              >Unlike</span
            >
            <span
              v-if="!hideReply"
              @click="$emit('showCommentInput')"
              class="caption-cursor text-caption ml-2 text--secondary"
              >Reply</span
            >
            <span class="text-caption ml-2 text--secondary" v-if="item.like">{{
              item.like.length
            }}</span>
            <v-icon size="18" color="primary" class="ml-1">thumb_up</v-icon>
            <TimerLabel :time="item.date" class="ml-2" />
          </v-col>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
import TimerLabel from "../labels/TimerLabel";
export default {
  data() {
    return {
      checkLike: false
    };
  },
  props: {
    item: Object,
    hideReply: Boolean,
    avatarSize: Number
  },
  components: {
    UserAvatar,
    TimerLabel
  },
  methods: {
    like() {
      this.$emit("like", this.item.id);
      this.checkLike = true;
    },
    unlike() {
      this.$emit("unlike", this.item.id);
      this.checkLike = false;
    }
  },
  computed: {
    changeSpaceComment() {
      let rep = this.item.content;
      if (!rep) return rep;
      const names = rep.match(/([@])\w+/g);
      if (names) {
        names.forEach(n => (rep = rep.replace(n, `<a>${n}</a>`)));
      }
      return rep.replace(/\n/g, "<br/>");
    }
  }
};
</script>
<style scoped>
.caption-cursor {
  cursor: pointer !important;
}
</style>
