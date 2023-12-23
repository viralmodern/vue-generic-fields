<template>
  <td>
    <a href="#" @click="getDataNotes">{{ dataRow[column.name] }} note(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card class="pa-2 pb-3">
        <ByzantineNote
          :listNotes="dataNotes"
          @create="createNote"
          @remove="removeNote"
          @edit="editNote"
        />
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import ByzantineNote from "../../../../cards/ByzantineNote";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      showDialog: false
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
    ...mapGetters("ht_store/matter/discovery/status/requestItem/note", ["dataNotes"])
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/status/requestItem/note", [
      "getDataNotesRequest",
      "addNotesRequest",
      "updateNotesRequest",
      "removeNotesRequest"
    ]),
    getDataNotes() {
      this.showDialog = true;
      this.getDataNotesRequest();
    },
    editNote(id, val) {
      const data = { id, title: val.title, content: val.description };
      this.updateNotesRequest(data);
    },
    async removeNote(id) {
      const result = await this.removeNotesRequest(id);
      if (result) {
        this.$emit("update", this.dataRow[this.column.name] - 1);
      }
    },
    async createNote(val) {
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
    }
  }
};
</script>
