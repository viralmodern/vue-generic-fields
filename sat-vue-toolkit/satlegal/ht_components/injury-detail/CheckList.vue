<template>
  <div>
    <CheckList
      nameButton="Checklist"
      :list="dataCheckList"
      @addGroup="addGroupChecklistRequest"
      @checkbox="checkItemRequest"
      @addItemInGroup="addItemInGroupChecklistRequest"
      @removeGroup="removeGroupChecklistRequest"
      @removeItem="removeItemInGroupChecklistRequest"
      @updateItem="updateItemInGroupChecklistRequest"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CheckList from "../cards/ByzantineCheckList";
export default {
  components: {
    CheckList
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/injury/detail/checklist", [
      "dataCheckList"
    ])
  },
  methods: {
    ...mapActions("ht_store/matter/partient/injury/detail/checklist", [
      "addGroupChecklistRequest",
      "removeGroupChecklistRequest",
      "addItemInGroupChecklistRequest",
      "removeItemInGroupChecklistRequest",
      "updateItemInGroupChecklistRequest",
      "checkItemRequest"
    ])
  }
};
</script>
