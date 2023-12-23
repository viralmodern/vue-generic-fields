<template>
  <div>
    <Notes :listNotes="dataNotes" @create="create" @edit="edit" @remove="removeNoteRequest"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Notes from "../cards/ByzantineNote";
export default {
  components: {
    Notes
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/negligence/detail/note", ["dataNotes"])
  },
  methods: {
    create(value) {
      const data = {
        id: Math.random(),
        peopleWriter: "Thomas Harvey",
        avatar:
          "https://cdn0.iconfinder.com/data/icons/avatars-and-smiles-collection/110/Icons__business-512.png",
        title: value.title,
        content: value.description,
        createdAt: new Date().toISOString()
      };
      this.addNoteRequest(data);
    },
    edit(id, value) {
      const data = {
        id,
        title: value.title,
        content: value.description
      };
      this.editNoteRequest(data);
    },
    ...mapActions("ht_store/matter/partient/negligence/detail/note", [
      "addNoteRequest",
      "removeNoteRequest",
      "editNoteRequest"
    ])
  }
};
</script>
