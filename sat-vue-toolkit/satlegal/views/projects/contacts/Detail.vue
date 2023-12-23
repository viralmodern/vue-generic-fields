<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-tabs>
        <v-tab v-for="item in itemList" :key="item.id" ripple>{{
          item.text
        }}</v-tab>
        <v-tab-item>
          <v-row no-gutters class="pa-3" column>
            <v-col cols="12" class="mb-3">
              <GeneralInfo @updateGeneralInfo="updateGeneralInfo" />
            </v-col>
            <v-col cols="12" class="mb-3">
              <Work @updateWork="updateWork" />
            </v-col>
            <v-col cols="12" class="mb-3">
              <Contact @updateContact="updateContact" />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <CredlibleKanban />
        </v-tab-item>
        <v-tab-item>Goals</v-tab-item>
        <v-tab-item class="px-2 pb-2 pt-1">
          <ByzantineNote
            :listNotes="listNotes"
            @create="createNote"
            @remove="removeNote"
          />
        </v-tab-item>
        <v-tab-item>
          <Document :dataTableDocument="listDocuments" :loading="loading" />
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import GeneralInfo from "../../../ht_components/panels/GeneralInfo";
import Work from "../../../ht_components/panels/Work";
import Contact from "../../../ht_components/panels/Contact";
import Document from "../../../ht_components/panels/Document";
import ByzantineNote from "../../../ht_components/cards/ByzantineNote";
import CredlibleKanban from "../../../ht_components/kanban-board/CredlibleKanban";

export default {
  components: {
    GeneralInfo,
    Work,
    Contact,
    ByzantineNote,
    Document,
    CredlibleKanban
  },
  data() {
    return {
      itemList: [
        { text: "About" },
        { text: "Credibilities" },
        { text: "Goals" },
        { text: "Notes" },
        { text: "Documents" }
      ]
    };
  },
  methods: {
    ...mapMutations("ht_store/matter/character/characterProfile/about", [
      "updateGeneralInfo",
      "updateContact",
      "updateWork"
    ]),
    createNote(object) {
      const data = {
        id: this.listNotes.length + Math.random(),
        peopleWriter: "Thomas Harvey",
        avatar: "https://icons-for-free.com/free-icons/png/512/628292.png",
        title: object.title,
        content: object.description,
        createdAt: new Date().toISOString()
      };
      this.addNoteRequest(data);
    },
    removeNote(id) {
      this.removeNoteRequest(id);
    },
    ...mapActions("ht_store/project/contactsNotes", [
      "getDataListNotesRequest",
      "addNoteRequest",
      "removeNoteRequest"
    ]),
    ...mapActions("ht_store/project/contactsDocuments", ["getDataListdocumentsRequest"])
  },
  computed: {
    ...mapGetters("ht_store/project/contactsNotes", ["listNotes"]),
    ...mapGetters("ht_store/project/contactsDocuments", ["listDocuments", "loading"])
  },
  mounted() {
    this.getDataListNotesRequest();
    this.getDataListdocumentsRequest();
  }
};
</script>
