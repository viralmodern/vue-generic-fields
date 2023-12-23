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
    id: [String, Number]
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGet: false
    };
  },
  computed: {
    ...mapGetters("ht_store/clients", [
      "dataNotes",
      "totalsPageNote",
      "isShowPaginationNotes"
    ])
  },
  methods: {
    mapNote({ name, content }) {
      return {
        title: name,
        text: content
      };
    },
    async addNotes({ body, page }) {
      const data = {
        idParams: {
          rowId: this.id
        },
        totalNotes: this.totalNotes + 1,
        body: this.mapNote(body)
      };
      try {
        this.isLoadingAdd = true;
        await this.addNotesRequest(data);
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
          rowId: this.id,
          noteId: id
        },
        body: this.mapNote(body)
      };
      try {
        this.isLoadingAdd = true;
        await this.updateNotesRequest(data);
        await this.getDataNotes(page);
        this.isLoadingAdd = false;
        this.$refs.refNotes.closeForm();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async removeNotes({ id, page }) {
      const data = {
        rowId: this.id,
        noteId: id,
        totalNotes: this.totalNotes - 1
      };
      await this.removeNotesRequest(data);
      this.getDataNotes(page);
    },
    async getDataNotes(page) {
      const data = {
        idParams: {
          noteId: this.id
        },
        query: {
          page
        }
      };
      this.isLoadingGet = true;
      await this.getDataNotesRequest(data);
      this.isLoadingGet = false;
    },
    ...mapActions("ht_store/clients", [
      "getDataNotesRequest",
      "addNotesRequest",
      "removeNotesRequest",
      "updateNotesRequest"
    ])
  }
};
</script>
