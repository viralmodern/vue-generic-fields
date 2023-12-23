<template>
  <div>
    <ByzantineNote
      :listNotes="noteComputed"
      @create="createNote"
      @remove="removeNote"
      @edit="editNote"
    />
    <v-row no-gutters class="justify-end">
      <v-pagination
        v-model="page"
        :total-visible="7"
        :length="totals_notes"
      ></v-pagination>
    </v-row>
  </div>
</template>
<script>
import ByzantineNote from "../../../ht_components/cards/ByzantineNote";
import { mapGetters, mapActions } from "vuex";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  components: {
    ByzantineNote
  },
  data() {
    return {
      page: 1
    };
  },
  methods: {
    ...mapActions("ht_store/matter/character/characterProfile/notes", [
      "postNotes",
      "updateNotes",
      "removeNotes",
      "getDataNotesRequest"
    ]),
    editNote(noteId, val) {
      const { projectId, characterId } = this.$route.params;
      const data = {
        noteId,
        matterId: projectId,
        characterId,
        body: {
          name: val.title,
          content: val.description
        }
      };
      this.updateNotes(data);
    },
    removeNote(noteId) {
      const { projectId, characterId } = this.$route.params;
      this.removeNotes({
        noteId,
        matterId: projectId,
        characterId
      });
    },
    createNote(val) {
      const { projectId, characterId } = this.$route.params;
      const data = {
        matterId: projectId,
        characterId,
        body: {
          name: val.title,
          content: val.description
        }
      };
      this.postNotes(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/character/characterProfile/notes", [
      "notes",
      "totals"
    ]),
    ...mapGetters("ht_store/workspace/member", ["members"]),
    totals_notes() {
      return Math.ceil((this.totals / 20).toFixed(1)) || 1;
    },
    noteComputed() {
      return (this.notes || []).map(x => {
        const user = (this.members || []).find(r => r.id === x.creator);
        return {
          ...x,
          id: x.pk,
          peopleWriter: user && user.name,
          avatar: user && user.avatar.imageUrl
        };
      });
    }
  },
  watch: {
    page: {
      handler(page) {
        const { projectId, characterId } = this.$route.params;
        this.getDataNotesRequest({ matterId: projectId, characterId, page });
      }
    }
  }
};
</script>
