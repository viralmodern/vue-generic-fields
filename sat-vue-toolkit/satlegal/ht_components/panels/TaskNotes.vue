<template>
  <v-row no-gutters>
    <v-col>
      <h1>Notes</h1>
      <ByzantineNote
        @edit="editNote"
        :listNotes="dataListNotes"
        @create="addNotes"
        @remove="deleteNotes"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import ByzantineNote from "../cards/ByzantineNote";

export default {
  components: {
    ByzantineNote
  },
  computed: {
    ...mapGetters("ht_store/task/detail/notes", ["dataListNotes"])
  },
  methods: {
    ...mapMutations("ht_store/task/detail/notes", [
      "addNotes",
      "deleteNotes",
      "editNotes"
    ]),
    ...mapActions("ht_store/task/detail/notes", ["getDataNotesRequest"]),
    editNote(id, data) {
      let value = {
        id: id,
        title: data.title,
        content: data.description
      };
      this.editNotes(value);
    }
  },
  mounted() {
    this.getDataNotesRequest();
  }
};
</script>

