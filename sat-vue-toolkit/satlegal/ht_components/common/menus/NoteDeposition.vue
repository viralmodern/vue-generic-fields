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
    @create="addNotes"
    @edit="editNotes"
    @remove="removeNotes"
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
    totalNotes: Number,
    RFPId: Number,
    detail: Boolean
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGet: false,
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/RFP", ["dataNotes", "totalsPageNote", "isShowPaginationNotes"]
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
        totalNotes: this.totalNotes + 1,
        body,
        detail: this.detail
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
    async editNotes({ body, page, id }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          RFPId: this.RFPId,
          noteId: id
        },
        body,
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
    async removeNotes({ page, id }) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        RFPId: this.RFPId,
        noteId: id,
        totalNotes: this.totalNotes - 1,
        detail: this.detail
      };
      await this.removeNotesRFPRequest(data);
      this.getDataNotes(page);
    },
    async getDataNotes(id, page) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          RFPId: this.RFPId
        },
        query: {
          page
        },
      };
      this.isLoadingGet = true;
      await this.getDataNotesRFPRequest(data);
      this.isLoadingGet = false;
    },
    ...mapActions("ht_store/matter/deposition/RFP", [
      "getDataNotesRFPRequest",
      "addNotesRFPRequest",
      "removeNotesRFPRequest",
      "updateNotesRFPRequest",
    ])
  }
};
</script>
