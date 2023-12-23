<template>
  <v-row no-gutters>
    <v-col cols="12">
      <TableAddressbook
        :items="dataClientAddressbook"
        @add="createNewContact"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TableAddressbook from "../portal-overview.address-book/TableAddressbook";
export default {
  components: {
    TableAddressbook
  },
  methods: {
    ...mapActions("ht_store/workspace/client/detail/addressbook", [
      "getDataClientAddressbook",
      "createNewContact"
    ])
  },
  computed: {
    ...mapGetters("ht_store/workspace/client/detail/addressbook", [
      "dataClientAddressbook"
    ])
  },
  mounted() {
    this.getDataClientAddressbook();
  }
};
</script>
