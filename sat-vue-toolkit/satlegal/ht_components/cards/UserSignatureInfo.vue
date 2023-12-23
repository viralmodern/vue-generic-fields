<template>
  <v-card>
    <v-card-text class="pa-0">
      <div class="layout ma-0 align-center row">
        <UserAvatar :imageUrl="imageUrl" :avatarSize="40" :name="name" />
        <div class="flex ml-2">
          <div class="subheading">{{ name }}</div>
          <div v-if="!!role" class="text--secondary">As {{ role }}</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    imageUrl: String,
    name: String,
    role: String
  }
};
</script>

<style scoped></style>
