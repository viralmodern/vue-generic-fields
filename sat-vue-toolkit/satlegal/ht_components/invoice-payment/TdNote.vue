<template>
  <td>
    <a href="#" @click="showDialog=true">{{ dataRow.note.length }} note(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card class="pa-2 pb-3">
        <Notes :listNotes="joinNote" @create="create" @edit="edit" @remove="removeNoteRequest"/>
      </v-card>
    </v-dialog>
  </td>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Notes from "../cards/ByzantineNote";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      showDialog: false
    };
  },
  components: {
    Notes
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/invoice/detail/note", ["dataNotes"]),
    joinNote() {
      return this.dataNotes.filter(x => {
        return this.dataRow.note.includes(x.id);
      });
    }
  },
  methods: {
    async create(value) {
      let id = Math.random();
      const data = {
        id: id,
        peopleWriter: "Thomas Harvey",
        avatar:
          "https://cdn0.iconfinder.com/data/icons/avatars-and-smiles-collection/110/Icons__business-512.png",
        title: value.title,
        content: value.description,
        createdAt: new Date().toISOString()
      };
      await this.addNoteRequest(data);
      const dataPaymentNote = {
        parentId: this.dataRow.id,
        id: id
      };
      this.addNotePaymentRequest(dataPaymentNote);
    },
    edit(id, value) {
      const data = {
        id,
        title: value.title,
        content: value.description
      };
      this.editNoteRequest(data);
    },
    ...mapActions("ht_store/workspace/billing/invoice/detail/note", [
      "addNoteRequest",
      "removeNoteRequest",
      "editNoteRequest"
    ]),
    ...mapActions("ht_store/workspace/billing/invoice/detail/payment", [
      "addNotePaymentRequest"
    ])
  }
};
</script>
