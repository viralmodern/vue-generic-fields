<template>
  <td>
    <a href="#" @click="showDialog=true">{{ dataRow.notes.length }} note(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card class="pa-2 pb-3">
        <ByzantineNote
          :listNotes="dataRow.notes"
          @create="createNote"
          @remove="removeNote"
          @edit="editNote"
        />
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import ByzantineNote from "../cards/ByzantineNote";
import { mapActions } from "vuex";
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
  methods: {
    ...mapActions("ht_store/task/list", ["updateTask"]),
    ...mapActions("ht_store/task/list/note", [
      "addNoteRequest",
      "removeNoteRequest",
      "editNoteRequest"
    ]),
    async editNote(id, val) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "editNote",
          id: id,
          title: val.title,
          content: val.description
        }
      };
      const result = await this.editNoteRequest(data);
      if (result) {
        this.updateTask(data);
      }
    },
    async removeNote(id) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "removeNote",
          id: id
        }
      };
      const result = await this.removeNoteRequest(data);
      if (result) {
        this.updateTask(data);
      }
    },
    async createNote(val) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "createNote",
          id: Math.random(),
          peopleWriter: "Thomas Harvey",
          avatar: "https://icons-for-free.com/free-icons/png/512/628292.png",
          title: val.title,
          content: val.description,
          createdAt: new Date().toISOString()
        }
      };
      const result = await this.addNoteRequest(data);
      if (result) {
        this.updateTask(data);
      }
    }
  }
};
</script>
