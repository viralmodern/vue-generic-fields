<template>
  <v-card :style="`border: ${items.color} solid 4px`">
    <v-row no-gutters>
      <v-col>
        <v-card-title primary-title>
          <div class="text-body-2">{{ items.title }}</div>
        </v-card-title>
      </v-col>
    </v-row>
    <v-divider light></v-divider>
    <v-card-actions class="pa-3">
      <v-tooltip bottom v-for="(e, index) in items.user" :key="index">
        <UserAvatar
          v-slot:activator="{ on }"
          :avatarSize="35"
          :imageUrl="(e.avatar || {}).imageUrl"
          :name="e.avatar.name"
          class="ma-1"
          v-on="on"
        />
        <span>{{ e.avatar.name }} {{ `(${e.avatar.email})` }}</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    items: Object
  }
};
</script>
