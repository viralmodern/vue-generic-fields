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
    totalNotes: [String, Number],
    depositionId: [String, Number],
    keyPleadingId: [String, Number],
    matterId: [String, Number],
    detail: Boolean
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGet: false,
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/keyPleading", [
      "dataNotes",
      "totalsPageNote",
      "isShowPaginationNotes"
    ])
  },
  methods: {
    async addNotes({ body, page }) {
      const data = {
        idParams: {
          matterId: this.matterId,
          depositionId: this.depositionId,
          keyPleadingId: this.keyPleadingId,
        },
        totalNotes: this.totalNotes + 1,
        body,
        detail: this.detail
      };
      try {
        this.isLoadingAdd = true;
        await this.addNotesKeyPleadingRequest(data);
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
          matterId: this.matterId,
          depositionId: this.depositionId,
          keyPleadingId: this.keyPleadingId,
          noteId: id
        },
        body,
      };
      try {
        this.isLoadingAdd = true;
        await this.updateNotesKeyPleadingRequest(data);
        await this.getDataNotes(page);
        this.isLoadingAdd = false;
        this.$refs.refNotes.closeForm();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async removeNotes({ id, page }) {
      const data = {
        matterId: this.matterId,
        depositionId: this.depositionId,
        keyPleadingId: this.keyPleadingId,
        noteId: id,
        totalNotes: this.totalNotes - 1,
        detail: this.detail
      };
      await this.removeNotesKeyPleadingRequest(data);
      this.getDataNotes(page);
    },
    async getDataNotes(page) {
      const data = {
        idParams: {
          matterId: this.matterId,
          depositionId: this.depositionId,
          keyPleadingId: this.keyPleadingId,
        },
        query: {
          page
        },
      };
      this.isLoadingGet = true;
      await this.getDataNotesKeyPleadingRequest(data);
      this.isLoadingGet = false;
    },
    ...mapActions("ht_store/matter/deposition/keyPleading", [
      "getDataNotesKeyPleadingRequest",
      "addNotesKeyPleadingRequest",
      "removeNotesKeyPleadingRequest",
      "updateNotesKeyPleadingRequest"
    ])
  }
};
</script>
