<template>
  <td>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <UserAvatar :avatarSize="32" :imageUrl="(user.avatar || {}).imageUrl" name="null" v-on="on"/>
      </template>
      <span>{{user.name || ''}}</span>
    </v-tooltip>
  </td>
</template>
<script>
import { mapGetters } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  data() {
    return {
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"]),
    user() {
      return this.members.find(x => x.id === this.dataRow.createBy) || {};
    }
  }
};
</script>
