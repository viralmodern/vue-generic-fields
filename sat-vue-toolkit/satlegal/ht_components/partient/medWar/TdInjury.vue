<template>
  <td>
    <MenuListInjury
      :tag="dataRow.injury"
      :tags="injurys"
      keyText="name"
      keyColor="color"
      title="List Injury"
      nameAdd="Add new injury"
      @add="addInjuryRequest"
      @update="updateInjuryRequest"
      @remove="removeInjuryRequest"
      @chose="chooseTag"
    />
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListInjury from "../../menus/MenuListTags";

export default {
  components: {
    MenuListInjury
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/injury", ["injurys"])
  },
  methods: {
    ...mapActions("ht_store/matter/partient/injury", [
      "addInjuryRequest",
      "updateInjuryRequest",
      "removeInjuryRequest"
    ]),
    chooseTag(e) {
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: e
      };
      this.$emit("onChange", data);
    }
  }
};
</script>
