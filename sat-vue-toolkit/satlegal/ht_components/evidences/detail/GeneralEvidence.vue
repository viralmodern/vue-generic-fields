<template>
  <div>
    <div v-if="typeCheckTab !== 'Testimony'">
      <v-row no-gutters class="py-3" v-if="typeCheckTab === 'Hearsay'">
        <v-col cols="12" sm="4" class="text-xs-center">
          <h4 class="mb-2">Veracity</h4>
          <SliderPercent
            :value="items.veracity"
            type="circular"
            @onChange="updateEvidencesRequest({ veracity: $event })"
          />
        </v-col>
        <v-col cols="12" sm="4" class="text-xs-center">
          <h4 class="mb-2">Objectivity</h4>
          <SliderPercent
            :value="items.objectivity"
            type="circular"
            @onChange="updateEvidencesRequest({ objectivity: $event })"
          />
        </v-col>
        <v-col cols="12" sm="4" class="text-xs-center">
          <h4 class="mb-2">Admissibility</h4>
          <SliderPercent
            :value="items.materiality"
            type="circular"
            @onChange="updateEvidencesRequest({ materiality: $event })"
          />
        </v-col>
      </v-row>
      <h3>Description</h3>
      <div class="pa-2">
        <v-textarea
          hide-details
          auto-grow
          :value="items.description"
          @change="updateEvidencesRequest({ description: $event })"
          class="ma-0 pa-2 custom-text-field fieldDes"
          rows="1"
        ></v-textarea>
      </div>
      <h3>Related facts</h3>
      <div class="pa-2">
        <EvidencesRelatedFacts :relatedFacts="items.relatedFacts" />
      </div>
    </div>
    <div v-if="typeCheckTab === 'Evidences'">
      <h3>Presumption</h3>
      <div class="pa-2">
        <v-textarea
          hide-details
          auto-grow
          :value="items.presumption"
          @change="updateEvidencesRequest({ probative: $event })"
          class="ma-0 pa-2 custom-text-field fieldDes"
          rows="1"
        ></v-textarea>
      </div>
      <h3>Probative value</h3>
      <div class="pa-2">
        <v-textarea
          hide-details
          auto-grow
          :value="items.probative"
          @change="updateEvidencesRequest({ probative: $event })"
          class="ma-0 pa-2 custom-text-field fieldDes"
          rows="1"
        ></v-textarea>
      </div>
      <h3>Factor affect</h3>
      <div class="pa-2">
        <FactorAffect
          :list="items.factorAffect"
          label="Factor affect"
          hint="Add new factor affect"
          @add="updateEvidencesRequest({ factorAffect: $event })"
          @update="updateEvidencesRequest({ factorAffect: $event })"
          @remove="updateEvidencesRequest({ factorAffect: $event })"
        />
      </div>
      <h3>Result of evidence</h3>
      <div class="pa-2">
        <ResultOfEvidence
          :list="items.resultOfEvidence"
          label="Result of evidence"
          hint="Add new result of evidence"
          @add="updateEvidencesRequest({ resultOfEvidence: $event })"
          @update="updateEvidencesRequest({ resultOfEvidence: $event })"
          @remove="updateEvidencesRequest({ resultOfEvidence: $event })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EvidencesRelatedFacts from "./EvidencesRelatedFacts";
import FactorAffect from "../../inputs/AddListItem";
import ResultOfEvidence from "../../inputs/AddListItem";
import SliderPercent from "../../menus/SliderPercent";

export default {
  components: {
    EvidencesRelatedFacts,
    FactorAffect,
    ResultOfEvidence,
    SliderPercent
  },
  props: {
    items: Object,
    typeCheckTab: String
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/evidences/detail", [
      "updateEvidencesRequest"
    ])
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.fieldDes {
  background: #eceff1;
}
.theme--dark.fieldDes {
  background: #909090;
}
</style>
