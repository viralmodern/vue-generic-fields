<template>
  <v-card>
    <v-card-text class="pa-0">
      <div class="layout ma-0 align-center row">
        <UserAvatar :imageUrl="imageUrl" :avatarSize="40" :name="name" />
        <div class="flex ml-2">
          <div class="heading">{{ name }}</div>
          <span v-if="!!department" class="caption"
            >On&nbsp;
            <router-link :to="department.link">{{
              department.name
            }}</router-link>
          </span>
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
    department: Object
  }
};
</script>

<style scoped></style>
