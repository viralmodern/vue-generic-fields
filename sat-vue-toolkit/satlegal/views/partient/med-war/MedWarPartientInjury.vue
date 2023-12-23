<template>
  <v-row no-gutters>
    <v-col>
      <v-row no-gutters class="justify-end">
        <ConfigColunmInjury />
      </v-row>
    </v-col>
    <v-col cols="12">
      <SlickTable :items="injurys" :headers="headers">
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name)"
            :column="props.column"
            :dataRow="props.dataRow"
            :index="parseInt(props.index) + 1"
            @onChange="editInjuryRequest($event)"
            @deleteInjury="removeInjuryRequest"
          />
        </template>
        <template v-slot:top>
          <v-row justify="end" no-gutters class="ma-2">
            <v-btn color="primary" outlined @click="isShowCreate = true">
              <v-icon class="mr-2">mdi-add_circle</v-icon>
              <span class="hidden-sm-and-down">Add new injury</span>
            </v-btn>
          </v-row>
        </template>
      </SlickTable>
      <AddInjury
        :isShow="isShowCreate"
        @closeModal="isShowCreate = false"
        @addNegligence="addInjuryRequest"
      />
    </v-col>
    <router-view></router-view>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../../ht_components/slick-table/SlickTable2";
import TdView from "../../../ht_components/partient/injury/TdView";
import TdInjuryLabel from "../../../ht_components/partient/injury/TdInjuryLabel";
import TdDamage from "../../../ht_components/partient/injury/TdDamage";
import TdDate from "../../../ht_components/partient/injury/TdDate";
import TdResposiblity from "../../../ht_components/partient/injury/TdResposiblity";
import TdTag from "../../../ht_components/partient/injury/TdTag";
import ConfigColunmInjury from "../../../ht_components/menus/ConfigColunmInjury";
import TdDamageLabel from "../../../ht_components/partient/injury/TdDamageLabel";
import TdCausedBy from "../../../ht_components/partient/injury/TdCausedBy";
import TdAction from "../../../ht_components/partient/injury/TdAction";
import TdName from "../../../ht_components/partient/injury/TdName";
import TdLinkedRecord from "../../../ht_components/partient/injury/TdLinkedRecord";
import AddInjury from "../../../ht_components/dialogs/AddInjury";
export default {
  data() {
    return {
      isShowCreate: false
    };
  },
  components: {
    SlickTable,
    ConfigColunmInjury,
    AddInjury
  },
  methods: {
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/matter/partient/tag", ["getDataTagNegligenceRequest"]),
    ...mapActions("ht_store/matter/partient/damage", ["getDataDamageNegligenceRequest"]),
    ...mapActions("ht_store/matter/partient/injury", [
      "getDataInjuryNegligenceRequest",
      "updateInjuryRequest",
      "addInjuryRequest",
      "editInjuryRequest",
      "removeInjuryRequest"
    ]),
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
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "causedBy") {
        return TdCausedBy;
      }
      if (columnName === "damage") {
        return TdDamage;
      }
      if (columnName === "date") {
        return TdDate;
      }
      if (columnName === "responsiblity") {
        return TdResposiblity;
      }
      if (columnName === "injuryLabel") {
        return TdInjuryLabel;
      }
      if (columnName === "damageLabel") {
        return TdDamageLabel;
      }
      if (columnName === "tags") {
        return TdTag;
      }
      if (columnName === "linkedRecode") {
        return TdLinkedRecord;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/injury", ["injurys"]),
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
    this.getDataCharacterRequest();
    this.getDataTagNegligenceRequest();
    this.getDataDamageNegligenceRequest();
    this.getDataInjuryNegligenceRequest();
    this.getDataInjuryNegligenceLabelRequest();
    this.getDataDamageNegligenceLabelRequest();
  }
};
</script>
