<template>
  <v-list-item avatar @click="$emit('click')">
    <UserAvatar is-in-list :avatarSize="48" :imageUrl="avatarUrl" :name="fullName"/>
    <v-list-item-content>
      <v-list-item-title>{{fullName}}</v-list-item-title>
      <v-list-item-subtitle v-if="jobTitle">{{jobTitle}}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    avatarUrl: {
      type: String,
      default: ""
    },
    fullName: {
      type: String,
      default: ""
    },
    jobTitle: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.text-caption {
  font-weight: 200;
}
</style>
