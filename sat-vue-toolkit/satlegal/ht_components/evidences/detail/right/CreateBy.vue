<template>
  <v-row class="pa-2 align-center" no-gutters>
    <v-col cols="6">
      <span class="subheading font-weight-bold">Created By</span>
    </v-col>
    <v-col cols="6" class="text-xs-center">
      <v-tooltip bottom v-if="dataCreatorJoin">
        <template v-slot:activator="{ on }">
          <UserAvatar
            v-on="on"
            :avatarSize="32"
            :imageUrl="dataCreatorJoin.avatar.imageUrl || null"
            :name="dataCreatorJoin.avatar.name || ''"
          />
        </template>
        <span>{{ dataCreatorJoin.avatar.name }}</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import UserAvatar from "../../../avatars/UserAvatar";

export default {
  components: {
    UserAvatar
  },
  props: {
    creator: Number,
    members: Array
  },
  computed: {
    dataCreatorJoin() {
      return (this.members || []).find(x => x.id === this.creator);
    }
  }
};
</script>
