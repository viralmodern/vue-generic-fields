<template>
  <NotesType2
    ref="refNotes"
    :notes="dataNotes"
    textTooltip="Add new"
    :totalPagination="totalsPageNote"
    :totalNotes="totalNotes"
    :isShowPagination="isShowPaginationNotes"
    :isLoadingAdd="isLoadingAdd"
    :isLoadingGet="isLoadingGet"
    @onOpenMenu="getDataNotes"
    @create="addNotes"
    @edit="editNotes"
    @remove="removeNotes"
    @paging="getDataNotes"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NotesType2 from "@/components/common/menus/NotesType2";

export default {
  components: {
    NotesType2
  },
  props: {
    totalNotes: Number,
    RFPId: Number
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGet: false,
    };
  },
  computed: {
    ...mapGetters(
      "matter/discovery/deposition/preparation/requestForProduction",
      ["dataNotes", "totalsPageNote", "isShowPaginationNotes"]
    )
  },
  methods: {
    async addNotes({ body, page }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          RFPId: this.RFPId
        },
        body
      };
      try {
        this.isLoadingAdd = true;
        await this.addNotesRFPRequest(data);
        this.isLoadingAdd = false;
        this.getDataNotes(page);
        this.$refs.refNotes.closeForm();
      } catch (error) {
        this.isLoadingAdd = false;
      }

    },
    async editNotes({ body, page }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.depositionId,
          RFPId: this.RFPId
        },
        body
      };
      try {
        this.isLoadingAdd = true;
        await this.updateNotesRFPRequest(data);
        await this.getDataNotes(page);
        this.isLoadingAdd = false;
        this.$refs.refNotes.closeForm();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async removeNotes({ page }) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.depositionId,
        RFPId: this.RFPId
      };
      await this.removeNotesRFPRequest(data);
      this.getDataNotes(page);
    },
    async getDataNotes(page) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          noteId: this.RFPId
        },
        query: {
          page
        },
      };
      this.isLoadingGet = true;
      await this.getDataNotesRFPRequest(data);
      this.isLoadingGet = false;
    },
    ...mapActions("ht_store/matter/discovery/deposition/preparation/requestForProduction", [
      "getDataNotesRFPRequest",
      "addNotesRFPRequest",
      "removeNotesRFPRequest",
      "updateNotesRFPRequest",
    ])
  }
};
</script>
