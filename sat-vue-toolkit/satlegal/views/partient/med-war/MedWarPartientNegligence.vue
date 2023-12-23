<template>
  <v-row no-gutters>
    <v-col>
      <v-row no-gutters class="justify-end">
        <ConfigColunmMedWar />
      </v-row>
    </v-col>
    <v-col cols="12">
      <SlickTable :items="negligences" :headers="headers">
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name)"
            :column="props.column"
            :dataRow="props.dataRow"
            :index="parseInt(props.index) + 1"
            @onChange="editNegligenceRequest($event)"
            @deleteNegligence="removeNegligenceRequest"
          />
        </template>
        <template v-slot:top>
          <v-row justify="end" no-gutters class="ma-2">
            <v-btn color="primary" outlined @click="isShowCreate = true">
              <v-icon class="mr-2">mdi-add_circle</v-icon>
              <span class="hidden-sm-and-down">Add new negligence</span>
            </v-btn>
          </v-row>
        </template>
      </SlickTable>
      <AddNegligence
        :isShow="isShowCreate"
        @closeModal="isShowCreate = false"
        @addNegligence="createNegligenceRequest"
      />
    </v-col>
    <router-view></router-view>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../../ht_components/slick-table/SlickTable2";
import TdView from "../../../ht_components/partient/medWar/TdView";
import TdNegligence from "../../../ht_components/partient/medWar/TdNegligence";
import TdBy from "../../../ht_components/partient/medWar/TdBy";
import TdDate from "../../../ht_components/partient/medWar/TdDate";
import TdInjury from "../../../ht_components/partient/medWar/TdInjury";
import TdInjuryLabel from "../../../ht_components/partient/medWar/TdInjuryLabel";
import TdDamage from "../../../ht_components/partient/medWar/TdDamage";
import TdDamageLabel from "../../../ht_components/partient/medWar/TdDamageLabel";
import TdTag from "../../../ht_components/partient/medWar/TdTag";
import TdAction from "../../../ht_components/partient/medWar/TdAction";
import ConfigColunmMedWar from "../../../ht_components/menus/ConfigColunmMedWar";
import AddNegligence from "../../../ht_components/dialogs/AddNegligence";
export default {
  data() {
    return {
      isShowCreate: false
    };
  },
  components: {
    SlickTable,
    ConfigColunmMedWar,
    AddNegligence
  },
  methods: {
    ...mapActions("ht_store/matter/partient/negligence", [
      "getDataNegligenceRequest",
      "createNegligenceRequest",
      "editNegligenceRequest",
      "removeNegligenceRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/matter/partient/tag", ["getDataTagNegligenceRequest"]),
    ...mapActions("ht_store/matter/partient/damage", ["getDataDamageNegligenceRequest"]),
    ...mapActions("ht_store/matter/partient/injury", ["getDataInjuryNegligenceRequest"]),
    ...mapActions("ht_store/matter/partient/injury/label", [
      "getDataInjuryNegligenceLabelRequest"
    ]),
    ...mapActions("ht_store/matter/partient/damage/label", [
      "getDataDamageNegligenceLabelRequest"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "view") {
        return TdView;
      }
      if (columnName === "negligence") {
        return TdNegligence;
      }
      if (columnName === "by") {
        return TdBy;
      }
      if (columnName === "date") {
        return TdDate;
      }
      if (columnName === "injury") {
        return TdInjury;
      }
      if (columnName === "injuryLabel") {
        return TdInjuryLabel;
      }
      if (columnName === "damage") {
        return TdDamage;
      }
      if (columnName === "damageLabel") {
        return TdDamageLabel;
      }
      if (columnName === "tag") {
        return TdTag;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    }
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
