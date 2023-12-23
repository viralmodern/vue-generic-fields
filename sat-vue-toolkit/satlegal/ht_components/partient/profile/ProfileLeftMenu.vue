<template>
  <v-list>
    <div v-for="(item, index) in AgreementLeftMenu" :key="index">
      <v-list-item :to="{name: item.nameRoute}">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      AgreementLeftMenu: [
        {
          name: "Agreements",
          icon: "desktop_mac",
          nameRoute: "PartientAgreement"
        },
        {
          name: "Prescribes",
          icon: "extension",
          nameRoute: "PartientPrescribes"
        },
        {
          name: "Medication Log",
          icon: "dashboard",
          nameRoute: "ProfileMedicationLog"
        },
        {
          name: "Symptom Log",
          icon: "list_alt",
          nameRoute: "ProfileSymptomLog"
        },
        {
          name: "Treatment Log",
          icon: "picture_in_picture",
          nameRoute: "ProfileTreatmentLog"
        },
        {
          name: "Follow Up",
          icon: " add_alert",
          nameRoute: "ProfileFollowUp"
        },
        {
          name: "Communication",
          icon: "data_usage",
          nameRoute: "Communication"
        }
      ]
    };
  },
  methods: {
    showContent() {}
  }
};
</script>
<style scoped>
.small-menu {
  width: 60px;
}
</style>
