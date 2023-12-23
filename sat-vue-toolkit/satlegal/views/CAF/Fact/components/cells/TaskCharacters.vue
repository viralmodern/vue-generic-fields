<template>
  <td>
    <MenuListMembers
      style="flex-wrap: unset;"
      title="List Characters"
      :value="dataRow.characters"
      :list="characters"
      name="Characters"
      keySearch="name"
      @select="update"
    />
  </td>
</template>

<script>
import { mapActions } from "vuex";
import MenuListMembers from "../../../menus/MenuListMembers";

export default {
  components: {
    MenuListMembers
  },
  props: {
    dataRow: Object,
    column: Object,
    characters: Array
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["updateTask"]),
    update(idMembers) {
      const data = {
        taskId: this.dataRow.id,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        body: {
          characters: idMembers
        }
      };
      this.updateTask(data);
    }
  }
};
</script>
