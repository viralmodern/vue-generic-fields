<template>
  <div>
    <v-row justify="end" class="mx-2">
      <ConfigurationCommon title="Medication" :headers="headers" />
    </v-row>
    <TableMedicationLog :items="dataMedicationLog">
      <template slot="button">
        <v-row justify="end" no-gutters class="ma-2">
          <AddMedicationLog />
        </v-row>
      </template>
    </TableMedicationLog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TableMedicationLog from "../../ht_components/partient/profile/TableMedicationLog";
import ConfigurationCommon from "../../ht_components/partient/profile/ConfigurationCommon";
import AddMedicationLog from "../../ht_components/dialogs/AddMedicationLog";

export default {
  components: {
    TableMedicationLog,
    ConfigurationCommon,
    AddMedicationLog
  },
  methods: {
    ...mapActions("ht_store/matter/partient/profile/detail/medicationLog", [
      "getDataMedicationLog"
    ])
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile/detail/medicationLog", [
      "dataMedicationLog"
    ]),
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
          title: "Name",
          name: "medicationName",
          priority: 2
        },
        {
          visible: true,
          title: "Date",
          name: "date",
          priority: 3
        },
        {
          visible: true,
          title: "Dosage",
          name: "dosage",
          priority: 4
        },
        {
          visible: true,
          title: "Tags",
          name: "tags",
          priority: 5
        },
        {
          visible: true,
          title: "Linked Records",
          name: "linkedRecords",
          priority: 6
        }
      ];
      return headers;
    }
  },
  mounted() {
    this.getDataMedicationLog();
  }
};
</script>
