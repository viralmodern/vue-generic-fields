<template>
  <td>
    <a href="#" @click="showNote(page)">{{dataRow[column.name]}} note(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <ByzantineNote
            :listNotes="dataNotes"
            @create="addNote"
            @remove="removeNote"
            @edit="editNote"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ByzantineNote from "../../../../cards/ByzantineNote";
export default {
  data() {
    return {
      showDialog: false,
      page: 1
    };
  },
  components: {
    ByzantineNote
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/rendered/notes", [
      "dataNotes",
      "totalNotes"
    ]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    showNote(page) {
      this.showDialog = true;
      let matterId = this.$route.params.matter || this.$route.params.projectId;
      let rowId = this.dataRow.request_set;
      const taskId = this.dataRow.id;
      this.getDataNotesRequest({ matterId, taskId, rowId, page });
    },
    async addNote(val) {
      const data = {
        id: Math.random(),
        peopleWriter: "Thomas Harvey",
        avatar: "https://icons-for-free.com/free-icons/png/512/628292.png",
        title: val.title,
        content: val.description,
        createdAt: new Date().toISOString()
      };
      const result = await this.addNotesRequest(data);
      if (result) {
        this.$emit("update", this.dataRow[this.column.name] + 1);
      }
    },
    editNote(id,val) {
      const data = { id, title: val.title, content: val.description };
      this.updateNotesRequest(data);
    },
    async removeNote(id) {
      const result = await this.removeNotesRequest(id);
      if (result) {
        this.$emit("update", this.dataRow[this.column.name] - 1);
      }
    },
    ...mapActions("ht_store/matter/discovery/deposition/preparation/rendered/notes", [
      "getDataNotesRequest",
      "addNotesRequest",
      "removeNotesRequest",
      "updateNotesRequest"
    ])
  }
};
</script>
