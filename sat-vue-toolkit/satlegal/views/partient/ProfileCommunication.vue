<template>
  <div>
    <v-row justify="end" no-gutters class="ma-2">
      <ConfigurationCommon title="Communication" :headers="headers" />
    </v-row>
    <TableCommunication :items="dataCommunication">
      <template slot="button">
        <v-row justify="end" no-gutters>
          <AddCommunication />
        </v-row>
      </template>
    </TableCommunication>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TableCommunication from "../../ht_components/partient/profile/TableCommunication";
import ConfigurationCommon from "../../ht_components/partient/profile/ConfigurationCommon";
import AddCommunication from "../../ht_components/dialogs/AddCommunication";

export default {
  components: {
    TableCommunication,
    ConfigurationCommon,
    AddCommunication
  },
  methods: {
    ...mapActions("ht_store/matter/partient/profile/detail/communication", [
      "getDataCommunication"
    ])
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile/detail/communication", [
      "dataCommunication"
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
          name: "name",
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
          title: "Communicate Initiator",
          name: "initiator",
          priority: 4
        },
        {
          visible: true,
          title: "Communicate Reponder",
          name: "responder",
          priority: 5
        },
        {
          visible: true,
          title: "Methods of Communication",
          name: "methods",
          priority: 6
        },
        {
          visible: true,
          title: "Tags",
          name: "tags",
          priority: 7
        },
        {
          visible: true,
          title: "Linked Records",
          name: "linkedRecords",
          priority: 8
        }
      ];
      return headers;
    }
  },
  mounted() {
    this.getDataCommunication();
  }
};
</script>
