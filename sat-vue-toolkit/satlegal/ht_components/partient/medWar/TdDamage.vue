<template>
  <td>
    <MenuListDamage
      :tag="dataRow.damage"
      :tags="damages"
      keyText="name"
      keyColor="color"
      title="List Damage"
      nameAdd="Add new damage"
      @add="addDamagesRequest"
      @update="updateDamagesRequest"
      @remove="removeDamagesRequest"
      @chose="chooseTag"
    />
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListDamage from "../../menus/MenuListTags";

export default {
  components: {
    MenuListDamage
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/damage", ["damages"])
  },
  methods: {
    ...mapActions("ht_store/matter/partient/damage", [
      "addDamagesRequest",
      "updateDamagesRequest",
      "removeDamagesRequest"
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
