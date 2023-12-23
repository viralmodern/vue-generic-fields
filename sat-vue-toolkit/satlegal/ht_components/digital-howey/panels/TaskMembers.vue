<template>
  <v-row no-gutters>
    <v-col cols="12">
      <h1>Members</h1>
    </v-col>
    <MenuListMembers
      style="flex-wrap: unset;"
      title="List members"
      :value="dataMembers"
      :list="members"
      name="members"
      keySearch="name"
      @select="$emit('update', $event)"
    />
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import MenuListMembers from "../../menus/MenuListMembers";

export default {
  components: {
    MenuListMembers
  },
  props: {
    dataMembers: Array
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"])
  }
};
</script>
