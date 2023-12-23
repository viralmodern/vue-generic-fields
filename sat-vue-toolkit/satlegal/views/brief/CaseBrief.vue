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
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this item credit card ?"
    />
  </v-col>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ConfirmItem from "../../ht_components/dialogs/ConfirmItem";
import ListOfThreeLevels from "../../ht_components/cards/ListOfThreeLevels";

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
    ...mapActions("ht_store/matter/briefcase/casebrief", [
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
    ...mapGetters("ht_store/matter/briefcase/casebrief", ["dataCaseBrief"])
  },
  mounted() {
    this.getDataCaseBrief();
  }
};
</script>
