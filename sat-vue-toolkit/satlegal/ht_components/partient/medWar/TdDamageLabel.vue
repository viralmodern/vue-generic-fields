<template>
  <td>
    <MenuListDamage
      :tag="dataRow.damageLabel"
      :tags="labels"
      keyText="name"
      keyColor="color"
      title="List Damage"
      nameAdd="Add new damage label"
      @add="addDamageLabelRequest"
      @update="updateDamageLabelRequest"
      @remove="removeLabelDamagesRequest"
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
    ...mapGetters("ht_store/matter/partient/damage/label", ["labels"])
  },
  methods: {
    ...mapActions("ht_store/matter/partient/damage/label", [
      "addDamageLabelRequest",
      "updateDamageLabelRequest",
      "removeLabelDamagesRequest"
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
