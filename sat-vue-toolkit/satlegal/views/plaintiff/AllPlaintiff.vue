<template>
  <v-row no-gutters>
    <v-col cols="12">
      <TablePlaintiff :items="dataPlaintiff">
        <template slot="button">
          <v-row justify="end" no-gutters class="ma-2">
            <CreatePlainff header="Add new plaintiff" />
          </v-row>
        </template>
      </TablePlaintiff>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import TablePlaintiff from "./TablePlaintiff";
import CreatePlainff from "../../ht_components/dialogs/CreatePlainff";

export default {
  components: {
    TablePlaintiff,
    CreatePlainff
  },
  computed: {
    ...mapGetters("ht_store/matter/plaintiff", ["dataPlaintiff"])
  }
};
</script>
