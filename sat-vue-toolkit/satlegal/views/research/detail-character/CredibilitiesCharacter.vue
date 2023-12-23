<template>
  <CredlibleKanban/>
</template>
<script>
import { mapGetters } from "vuex";
import CredlibleKanban from "../../../ht_components/kanban-board/CredlibleKanban";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  components: {
    CredlibleKanban
  },
  computed: {
    ...mapGetters("ht_store/matter/character/characterProfile/credibilities", ["credibilities"])
  }
}
</script>
