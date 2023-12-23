<template>
  <td>
    <v-tooltip bottom v-if="user">
      <template v-slot:activator="{ on }">
        <UserAvatar
          v-on="on"
          :avatarSize="32"
          :imageUrl="user.avatar.imageUrl || null"
          :name="user.avatar.name || ''"
        />
      </template>
      <span>{{user.avatar.name}}</span>
    </v-tooltip>
  </td>
</template>
<script>
import { mapGetters } from "vuex";
import UserAvatar from "../../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["members"]),
    user() {
      return (
        this.members &&
        this.members.filter(x => x.id === this.dataRow.creator)[0]
      );
    }
  }
};
</script>
