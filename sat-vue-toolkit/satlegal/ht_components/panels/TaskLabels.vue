<template>
  <v-row no-gutters>
    <v-col>
      <h1>Labels</h1>
      <ProjectLabels
        :labels="dataLabels"
        :listLabels="dataListLabel"
        @addLabel="addLabels"
        @updateLabel="updateLabels"
        @removeLabel="removelabels"
        @choseLabel="choseLabel"
        title="Create Label"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import ProjectLabels from "../cards/ProjectLabels";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    ProjectLabels
  },
  computed: {
    ...mapGetters("ht_store/task/detail/labels", ["dataListLabel", "dataLabels"])
  },
  methods: {
    ...mapActions("ht_store/task/detail/labels", [
      "getDataLabelsRequest",
      "getDataListLabelRequest"
    ]),
    ...mapMutations("ht_store/task/detail/labels", [
      "addLabels",
      "updateLabels",
      "removelabels",
      "choseLabel"
    ])
  },
  mounted() {
    this.getDataLabelsRequest();
    this.getDataListLabelRequest();
  }
};
</script>

