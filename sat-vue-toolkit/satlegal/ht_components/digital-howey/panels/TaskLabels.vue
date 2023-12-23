<template>
  <v-row no-gutters>
    <v-col>
      <h1>Labels</h1>
      <MenuListTags
        :tag="labels"
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
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    labels: Array,
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
