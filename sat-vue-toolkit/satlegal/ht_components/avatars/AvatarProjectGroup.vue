<template>
  <v-row no-gutters>
    <v-btn icon @click="$emit('delete')" class="pa-0">
      <AvatarUser :imageUrl="imageUrl" :name="name" :avatarSize="avatarSize" />
    </v-btn>
  </v-row>
</template>
<script>
import AvatarUser from "./UserAvatar";
export default {
  props: {
    imageUrl: String,
    name: String,
    avatarSize: Number
  },
  components: {
    AvatarUser
  }
};
</script>
