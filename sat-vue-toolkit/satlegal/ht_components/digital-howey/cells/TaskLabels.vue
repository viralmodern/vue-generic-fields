<template>
  <td>
    <MenuListTags
      :tag="dataRow[column.name]"
      :tags="dataLabels"
      keyText="text"
      keyColor="color"
      title="List label"
      nameAdd="Add new"
      @add="addLabelsRequest"
      @update="updateLabelsRequest"
      @remove="removeLabelsRequest"
      @chose="$emit('update', $event)"
    />
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task/labels", ["dataLabels"])
  },
  methods: {
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task/labels", [
      "addLabelsRequest",
      "updateLabelsRequest",
      "removeLabelsRequest"
    ])
  }
};
</script>
