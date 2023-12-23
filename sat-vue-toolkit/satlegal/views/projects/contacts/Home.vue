<template>
  <v-row no-gutters>
    <v-col>
      <LeftMenu
        :listTags="tags"
        @openModal="isShowAddContacts = true"
        :listFilter="filter"
        :projectDetailType="projectDetailType"
        @filterType="filterType"
        @filterRequest="filterRequest"
      />
    </v-col>
    <v-col cols="12" sm="9" md="10" class="pl-1">
      <ContactsList
        :dataTable="dataContacts"
        :totals="totalsContacts"
        :loading="loadingContacts"
        @getData="getDataContacts"
        @updateRate="updateRate"
        :projectDetailType="projectDetailType"
        @removeContact="removeContact"
        @editContact="editContact"
      />
      <AddContacts
        :isShow="isShowAddContacts"
        :types="tags"
        title="Add new contacts"
        :projectDetailType="projectDetailType"
        @closeModal="isShowAddContacts = false"
        @addContact="addContact"
      />
      <AddContacts
        v-if="dataContact"
        :isShow="isShowEditContacts"
        :dataContact="dataContact"
        :types="tags"
        title="Edit contacts"
        :projectDetailType="projectDetailType"
        @closeModal="isShowEditContacts = false"
        @updateContact="updateContact"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import LeftMenu from "../../../ht_components/left-menus/ContactsLeftMenu";
import ContactsList from "../../../ht_components/list/ContactsList";
import AddContacts from "../../../ht_components/dialogs/AddContacts";

export default {
  components: {
    LeftMenu,
    ContactsList,
    AddContacts
  },
  data() {
    return {
      tags: [
        { id: 1, type: "Client" },
        { id: 2, type: "Expert Witnesss" },
        { id: 3, type: "Fact Witness" },
        { id: 4, type: "Eye Witness" },
        { id: 5, type: "Character Witness" },
        { id: 6, type: "Prosecution Witness" },
        { id: 7, type: "Defense Witness" },
        { id: 8, type: "Chance Witness" },
        { id: 9, type: "Judge" },
        { id: 10, type: "Defending Counsel" },
        { id: 11, type: "Opposing Counsel" },
        { id: 12, type: "Plaintiff" },
        { id: 13, type: "Defendant" },
        { id: 14, type: "Jury" }
      ],
      filter: [
        {
          id: 15,
          name: "All contacts",
          icon: "perm_contact_calendar",
          link: "all"
        },
        {
          id: 16,
          name: "Frequently contacts",
          icon: "contact_phone",
          link: "frequently"
        },
        { id: 17, name: "Key contacts", icon: "vpn_key", link: "hot" }
      ],
      isShowAddContacts: false,
      isShowEditContacts: false,
      dataContact: {}
    };
  },
  computed: {
    ...mapGetters("ht_store/project/contacts", [
      "dataContacts",
      "totalsContacts",
      "loadingContacts"
    ]),
    ...mapGetters("ht_store/project", ["projectDetail"]),
    projectDetailType() {
      return this.projectDetail && this.projectDetail.type;
    }
  },
  methods: {
    filterRequest(link) {
      this.filterContact(link);
    },
    addContact(data) {
      this.addContacts(data);
    },
    updateContact(data) {
      this.editContacts(data);
    },
    editContact(data) {
      this.dataContact = data;
      this.isShowEditContacts = true;
    },
    removeContact(id) {
      this.removeContactById(id);
    },
    getDataContacts({ page, rowsPerPage }) {
      const pagination = {
        pageSize: rowsPerPage,
        pageIndex: page - 1
      };
      this.getDataContactsRequest(pagination);
    },
    updateRate(data) {
      this.updateRateContracts(data);
    },
    filterType(e) {
      this.filterContactByType(e);
    },
    ...mapActions("ht_store/project/contacts", ["getDataContactsRequest"]),
    ...mapMutations("ht_store/project/contacts", [
      "updateRateContracts",
      "removeContactById",
      "addContacts",
      "editContacts",
      "filterContactByType",
      "filterContact"
    ])
  }
};
</script>
