<template>
  <td>
    <MenuListMembers
      style="flex-wrap: unset;"
      title="List members"
      :value="dataRow[column.name]"
      :list="members"
      name="members"
      keySearch="name"
      @select="$emit('update', $event)"
    />
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import MenuListMembers from "../../../menus/MenuListMembers";

export default {
  components: {
    MenuListMembers
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["members"])
  }
};
</script>
