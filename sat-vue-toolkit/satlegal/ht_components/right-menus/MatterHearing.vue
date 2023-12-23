<template>
  <v-list dense>
    <v-container class="pa-2">
      <v-row class="align-center justify-space-between">
        <h2>Matter Hearing</h2>
        <v-btn @click="isShowCreateMatterHearing = true" class="ma-0" icon>
          <v-icon>mdi-add</v-icon>
        </v-btn>
      </v-row>
      <FormMatterHearing
        :isShow="isShowCreateMatterHearing"
        titlePopup="Create Matter Hearing"
        submitName="Add"
        @submit="createMatterHearing"
        @closeModal="isShowCreateMatterHearing = false"
      />
    </v-container>
    <v-divider></v-divider>
    <v-col v-for="item in dataMatterHearing" :key="item.id">
      <ItemMatterHearing :item="item" @editItem="editItem(item)" />
    </v-col>
    <v-divider></v-divider>
    <v-col>
      <MatterHearingDetail
        :itemEdit="itemEdit"
        :isShow="isShowMatterHearingDetail"
        @closeModal="
          isShowMatterHearingDetail = false;
          itemEdit = {};
        "
      />
    </v-col>
  </v-list>
</template>
<script>
import ItemMatterHearing from "../cards/ItemMatterHearing";
import FormMatterHearing from "../dialogs/FormMatterHearing";
import MatterHearingDetail from "../dialogs/MatterHearingDetail";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isShowCreateMatterHearing: false,
      isShowUpdateMatterHearing: false,
      isShowMatterHearingDetail: false,
      itemEdit: {}
    };
  },
  components: {
    ItemMatterHearing,
    FormMatterHearing,
    MatterHearingDetail
  },
  computed: {
    ...mapGetters("ht_store/matter/hearing", ["dataMatterHearing"])
  },
  methods: {
    createMatterHearing(value) {
      const data = {
        id: Math.random(),
        ...value,
        worklog: [],
        checklist: [],
        notes: [],
        analysis: {
          highlight: [],
          assessment: ""
        }
      };
      this.createMatterHearingRequest(data);
      this.isShowCreateMatterHearing = false;
    },
    editItem(item) {
      this.itemEdit = item;
      this.isShowMatterHearingDetail = true;
    },
    ...mapActions("ht_store/matter", ["getDataMatterRequest"]),
    ...mapActions("ht_store/matter/hearing", [
      "getDataMatterHearingRequest",
      "createMatterHearingRequest"
    ])
  },
  mounted() {
    this.getDataMatterRequest();
    this.getDataMatterHearingRequest();
  }
};
</script>
