<template>
  <v-row no-gutters="" :class="`justify-end`">
    <UserAvatar
      :avatarSize="32"
      class="mx-1"
      v-for="(item, index) in members"
      :key="index"
      :imageUrl="item.avatar && item.avatar.imageUrl"
      :name="item.name"
    />
  </v-row>
</template>

<script>
import UserAvatar from "./UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    members: Array,
    justifyEnd: Boolean
  }
};
</script>
