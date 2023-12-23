<template>
  <td>
    <a href="#" @click="show">{{ dataRow.notes.length }} note(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card class="pa-2 pb-3">
        <ByzantineNote
          :listNotes="notesComputed"
          @create="create"
          @remove="remove"
          @edit="update"
        />
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import ByzantineNote from "../cards/ByzantineNote";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      showDialog: false
    };
  },
  computed: {
    ...mapGetters("ht_store/project/research/timeline/detail/activities", ["notes"]),
    ...mapGetters("ht_store/workspace/member", ["members"]),
    notesComputed() {
      return this.notes.map(m => {
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
    },
  },
  components: {
    ByzantineNote
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    show() {
      this.showDialog = true;
      const { timelineId, projectId } = this.$route.params;
      this.getDataNote({
        matterId: projectId,
        timelineId,
        activitiesId: this.dataRow.id,
      });
    },
    update(id, val) {
      const { timelineId, projectId } = this.$route.params;
      const req = {
        matterId: projectId,
        activitiesId: this.dataRow.id,
        timelineId,
        noteId: id,
        body: {
          title: val.title,
          text: val.description || "<p> </p>"
        }
      };
      this.editNote(req);
    },
    remove(noteId) {
      const { timelineId, projectId } = this.$route.params;
      const req = {
        matterId: projectId,
        activitiesId: this.dataRow.id,
        noteId,
        timelineId
      };
      this.deleteNote(req);
    },
    create(val) {
      const { timelineId, projectId } = this.$route.params;
      const req = {
        matterId: projectId,
        timelineId,
        activitiesId: this.dataRow.id,
        body: {
          title: val.title,
          text: val.description || "<p> </p>"
        }
      };
      this.createNote(req);
    },
    ...mapActions("ht_store/project/research/timeline/detail/activities", [
      "createNote",
      "editNote",
      "deleteNote",
      "getDataNote"
    ])
  }
};
</script>
