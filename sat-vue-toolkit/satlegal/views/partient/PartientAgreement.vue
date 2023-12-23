<template>
  <div>
    <v-row justify="end" class="mr-2">
      <ConfigurationCommon title="Agreement" :headers="headers" />
    </v-row>
    <TableAgreementProfile :items="dataPatientProfile">
      <template v-slot:top>
        <v-row justify="end" no-gutters class="ma-2">
        <AddAgreement />
         </v-row>
      </template>
    </TableAgreementProfile>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ConfigurationCommon from "../../ht_components/partient/profile/ConfigurationCommon";
import TableAgreementProfile from "../../ht_components/partient/profile/TableAgreementProfile";
import AddAgreement from "../../ht_components/dialogs/AddAgreement";

export default {
  components: {
    TableAgreementProfile,
    ConfigurationCommon,
    AddAgreement
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile/detail", ["dataPatientProfile"]),
    headers() {
      const headers = [
        {
          visible: true,
          title: "View detail",
          name: "viewDetail",
          priority: 1
        },
        {
          visible: true,
          title: "Agreement Name",
          name: "agreementName",
          priority: 2
        },
        {
          visible: true,
          title: "Date of agreement",
          name: "dateOfAgreement",
          priority: 3
        },
        {
          visible: true,
          title: "Defendant Party",
          name: "defendantParty",
          priority: 4
        },
        {
          visible: true,
          title: "Plaintiff Party",
          name: "plaintiffParty",
          priority: 5
        },
        {
          visible: true,
          title: "Tags",
          name: "tags",
          priority: 6
        },
        {
          visible: true,
          title: "Linked Records",
          name: "linkedRecords",
          priority: 7
        }
      ];
      return headers;
    }
  },

  methods: {
    ...mapActions("ht_store/matter/partient/profile/detail", ["getDataPatientProfile"]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"])
  },
  mounted() {
    this.getDataPatientProfile();
    this.getDataCharacterRequest();
  }
};
</script>
