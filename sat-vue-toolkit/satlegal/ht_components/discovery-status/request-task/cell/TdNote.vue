<template>
  <td>
    <a href="#" @click="showNote(page)">{{dataRow.notes.length}} note(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <Notes
            @create="addNote"
            @edit="editNote"
            @remove="removeNote"
            :notes="notes"
            :matterId="Number($route.params.matter || $route.params.projectId)"
            :rowId="Number($route.params.requestId)"
            :dataRow="{deadline: null, members: null}"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Notes from "../../request-set/common/Notes";
export default {
  data() {
    return {
      showDialog: false,
      page: 1
    };
  },
  components: {
    Notes
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestTask/detail/notes", [ // eslint-disable-line
      "notes",
      "totalNotes"
    ]),
    ...mapGetters("ht_store/project/members", ["members"]) // eslint-disable-line
  },
  methods: {
    showNote(page) {
      this.showDialog = true;
      let matterId = this.$route.params.matter || this.$route.params.projectId;
      let rowId = this.dataRow.request_set;
      const taskId = this.dataRow.id;
      this.getNotesRequestTask({ matterId, taskId, rowId, page });
    },
    async addNote(data) {
      let matterId = this.$route.params.matter || this.$route.params.projectId;
      let rowId = this.dataRow.request_set;
      const taskId = this.dataRow.id;
      let dataAdd = {
        matterId: matterId,
        rowId: rowId,
        taskId: taskId,
        bodyRequest: data.bodyRequest
      };
      const result = await this.addNotesRequest(dataAdd);
      if(result){
        this.$emit("update", this.dataRow[this.column.name] + 1);
      }
    },
    editNote(data) {
      let matterId = this.$route.params.matter || this.$route.params.projectId;
      let rowId = this.dataRow.request_set;
      const taskId = this.dataRow.id;
      let dataEdit = {
        matterId: matterId,
        rowId: rowId,
        taskId: taskId,
        bodyRequest: data.bodyRequest,
        notesId: data.notesId
      };
      this.updateNotesRequest(dataEdit);
    },
    async removeNote(data) {
      let matterId = this.$route.params.matter || this.$route.params.projectId;
      let rowId = this.dataRow.request_set;
      const taskId = this.dataRow.id;
      let dataDelete = {
        matterId: matterId,
        rowId: rowId,
        taskId: taskId,
        bodyRequest: data.bodyRequest,
        id: data.id
      };
      const result = await this.removeNotesRequest(dataDelete);
      if (result) {
        this.$emit("update", this.dataRow[this.column.name] - 1);
      }
    },
    ...mapActions("ht_store/matter/discovery/status/requestTask/detail/notes", [
      "getNotesRequestTask",
      "addNotesRequest",
      "removeNotesRequest",
      "updateNotesRequest"
    ])
  }
};
</script>
