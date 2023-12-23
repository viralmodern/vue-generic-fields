<template>
  <td>
    <MenuListInjury
      :tag="dataRow.injuryLabel"
      :tags="label"
      keyText="name"
      keyColor="color"
      title="List Injury"
      nameAdd="Add new injury label"
      @add="addInjuryLabelRequest"
      @update="updateInjuryLabelRequest"
      @remove="removeLabelInjurysRequest"
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
    ...mapGetters("ht_store/matter/partient/injury/label", ["label"])
  },
  methods: {
    ...mapActions("ht_store/matter/partient/injury/label", [
      "addInjuryLabelRequest",
      "updateInjuryLabelRequest",
      "removeLabelInjurysRequest"
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
