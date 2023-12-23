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
import NotesType2 from "@/sat-vue-toolkit/satlegal/ht_components/menus/NotesType2";

export default {
  components: {
    NotesType2
  },
  props: {
    totalNotes: Number,
    pubId: Number,
    detail: Boolean
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGet: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/published", [
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
          pubId: this.pubId
        },
        totalNotes: this.totalNotes,
        body,
        detail: this.detail
      };
      try {
        this.isLoadingAdd = true;
        await this.addNotesPublishedRequest(data);
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
          pubId: this.pubId,
          noteId: id
        },
        body
      };
      try {
        this.isLoadingAdd = true;
        await this.updateNotesPublishedRequest(data);
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
        pubId: this.pubId,
        noteId: id,
        totalNotes: this.totalNotes,
        detail: this.detail
      };
      await this.removeNotesPublishedRequest(data);
      this.getDataNotes(page);
    },
    async getDataNotes(id, page) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          pubId: this.pubId
        },
        query: {
          page
        }
      };
      this.isLoadingGet = true;
      await this.getDataNotesPublishedRequest(data);
      this.isLoadingGet = false;
    },
    ...mapActions("ht_store/matter/deposition/published", [
      "getDataNotesPublishedRequest",
      "addNotesPublishedRequest",
      "removeNotesPublishedRequest",
      "updateNotesPublishedRequest"
    ])
  }
};
</script>
