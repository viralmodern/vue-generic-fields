<template>
  <div class="text-center d-flex align-center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <UserAvatar
            :avatarSize="25"
            :imageUrl="creator.imageUrl"
            :name="creator.name"
          />
        </div>
      </template>
      <span>{{ creator.name }}</span>
    </v-tooltip>
  </div>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
export default {
  props: {
    value: Object,
    members: Array,
    keyText: String
  },
  components: {
    UserAvatar
  },
  computed: {
    creator() {
      return (
        (this.members || []).find(x => x.id === this.value[this.keyText]) || {}
      );
    }
  }
};
</script>
