<template>
  <v-col cols="12">
    <ListOfThreeLevels
      v-for="item in dataCaseBrief"
      :key="item.id"
      :groupName="item.name"
      :item="item"
      :list="item.children"
      @add="createItemCaseBrief"
      @updateItem="updateItem"
      @removeItem="deleteConfirm"
    />
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="remove"
      @cancel="isShowPopup= false"
      messageConfirm="Are you sure you want to delete this item credit card ?"
    />
  </v-col>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ConfirmItem from "../dialogs/ConfirmItem";
import ListOfThreeLevels from "../cards/ListOfThreeLevels";

export default {
  components: {
    ListOfThreeLevels,
    ConfirmItem
  },
  data() {
    return {
      isShowPopup: false,
      objDelete: null
    };
  },
  methods: {
    ...mapActions("ht_store/matter/citations/detail/casebrief", [ // eslint-disable-line
      "getDataCaseBrief",
      "updateItem",
      "createItemCaseBrief",
      "removeItem"
    ]),
    deleteConfirm(item) {
      this.objDelete = item;
      this.isShowPopup = true;
    },
    remove() {
      this.removeItem(this.objDelete);
      this.isShowPopup = false;
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/citations/detail/casebrief", ["dataCaseBrief"]) // eslint-disable-line
  },
  mounted() {
    this.getDataCaseBrief();
  }
};
</script>
