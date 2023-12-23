<template>
  <div>
    <h3>Description</h3>
    <div class="pa-2">
      <v-textarea
        hide-details
        auto-grow
        :value="item.description"
        @change="updateNegligenceRequest({description : $event })"
        class="ma-0 pa-2 custom-text-field fieldDes"
        rows="1"
      ></v-textarea>
    </div>
    <div class="pa-2">
      <FactorAffect
        :list="item.factorAffect"
        label="Factor affect"
        hint="Add new factor affect"
        @add="updateNegligenceRequest({factorAffect: $event})"
        @update="updateNegligenceRequest({factorAffect: $event})"
        @remove="updateNegligenceRequest({factorAffect: $event})"
      />
    </div>
    <v-col class="pa-2">
      <v-row class="align-center" no-gutters>
        <v-col cols="6" class="px-2">
          <v-select
            :items="listStandardPractice"
            label="Standard practice"
            item-text="name"
            item-value="id"
          ></v-select>
        </v-col>
        <v-col cols="6" class="px-2">
          <v-select
            :items="listNegligenceEvidence"
            label="Negligence evidence"
            item-text="name"
            item-value="id"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { listStandardPractice, listNegligenceEvidence } from "../../config";
import FactorAffect from "../inputs/AddListItemNegligence";
export default {
  data() {
    return {
      listNegligenceEvidence,
      listStandardPractice
    };
  },
  props: {
    item: Object
  },
  components: {
    FactorAffect
  },
  methods: {
    ...mapActions("ht_store/matter/partient/negligence/detail", [
      "updateNegligenceRequest"
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
