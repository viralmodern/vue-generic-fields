<template>
  <div>
    <MenuListTags
      :tag="item"
      :tags="dataSubjects"
      keyText="name"
      keyColor="color"
      title="List subject"
      nameAdd="Add new subject"
      lengthDisplay="3"
      @add="addSubjectsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event})"
      @update="updateSubjectsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event})"
      @remove="removeSubjectsRequest({matterId:$route.params.matter || $route.params.projectId, id: $event})"
      @chose="choose"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    item: Array
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
    ...mapActions("ht_store/matter/references/detail", ["updateReferencesRequest"]),
    choose(e) {
      const data = {
        column: 'subject_master',
        value: e
      };
      this.updateReferencesRequest(data);
    }
  }
};
</script>
