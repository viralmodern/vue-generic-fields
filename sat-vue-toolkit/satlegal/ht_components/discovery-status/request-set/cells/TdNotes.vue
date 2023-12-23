<template>
  <td>
    <a href="#" @click="showModal">{{ total_notes }} note(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card class="pa-2 pb-3">
        <Notes
          @create="addNotes"
          @edit="updateNotesRequest"
          @remove="removeNotes"
          @paging="getDataNotes"
          :notes="notes"
          :totalPagination="totalPagination"
          :dataRow="dataRow"
          :matterId="Number($route.params.matter || $route.params.projectId)"
          :rowId="Number(dataRow.pk)"
        />
      </v-card>
    </v-dialog>
  </td>
</template>

<script>
const pageSize = 20;
import { mapActions, mapGetters } from "vuex";
import Notes from "../common/Notes";
export default {
  components: {
    Notes
  },
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      showDialog: false,
      total_notes: 0,
      page: 1,
      totalPagination: 1
    };
  },
  mounted() {
    this.total_notes = this.dataRow.total_notes || 0;
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestSets/notes", ["notes"])
  },
  methods: {
    addNotes(params) {
      this.addNotesRequest(params);
      this.total_notes = this.total_notes + 1;
    },
    removeNotes(params) {
      this.removeNotesRequest(params);
      this.total_notes = this.total_notes - 1;
    },
    getDataNotes(page) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      this.getNotesRequestSets({ matterId, rowId: this.dataRow.pk, page });
    },
    showModal() {
      this.showDialog = true;
      this.getDataNotes(this.page);
      if (this.total_notes > 0) {
        const total = this.total_notes / pageSize;
        this.totalPagination = Math.ceil(total.toFixed(1));
      }
    },
    ...mapActions("ht_store/matter/discovery/status/requestSets/notes", [
      "getNotesRequestSets",
      "addNotesRequest",
      "removeNotesRequest",
      "updateNotesRequest"
    ])
  }
};
</script>
