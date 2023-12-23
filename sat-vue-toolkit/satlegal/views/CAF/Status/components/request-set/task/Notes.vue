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
    requestSetId: [String, Number],
    requestSetTaskId: [String, Number],
    matterId: [String, Number],
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGet: false,
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/requestStatus/requestSet/task", [
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
          requestSetId: this.requestSetId,
          requestSetTaskId: this.requestSetTaskId,
        },
        totalNotes: this.totalNotes,
        body
      };
      try {
        this.isLoadingAdd = true;
        await this.addNotesRequestSetTaskRequest(data);
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
          requestSetId: this.requestSetId,
          requestSetTaskId: this.requestSetTaskId,
          noteId: id
        },
        body
      };
      try {
        this.isLoadingAdd = true;
        await this.updateNotesRequestSetTaskRequest(data);
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
        requestSetId: this.requestSetId,
        requestSetTaskId: this.requestSetTaskId,
        totalNotes: this.totalNotes,
        noteId: id
      };
      await this.removeNotesRequestSetTaskRequest(data);
      this.getDataNotes(page);
    },
    async getDataNotes(page) {
      const data = {
        idParams: {
          matterId: this.matterId,
          requestSetId: this.requestSetId,
          requestSetTaskId: this.requestSetTaskId,
        },
        query: {
          page
        }
      };
      this.isLoadingGet = true;
      await this.getDataNotesRequestSetTaskRequest(data);
      this.isLoadingGet = false;
    },
    ...mapActions("ht_store/matter/requestStatus/requestSet/task", [
      "getDataNotesRequestSetTaskRequest",
      "addNotesRequestSetTaskRequest",
      "removeNotesRequestSetTaskRequest",
      "updateNotesRequestSetTaskRequest"
    ])
  }
};
</script>
