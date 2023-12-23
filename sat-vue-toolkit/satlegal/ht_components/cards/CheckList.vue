<template>
  <v-card>
    <ByzantineCheckList
      :nameButton="nameButton"
      :list="list"
      @addGroup="addGroup"
      @removeGroup="removeGroup"
      @addItemInGroup="addItem"
      @removeItem="removeItem"
      @checkbox="checkbox"
    />
  </v-card>
</template>
<script>
import ByzantineCheckList from "./ByzantineCheckList";

export default {
  components: {
    ByzantineCheckList
  },
  props: {
    list: Array,
    nameButton: String
  },
  methods: {
    addGroup(groupName) {
      const clone = JSON.parse(JSON.stringify(this.list));
      clone.unshift({
        id: Math.random(),
        groupName,
        list: []
      });
      this.$emit("update", clone);
    },
    addItem({ groupId, name }) {
      const clone = JSON.parse(JSON.stringify(this.list));
      const find = clone.find(x => x.id === groupId);
      find.list.push({
        id: Math.random(),
        name,
        status: false
      });
      this.$emit("update", clone);
    },
    removeGroup(groupId) {
      const clone = JSON.parse(JSON.stringify(this.list));
      const remove = clone.filter(x => x.id !== groupId);
      this.$emit("update", remove);
    },
    removeItem({ groupId, id }) {
      const clone = JSON.parse(JSON.stringify(this.list));
      let findGroup = clone.find(x => x.id === groupId);
      let findIndexItem = findGroup.list.findIndex(x1 => x1.id === id);
      findGroup.list.splice(findIndexItem, 1);
      this.$emit("update", clone);
    },
    checkbox({ groupId, id, status }) {
      const clone = JSON.parse(JSON.stringify(this.list));
      const find = clone.find(x => x.id === groupId);
      find.list.find(x1 => x1.id === id).status = status;
      this.$emit("update", clone);
    }
  }
};
</script>
