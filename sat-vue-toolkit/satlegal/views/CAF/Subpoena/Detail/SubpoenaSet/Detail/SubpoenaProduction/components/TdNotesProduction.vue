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
    @create="add"
    @edit="editNotes"
    @remove="remove"
    @paging="getDataNotes"
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
    async add({ body, page }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          subpoenaId: this.subpoenaId,
          rowId: this.rowId
        },
        totalNotes: this.totalNotes,
        body
      };
      try {
        this.isLoadingAdd = true;
        await this.addNotes(data);
        this.isLoadingAdd = false;
        this.getDataNotes(page);
        this.$refs.refNotes.closeForm();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async editNotes({ body, page, id }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          subpoenaId: this.subpoenaId,
          rowId: this.rowId,
          noteId: id
        },
        body
      };
      try {
        this.isLoadingAdd = true;
        await this.updateNotes(data);
        await this.getDataNotes(page);
        this.isLoadingAdd = false;
        this.$refs.refNotes.closeForm();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async remove({ id, page }) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        subpoenaId: this.subpoenaId,
        rowId: this.rowId,
        noteId: id,
        totalNotes: this.totalNotes
      };
      await this.removeNotes(data);
      this.getDataNotes(page);
    },
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
      "addNotes",
      "updateNotes",
      "removeNotes"
    ])
  }
};
</script>
