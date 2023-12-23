<template>
  <v-row no-gutters>
    <v-col>
      <v-row no-gutters class="justify-end">
        <ConfigColunmPractice />
      </v-row>
    </v-col>
    <v-col cols="12">
      <SlickTable :items="practices" :headers="headers">
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name)"
            :column="props.column"
            :dataRow="props.dataRow"
            :index="parseInt(props.index) + 1"
            @onChange="editPracticeRequest($event)"
            @deletePractice="removePracticeRequest"
          />
        </template>
        <template v-slot:top>
          <v-row justify="end" no-gutters class="ma-2">
            <v-btn color="primary" outlined @click="isShowCreate = true">
              <v-icon class="mr-2">mdi-add_circle</v-icon>
              <span class="hidden-sm-and-down">Add new practice</span>
            </v-btn>
          </v-row>
        </template>
      </SlickTable>
      <AddPractice
        :isShow="isShowCreate"
        @closeModal="isShowCreate = false"
        @addPractice="createPracticeRequest"
      />
    </v-col>
    <router-view></router-view>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../../ht_components/slick-table/SlickTable2";
import TdView from "../../../ht_components/partient/practice/TdView";
import TdName from "../../../ht_components/partient/practice/TdName";
import TdBy from "../../../ht_components/partient/practice/TdBy";
import TdDate from "../../../ht_components/partient/practice/TdDate";
import TdInjury from "../../../ht_components/partient/practice/TdInjury";
import TdInjuryLabel from "../../../ht_components/partient/practice/TdInjuryLabel";
import TdTag from "../../../ht_components/partient/practice/TdTag";
import TdAction from "../../../ht_components/partient/practice/TdAction";
import ConfigColunmPractice from "../../../ht_components/menus/ConfigColunmPractice";
import AddPractice from "../../../ht_components/dialogs/AddPractice";
export default {
  data() {
    return {
      isShowCreate: false
    };
  },
  components: {
    SlickTable,
    ConfigColunmPractice,
    AddPractice
  },
  methods: {
    ...mapActions("ht_store/matter/partient/practice", [
      "getDataPracticeRequest",
      "createPracticeRequest",
      "editPracticeRequest",
      "removePracticeRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/matter/partient/tag", ["getDataTagNegligenceRequest"]),
    ...mapActions("ht_store/matter/partient/injury", ["getDataInjuryNegligenceRequest"]),
    ...mapActions("ht_store/matter/partient/injury/label", [
      "getDataInjuryNegligenceLabelRequest"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "view") {
        return TdView;
      }
      if (columnName === "name") {
        return TdName;
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
    ...mapGetters("ht_store/matter/partient/practice", ["practices"]),
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
    this.getDataPracticeRequest();
    this.getDataCharacterRequest();
    this.getDataTagNegligenceRequest();
    this.getDataInjuryNegligenceRequest();
    this.getDataInjuryNegligenceLabelRequest();
  }
};
</script>
