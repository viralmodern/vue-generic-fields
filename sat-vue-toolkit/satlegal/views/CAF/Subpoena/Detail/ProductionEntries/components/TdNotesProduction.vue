<template>
  <Notes
    ref="refNotes"
    :notes="dataNotes"
    textTooltip="Add new"
    :totalPagination="totalsPageNote"
    :totalNotes="totalNotes"
    :isShowPagination="isShowPaginationNotes"
    :isLoadingAdd="isLoadingAdd"
    :isLoadingGet="isLoadingGet"
    @onOpenMenu="getDataNotes"
    @paging="getDataNotes"
    :isDisabled="true"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Notes from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Notes";
export default {
  components: {
    Notes
  },
  props: {
    totalNotes: [String, Number],
    subpoenaId: [String, Number],
    rowId: [String, Number],
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGet: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/subpoena/subpoenaProduction", [
      "dataNotes",
      "totalsPageNote",
      "isShowPaginationNotes"
    ])
  },
  methods: {
    async getDataNotes(page) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          subpoenaId: this.subpoenaId,
          rowId: this.rowId
        },
        query: {
          page
        }
      };
      this.isLoadingGet = true;
      await this.getNotes(data);
      this.isLoadingGet = false;
    },
    ...mapActions("ht_store/matter/subpoena/subpoenaProduction", [
      "getNotes",
    ])
  }
};
</script>
