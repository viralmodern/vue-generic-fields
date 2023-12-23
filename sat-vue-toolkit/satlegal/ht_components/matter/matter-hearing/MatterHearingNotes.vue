<template>
  <div>
    <ByzantineNote :listNotes="item.notes || []" @create="create" @edit="edit" @remove="remove"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ByzantineNote from "../../cards/ByzantineNote";
export default {
  props: {
    item: Object
  },
  components: {
    ByzantineNote
  },
  methods: {
    create(value) {
      const data = {
        id: this.item.id,
        data: {
          id: Math.random(),
          peopleWriter: "Thomas Harvey",
          avatar: "https://cdn0.iconfinder.com/data/icons/avatars-and-smiles-collection/110/Icons__business-512.png",
          title: value.title,
          content: value.description,
          createdAt: new Date().toISOString()
        }
      };
      this.addNoteRequest(data);
    },
    edit(id, value) {
      const data = {
        id: this.item.id,
        data: {
          id,
          title: value.title,
          content: value.description
        }
      };
      this.editNoteRequest(data);
    },
    remove(id) {
      const data = {
        id: this.item.id,
        idNote: id
      };
      this.removeNoteRequest(data);
    },
    ...mapActions("ht_store/matter/hearing/note", [
      "addNoteRequest",
      "removeNoteRequest",
      "editNoteRequest"
    ])
  }
};
</script>
