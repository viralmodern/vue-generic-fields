<template>
  <UserAvatar
    :isInList="isInList"
    :backgroundColor="backgroundColor"
    :imageUrl="imageUrl"
    :name="name"
    :avatarSize="avatarSize"
    style="overflow: unset;"
  >
    <div :class="`status-user ${onlineClass}`"/>
  </UserAvatar>
</template>
<script>
import UserAvatar from "./UserAvatar";
export default {
  props: {
    avatarSize: Number,
    backgroundColor: {
      type: String,
      default: "primary"
    },
    imageUrl: String,
    name: String,
    isInList: { type: Boolean, default: false },
    status: String
  },
  components: {
    UserAvatar
  },
  computed: {
    showAvatar() {
      return !!this.imageUrl;
    },
    nameSymbol: function() {
      if (this.imageUrl) return null;
      if (!this.name.trim().length) return "";
      let words = this.name.split(" ");
      if (words.length == 1) {
        return this.name.substring(0, 2).toUpperCase();
      }
      return (words[0][0] + "" + words[words.length - 1][0]).toUpperCase();
    },
    onlineClass() {
      return this.status === "online"
        ? "success"
        : this.status === "offline"
        ? "grey"
        : "error";
    }
  }
};
</script>
<style scoped>
.image-avatar-status {
  position: relative;
}

.status-user {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white !important;
}
</style>

