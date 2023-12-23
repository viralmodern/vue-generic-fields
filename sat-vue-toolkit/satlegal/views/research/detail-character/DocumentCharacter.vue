<template>
  <Document :dataTableDocument="documents"/>
</template>
<script>
import { mapGetters } from "vuex";
import Document from "../../../ht_components/panels/Document";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  components: {
    Document
  },
  computed: {
    ...mapGetters("ht_store/matter/character/characterProfile/document", ["documents"])
  }
};
</script>
