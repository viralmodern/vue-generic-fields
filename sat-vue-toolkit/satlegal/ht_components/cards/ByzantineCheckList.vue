<template>
  <v-row no-gutters class="px-2">
    <v-col cols="12">
      <v-row no-gutters class="align-center">
        <v-btn
          v-if="!isShow"
          @click="isShow = true"
          class="mx-0"
          color="primary"
        >
          <span>Add {{ nameButton }}</span>
          <v-icon>mdi-add</v-icon>
        </v-btn>
        <AddInline
          v-else
          style="width:300px"
          class="py-2"
          @add="addGroup"
          @close="closeAdd"
          :hint="`Enter to add new ${nameButton}`"
        />
      </v-row>
    </v-col>
    <v-col cols="12">
      <span v-if="!list || !list.length"
        >There is no note for display, click Add checklist button to start
        adding.</span
      >
      <TaskChecklist
        v-for="item in list"
        :key="item.id"
        :groupName="item.groupName"
        :list="item.list"
        @checkbox="$emit('checkbox', { groupId: item.id, ...$event })"
        @addItemInGroup="
          $emit('addItemInGroup', { name: $event, groupId: item.id })
        "
        @removeGroup="$emit('removeGroup', item.id)"
        @removeItem="$emit('removeItem', { id: $event, groupId: item.id })"
        @updateItem="$emit('updateItem', { ...$event, groupId: item.id })"
      />
    </v-col>
  </v-row>
</template>

<script>
import AddInline from "../inputs/AddInline";
import TaskChecklist from "./TaskChecklist";
export default {
  props: {
    list: Array,
    nameButton: String
  },
  components: {
    TaskChecklist,
    AddInline
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    addGroup(groupName) {
      this.$emit("addGroup", groupName);
      this.closeAdd();
    },
    closeAdd() {
      this.isShow = false;
    }
  }
};
</script>
