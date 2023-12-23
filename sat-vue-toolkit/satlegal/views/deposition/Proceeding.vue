<template>
  <v-row no-gutters>
    <v-col cols="12" class="text-xs-right">
      <v-btn
        v-if="display === 'Question Status'"
        @click="displayShow(false)"
        icon
      >
        <v-icon>mdi-view_module</v-icon>
      </v-btn>
      <v-btn v-if="display === 'Slickgrid'" @click="displayShow(true)" icon>
        <v-icon>mdi-view_list</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12">
      <ProceesdingSlickgrid v-if="display === 'Slickgrid'" />
      <ViewQuestionStatus
        v-if="display === 'Question Status'"
        :proceeding_items="proceeding_items"
        :dataList="dataList"
        :dataQuestions="dataQuestions"
        @toggle="toggle"
        @addList="addList"
        @addTask="addTask"
        @updateQuestions="updateQuestions"
        @getListFromApi="getProceeding"
      />
    </v-col>
  </v-row>
</template>
<script>
import ProceesdingSlickgrid from "../../ht_components/deposition/proceeding/viewGrid/ProceesdingSlickgrid";
import ViewQuestionStatus from "../../ht_components/deposition/proceeding/viewQuestion/Home";

import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ViewQuestionStatus,
    ProceesdingSlickgrid
  },
  data() {
    return {
      display: "Slickgrid"
    };
  },
  methods: {
    displayShow(type) {
      this.display = !type === true ? "Slickgrid" : "Question Status";
    },
    ...mapActions("ht_store/matter/discovery/deposition/proceeding", [
      "getProceeding",
      "toggle",
      "addList",
      "addTask",
      "updateQuestions"
    ])
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/proceeding", [
      "proceeding_items",
      "dataList",
      "dataQuestions"
    ])
  },
  mounted() {
    this.getProceeding({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      depositionId: this.$route.params.depositionId
    });
  }
};
</script>
