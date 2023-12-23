<template>
  <td>
    <MenuListTags
      :tag="dataRow[column.name]"
      :tags="dataLabels"
      keyText="name"
      keyColor="color"
      title="List labels"
      nameAdd="Add new labels"
      lengthDisplay="3"
      @add="addLabelsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event})"
      @update="updateLabelsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event})"
      @remove="removeLabelsRequest({matterId:$route.params.matter || $route.params.projectId, id: $event})"
      @chose="$emit('update', $event)"
      @onOpenMenu="callLableRequest"
    />
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/labels", ["dataLabels"])
  },
  methods: {
    ...mapActions("ht_store/matter/labels", [
      "addLabelsRequest",
      "updateLabelsRequest",
      "removeLabelsRequest"
    ]),
    callLableRequest(){
      //here
    }
  }
};
</script>
