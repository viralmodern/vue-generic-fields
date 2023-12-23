<template>
  <v-row no-gutters>
    <v-col>
      <h1>Notes</h1>
      <ByzantineNote
        :listNotes="dataNotes"
        @create="createNote"
        @remove="removeNote"
        @edit="editNote"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ByzantineNote from "../../cards/ByzantineNote";

export default {
  components: {
    ByzantineNote
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task/note", ["dataNotes"])
  },
  methods: {
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task/note", [
      "getDataNotesRequest",
      "addNotesRequest",
      "updateNotesRequest",
      "removeNotesRequest"
    ]),
    editNote(id, val) {
      const data = { id, title: val.title, content: val.description };
      this.updateNotesRequest(data);
    },
    async removeNote(id) {
      this.removeNotesRequest(id);
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
      this.addNotesRequest(data);
    }
  },
  mounted() {
    this.getDataNotesRequest();
  }
};
</script>

