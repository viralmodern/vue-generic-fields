<template>
  <div>
    <ByzantineCheckList
      nameButton="Checklist"
      :list="item.checklist"
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
import ByzantineCheckList from "../../cards/ByzantineCheckList";
export default {
  components: {
    ByzantineCheckList
  },
  props: {
    item: Object
  },
  methods: {
    addItemInGroup(name) {
      const data = { id: this.item.id, name };
      this.addItemInGroupChecklistRequest(data);
    },
    checkbox(value) {
      const data = { id: this.item.id, data: value };
      this.checkItemRequest(data);
    },
    removeGroup(idChecklist) {
      const data = { id: this.item.id, idChecklist };
      this.removeGroupChecklistRequest(data);
    },
    addGroup(groupName) {
      this.addGroupChecklistRequest({ id: this.item.id, groupName });
    },
    removeItem(value) {
      const data = { id: this.item.id, data: value };
      this.removeItemInGroupChecklistRequest(data);
    },
    updateItem(value) {
      const data = { id: this.item.id, data: value };
      this.updateItemInGroupChecklistRequest(data);
    },
    ...mapActions("ht_store/matter/hearing/checklist", [
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
