<template>
  <div>
    <v-tooltip bottom v-for="(user, ii) in listSupported" :key="ii">
      <template v-slot:activator="{ on }">
        <UserAvatar
          v-on="on"
          :avatarSize="30"
          :imageUrl="(user.avatar || {}).imageUrl"
          :name="user.avatar.name"
          class="ma-1"
        />
      </template>
      <span>{{ user.avatar.name }} {{ `(${user.avatar.email})` }}</span>
    </v-tooltip>
  </div>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    listSupported: Array
  }
};
</script>
