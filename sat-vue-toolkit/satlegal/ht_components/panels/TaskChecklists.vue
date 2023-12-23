<template>
  <v-row no-gutters>
    <v-col>
      <h1>Check lists</h1>
      <ByzantineCheckList
        nameButton="Checklist"
        :list="dataCheckbox"
        @addGroup="addGroupChecklist"
        @checkbox="checkbox"
        @addItemInGroup="addItemInGroupChecklist"
        @removeGroup="deleteGroupChecklist"
        @removeItem="deleteItemChecklist"
        @updateItem="updateItemInGroupChecklist"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import ByzantineCheckList from "../cards/ByzantineCheckList";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    ByzantineCheckList
  },
  computed: {
    ...mapGetters("ht_store/task/detail/checklist", ["dataCheckbox"])
  },
  methods: {
    ...mapActions("ht_store/task/detail/checklist", ["getDataCheckboxRequest"]),
    ...mapMutations("ht_store/task/detail/checklist", [
      "deleteGroupChecklist",
      "deleteItemChecklist",
      "addItemInGroupChecklist",
      "checkbox",
      "addGroupChecklist",
      "updateItemInGroupChecklist"
    ])
  },
  mounted() {
    this.getDataCheckboxRequest();
  }
};
</script>

