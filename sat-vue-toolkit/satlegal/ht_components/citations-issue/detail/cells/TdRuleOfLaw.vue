<template>
  <td>
    <MenuListTags
      :tag="dataRow[column.name]"
      :tags="dataRuleOfLaw"
      keyText="name"
      keyColor="color"
      title="List Rule"
      nameAdd="Add new"
      @add="addRuleOfLawRequest"
      @update="updateRuleOfLawRequest"
      @remove="removeRuleOfLawRequest"
      @chose="$emit('update', $event)"
    />
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../../../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/citations/ruleOfLaw", ["dataRuleOfLaw"])
  },
  methods: {
    ...mapActions("ht_store/matter/citations/ruleOfLaw", [
      "addRuleOfLawRequest",
      "updateRuleOfLawRequest",
      "removeRuleOfLawRequest"
    ])
  }
};
</script>
