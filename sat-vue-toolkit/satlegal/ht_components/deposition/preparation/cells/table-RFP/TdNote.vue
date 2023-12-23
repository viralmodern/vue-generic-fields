<template>
  <td>
    <Notes
      ref="refNotes"
      :totalPagination="totalsPageNote"
      :isShowPagination="isShowPaginationNotes"
      :totalNotes="totalNotes"
      :notes="dataNotes"
      :isLoadingAdd="isLoadingAdd"
      @create="addNotes"
      @edit="editNotes"
      @remove="removeNotes"
      @paging="getDataNotes"
      @showModal="getDataNotes"
    />
  </td>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Notes from "../../../../common/Notes";
export default {
  components: {
    Notes
  },
  props: {
    dataRow: Object,
    column: Object,
    matterId: [String, Number],
    depositionId: [String, Number]
  },
  data() {
    return {
      showDialog: false,
      isLoadingAdd: false,
    };
  },
  computed: {
    totalNotes() {
      return this.dataRow.notes.length || 0;
    },
    ...mapGetters(
      "matter/discovery/deposition/preparation/requestForProduction",
      ["dataNotes", "totalsPageNote", "isShowPaginationNotes"]
    )
  },
  methods: {
    async addNotes({body, page}) {
      const data = {
        idParams: {
          matterId: this.matterId,
          depositionId: this.depositionId,
          RFPId: this.dataRow.id,
        },
        body,
      }
      this.isLoadingAdd = true;
      await this.addNotesRFPRequest(data);
      await this.getDataNotes(page);
      this.isLoadingAdd = false;
      this.$refs.refNotes.closeAdd();
    },
    async editNotes({body, page, id}) {
      const data = {
        idParams: {
          matterId: this.matterId,
          depositionId: this.depositionId,
          RFPId: this.dataRow.id,
          noteId: id,
        },
        body,
      }
      this.isLoadingAdd = true;
      await this.updateNotesRFPRequest(data);
      await this.getDataNotes(page);
      this.isLoadingAdd = false;
      this.$refs.refNotes.closeUpdate();
    },
    async removeNotes({id, page}) {
      const data = {
        matterId: this.matterId,
        depositionId: this.depositionId,
        RFPId: this.dataRow.id,
        noteId: id,
      };
      await this.removeNotesRFPRequest(data);
      this.getDataNotes(page);
    },
    getDataNotes(page) {
      const data = {
        idParams: {
          matterId: this.matterId,
          depositionId: this.depositionId,
          noteId: this.dataRow.id
        },
        query: {
          page,
        },
      };
      this.getDataNotesRFPRequest(data);
    },
    close() {
      this.$refs.refNotes.close();
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
