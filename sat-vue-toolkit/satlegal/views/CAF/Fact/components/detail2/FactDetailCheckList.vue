<template>
  <div>
    <CheckList
      nameButton="Checklist"
      :list="items"
      @addGroup="addGroup"
      @checkbox="checkbox"
      @addItemInGroup="addItemInGroup"
      @removeGroup="removeGroup"
      @removeItem="removeItem"
      @updateItem="updateItem"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CheckList from "../../../cards/ByzantineCheckList";
export default {
  components: {
    CheckList
  },
  props: {
    items: Array
  },
  methods: {
    addItemInGroup(name) {
      this.addItemInGroupChecklistRequest(name);
    },
    checkbox(data) {
      this.checkItemRequest(data);
    },
    removeGroup(idChecklist) {
      this.removeGroupChecklistRequest(idChecklist);
    },
    addGroup(groupName) {
      this.addGroupChecklistRequest(groupName);
    },
    removeItem(data) {
      this.removeItemInGroupChecklistRequest(data);
    },
    updateItem(data) {
      this.updateItemInGroupChecklistRequest(data);
    },
    ...mapActions("ht_store/project/research/facts/detail/checklist", [
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
