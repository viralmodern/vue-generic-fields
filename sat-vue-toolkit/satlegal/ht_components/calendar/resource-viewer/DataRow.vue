<template>
  <v-row no-gutters class="data-row" :style="[backgroundStyle, positionStyle]">
    <div class="data-avatar">
      <UserAvatar
        v-if="type === 1"
        :avatarSize="28"
        :imageUrl="(member.avatar || {}).imageUrl"
        :name="member.name"
      />
    </div>
    <v-col class="row-info pl-1 pr-3">
      <div class="white--text">{{ displayText }}</div>
      <v-progress-linear
        class="ma-0"
        color="white"
        height="3"
        :value="progress"
      ></v-progress-linear>
    </v-col>
  </v-row>
</template>

<script>
import UserAvatar from "../../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    backgroundColor: String,
    type: Number, // 0 is project, 1 is member
    member: Object,
    progress: Number, // percent: 0 to 100
    position: {
      type: Object,
      default: () => ({ x: "0px", y: "0px" })
    },
    width: String,
    calendarType: Number // 0: daily, 1: weekly, 2 monthly
  },
  computed: {
    displayText() {
      if (this.type === 0) {
        return `#${this.member.code}`;
      }
      return `@${this.member.code}`;
    },
    backgroundStyle() {
      if (!this.backgroundColor) return null;
      return {
        backgroundColor: this.backgroundColor
      };
    },
    positionStyle() {
      return {
        top: this.position.y,
        left: this.position.x,
        width: this.width
      };
    }
  }
};
</script>

<style scoped>
.data-row {
  background-color: blue;
  height: 32px;
  position: absolute;
  border-radius: 15px;
  z-index: 1;
}
.data-avatar {
  padding: 2px;
  min-width: 10px;
}
</style>
