<template>
  <v-row no-gutters class="pa-2">
    <v-col cols="12">
      <v-row no-gutters>
        <v-col sm="3">
          <v-select
            :value="taskDetail.statusWork"
            :items="itemsWorks"
            label="Status Work"
            item-text="name"
            item-value="id"
            class="pa-1"
            return-object
            @change="changeStatusWork"
          ></v-select>
        </v-col>
        <v-col sm="3">
          <v-select
            :value="taskDetail.compelete"
            :items="itemsCompelete"
            label="Completion schedule"
            item-text="name"
            item-value="id"
            class="pa-1"
            return-object
            @change="changeCompelete"
          ></v-select>
        </v-col>
        <v-col sm="3">
          <v-select
            :value="taskDetail.feature"
            :items="itemsFeature"
            label="Feature"
            item-text="name"
            item-value="id"
            class="pa-1"
            return-object
            @change="changeFeature"
          ></v-select>
        </v-col>
        <v-col sm="3">
          <v-text-field
            ref="inputField"
            mask="####"
            :value="taskDetail.estimate"
            class="pa-1"
            label="Estimate"
            @input="changeEtimate"
          >
            <template slot="append">hr(s)</template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  methods: {
    ...mapActions("ht_store/task/detail/description", [
      "getListsFeatureRequest",
      "getListCompeleteRequest",
      "getListsWorksRequest"
    ]),
    changeEtimate(e) {
      this.changeEstimate(e);
    },
    changeFeature(e) {
      this.changeFeature(e);
    },
    changeCompelete(e) {
      this.changeCompelete(e);
    },
    changeStatusWork(e) {
      this.changeStatusWork(e);
    },
    ...mapMutations("ht_store/task/detail/description", [
      "changeEstimate",
      "changeFeature",
      "changeCompelete",
      "changeStatusWork"
    ])
  },
  computed: {
    ...mapGetters("ht_store/task/detail/description", [
      "taskDetail",
      "itemsCompelete",
      "itemsFeature",
      "itemsWorks"
    ])
  },
  mounted() {
    this.getListsFeatureRequest();
    this.getListCompeleteRequest();
    this.getListsWorksRequest();
  }
};
</script>
