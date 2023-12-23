<template>
  <div>
    <Notes
      :listNotes="notes"
      @create="addClientNoteRequest"
      @edit="edit"
      @remove="deleteClientNoteRequest"
    />
  </div>
</template>
<script>
import Notes from "../../cards/ByzantineNote";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Notes
  },
  computed: {
    ...mapGetters("ht_store/workspace/client/detail/note", ["notes"])
  },
  methods: {
    edit(id, value) {
      const data = {
        id: id,
        title: value.title,
        content: value.description
      };
      this.updateClientNoteRequest(data)
    },
    ...mapActions("ht_store/workspace/client/detail/note", [
      "updateClientNoteRequest",
      "deleteClientNoteRequest",
      "addClientNoteRequest"
    ])
  }
};
</script>
