<template>
  <td>
    <a href="#" @click="show">{{ note_totals || 0 }} note(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card class="pa-2 pb-3">
        <ByzantineNote
          :listNotes="notesComputed"
          @create="createNote"
          @remove="removeNote"
          @edit="editNote"
        />
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import ByzantineNote from "../../../../components/cards/ByzantineNote";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      showDialog: false,
      note_totals: 0
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
    ...mapActions("ht_store/project/research/facts", [
      "updateTask",
      "createNoteFact",
      "editNoteFact",
      "removeNoteFact",
      "getNoteFacts"
    ]),
    show() {
      this.showDialog = true;
      this.getNoteFacts({
        matterId: this.$route.params.matter || this.$route.params.projectId,
        taskId: this.dataRow.id
      });
    },
    editNote(id, val) {
      const req = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        taskId: this.dataRow.id,
        noteId: id,
        body: {
          title: val.title,
          text: val.description || "<p> </p>"
        }
      };
      this.editNoteFact(req);
    },
    removeNote(id) {
      const req = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        taskId: this.dataRow.id,
        noteId: id
      };
      this.removeNoteFact(req);
      this.note_totals = this.note_totals - 1;
    },
    createNote(val) {
      const req = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        taskId: this.dataRow.id,
        body: {
          title: val.title,
          text: val.description || "<p></p>"
        }
      };
      this.createNoteFact(req);
      this.note_totals = this.note_totals + 1;
    }
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
          peopleWrite: user.avatar.name,
          avatar: user.avatar.imageUrl,
          createdAt: new Date().toISOString()
        };
      });
    }
  },
  mounted() {
    this.note_totals = this.dataRow.notes || 0;
  }
};
</script>
