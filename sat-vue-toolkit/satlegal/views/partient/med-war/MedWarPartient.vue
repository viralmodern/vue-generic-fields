<template>
  <v-row style="background-color: white" no-gutters>
    <v-col cols="12" sm="3">
      <MenuLeftNegligence />
    </v-col>
    <v-col cols="12" sm="9">
      <div>
        <router-view></router-view>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import MenuLeftNegligence from "../../../ht_components/left-menus/MenuLeftNegligence";
export default {
  data() {
    return {
      isShowCreate: false
    };
  },
  components: {
    MenuLeftNegligence
  },
  methods: {
    ...mapActions("ht_store/matter/partient/negligence", ["getDataNegligenceRequest"]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/matter/partient/tag", ["getDataTagNegligenceRequest"]),
    ...mapActions("ht_store/matter/partient/damage", ["getDataDamageNegligenceRequest"]),
    ...mapActions("ht_store/matter/partient/injury", ["getDataInjuryNegligenceRequest"]),
    ...mapActions("ht_store/matter/partient/injury/label", [
      "getDataInjuryNegligenceLabelRequest"
    ]),
    ...mapActions("ht_store/matter/partient/damage/label", [
      "getDataDamageNegligenceLabelRequest"
    ])
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/negligence", ["negligences"]),
    ...mapGetters("ht_store/slick", ["visibleColumns"]),
    headers() {
      return this.visibleColumns.map(x => ({
        text: x.title,
        value: x.name,
        name: x.name,
        sortable: false
      }));
    }
  },
  mounted() {
    this.getDataNegligenceRequest();
    this.getDataCharacterRequest();
    this.getDataTagNegligenceRequest();
    this.getDataDamageNegligenceRequest();
    this.getDataInjuryNegligenceRequest();
    this.getDataInjuryNegligenceLabelRequest();
    this.getDataDamageNegligenceLabelRequest();
  }
};
</script>
