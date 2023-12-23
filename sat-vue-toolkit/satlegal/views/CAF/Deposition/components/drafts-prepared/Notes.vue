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
    draftId: [String, Number],
    detail: Boolean
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGet: false,
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/draftsPrepare", [
      "dataNotes",
      "totalsPageNote",
      "isShowPaginationNotes"
    ])
  },
  methods: {
    async addNotes({ body, page }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          draftId: this.draftId,
        },
        totalNotes: this.totalNotes,
        body,
         detail: this.detail
      };
      try {
        this.isLoadingAdd = true;
        await this.addNotesDraftsRequest(data);
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
          draftId: this.draftId,
          noteId: id
        },
        body
      };
      try {
        this.isLoadingAdd = true;
        await this.updateNotesDraftsRequest(data);
        await this.getDataNotes(page);
        this.isLoadingAdd = false;
        this.$refs.refNotes.closeForm();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async removeNotes({ id, page }) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        draftId: this.draftId,
        noteId: id,
        totalNotes: this.totalNotes,
         detail: this.detail
      };
      await this.removeNotesDraftsRequest(data);
      this.getDataNotes(page);
    },
    async getDataNotes(page) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          draftId: this.draftId,
        },
        query: {
          page
        }
      };
      this.isLoadingGet = true;
      await this.getDataNotesDraftsRequest(data);
      this.isLoadingGet = false;
    },
    ...mapActions("ht_store/matter/deposition/draftsPrepare", [
      "getDataNotesDraftsRequest",
      "addNotesDraftsRequest",
      "removeNotesDraftsRequest",
      "updateNotesDraftsRequest"
    ])
  }
};
</script>
