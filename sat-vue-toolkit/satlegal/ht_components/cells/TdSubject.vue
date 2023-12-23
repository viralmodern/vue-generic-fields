<template>
  <td>
    <MenuListTags
      :tag="dataRow[column.name]"
      :tags="dataSubjects"
      keyText="name"
      keyColor="color"
      title="List subject"
      nameAdd="Add new subject"
      lengthDisplay="3"
      @add="addSubjectsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event})"
      @update="updateSubjectsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event})"
      @remove="removeSubjectsRequest({matterId:$route.params.matter || $route.params.projectId, id: $event})"
      @chose="$emit('update', $event)"
      @onOpenMenu="callSubjectRequest"
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
    ...mapGetters("ht_store/matter/subjects", ["dataSubjects"])
  },
  methods: {
    ...mapActions("ht_store/matter/subjects", [
      "addSubjectsRequest",
      "updateSubjectsRequest",
      "removeSubjectsRequest"
    ]),
    callSubjectRequest(){
      //here
    }
  }
};
</script>
