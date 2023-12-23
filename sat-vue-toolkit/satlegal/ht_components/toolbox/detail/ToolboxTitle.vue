<template>
  <v-row no-gutters class="align-center">
    <v-col cols="6">
      <v-text-field
        hide-details
        :value="title"
        class="ma-0 pa-0 custom-text-field"
        @change="$emit('updateToolboxRequest', { name: $event })"
      ></v-text-field>
      <span class="text--secondary mt-1">{{ date }}</span>
    </v-col>
    <v-col cols="6">
      <v-row right no-gutters>
        <MenuListMembers
          title="List members"
          :value="dataMembers"
          :list="members.filter(x => x.id !== currentUser.pk)"
          name="members"
          keySearch="name"
          @select="$emit('updateToolboxRequest', { members: $event })"
        />
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import MenuListMembers from "../../menus/MenuListMembers";

import { mapGetters } from "vuex";
export default {
  components: {
    MenuListMembers
  },
  props: {
    title: String,
    date: String,
    dataMembers: Array
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/user", ["currentUser"])
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 20px;
  font-weight: 500;
}
</style>
