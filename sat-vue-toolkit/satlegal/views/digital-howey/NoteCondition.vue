<template>
  <div>
    <Notes :listNotes="dataNotes" @create="create" @edit="edit" @remove="removeNoteRequest"/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Notes from "../../ht_components/cards/ByzantineNote";
export default {
  components: {
    Notes
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHowey/condition/note", ["dataNotes"]),
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
    },
    edit(id, value) {
      const data = {
        id,
        title: value.title,
        content: value.description
      };
      this.editNoteRequest(data);
    },
    ...mapActions("ht_store/matter/digitalHowey/condition/note", [
      "addNoteRequest",
      "removeNoteRequest",
      "editNoteRequest"
    ])
  }
}
</script>
