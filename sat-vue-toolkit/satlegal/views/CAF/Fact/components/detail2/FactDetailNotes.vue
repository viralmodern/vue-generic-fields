<template>
  <div>
    <Notes :listNotes="notesComputed" @create="createNote" @remove="remove" @edit="edit" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Notes from "../../../cards/ByzantineNote";
export default {
  components: {
    Notes
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"]),
    ...mapGetters("ht_store/project/research/facts", ["dataNotesFacts"]),
    notesComputed() {
      return this.dataNotesFacts.map(m => {
        const user = (this.members || []).find(f => f.id === m.creator);
        return {
          ...m,
          id: m.pk,
          content: m.text,
          peopleWrite: (user.avatar || {}).name,
          avatar: (user.avatar || {}).imageUrl,
          createdAt: new Date().toISOString()
        };
      });
    }
  },
  methods: {
    createNote(val) {
      const { factId, projectId } = this.$route.params;
      const req = {
        matterId: projectId,
        taskId: factId,
        body: {
          title: val.title,
          text: val.description || "<p></p>"
        }
      };
      this.createNoteFact(req);
    },
    edit(id, val) {
      const { factId, projectId } = this.$route.params;
      const req = {
        matterId: projectId,
        taskId: factId,
        noteId: id,
        body: {
          title: val.title,
          text: val.description || "<p> </p>"
        }
      };
      this.editNoteFact(req);
    },
    remove(id) {
      const { factId, projectId } = this.$route.params;
      const req = {
        matterId: projectId,
        taskId: factId,
        noteId: id
      };
      this.removeNoteFact(req);
    },
    ...mapActions("ht_store/project/research/facts", [
      "createNoteFact",
      "editNoteFact",
      "removeNoteFact",
      "getNoteFacts"
    ])
  },
  mounted() {
    const { factId, projectId } = this.$route.params;
    this.getNoteFacts({ matterId: projectId, taskId: factId });
  }
};
</script>
