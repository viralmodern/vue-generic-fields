<template>
  <td>
    <v-menu
      style="width: 130px"
      transition="scale-transition"
      offset-y
      left
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ totalChecked }}/{{ totals }}</span>
      </template>
      <ByzantineCheckList
        nameButton="Checklist"
        style="width:700px"
        :list="this.dataRow.checkList"
        @addGroup="addGroup"
        @removeGroup="removeGroup"
        @addItemInGroup="addItemInGroup"
        @removeItem="removeItemInGroup"
        @checkbox="checkItem"
      />
    </v-menu>
  </td>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import ByzantineCheckList from "../cards/ByzantineCheckList";

export default {
  components: {
    ByzantineCheckList
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    listCheckLists() {
      return this.dataRow.checkList.reduce(
        (x, result) => (x = [...x, ...result.list]),
        []
      );
    },
    totals() {
      return this.listCheckLists.length;
    },
    totalChecked() {
      return this.listCheckLists.filter(x => x.status).length;
    }
  },
  methods: {
    async addGroup(groupName) {
      const data = {
        newValue: {
          groupName,
          handleName: "addGroup"
        },
        columnName: this.column.name,
        taskId: this.dataRow.id
      };
      const result = await this.addGroupChecklistRequest(data);
      if (result.status) {
        this.updateTaskSuccess(data);
      }
    },
    async removeGroup(id) {
      const data = {
        newValue: {
          id,
          handleName: "removeGroup"
        },
        columnName: this.column.name,
        taskId: this.dataRow.id
      };
      const result = await this.deleteGroupChecklistRequest(data);
      if (result.status) {
        this.updateTaskSuccess(data);
      }
    },
    async addItemInGroup({ groupId, name }) {
      const data = {
        newValue: {
          groupId,
          name,
          handleName: "addItemInGroup"
        },
        columnName: this.column.name,
        taskId: this.dataRow.id
      };
      const result = await this.addItemInGroupChecklistRequest(data);
      if (result.status) {
        this.updateTaskSuccess(data);
      }
    },
    async removeItemInGroup({ groupId, id }) {
      const data = {
        newValue: {
          groupId,
          id,
          handleName: "removeItemInGroup"
        },
        columnName: this.column.name,
        taskId: this.dataRow.id
      };
      const result = await this.removeItemInGroupChecklistRequest(data);
      if (result.status) {
        this.updateTaskSuccess(data);
      }
    },
    async checkItem({ groupId, id, status }) {
      const data = {
        newValue: {
          groupId,
          id,
          status,
          handleName: "checkItem"
        },
        columnName: this.column.name,
        taskId: this.dataRow.id
      };
      const result = await this.checkItemRequest(data);
      if (result.status) {
        this.updateTaskSuccess(data);
      }
    },
    ...mapActions("ht_store/task/list/checklist", [
      "addGroupChecklistRequest",
      "deleteGroupChecklistRequest",
      "addItemInGroupChecklistRequest",
      "removeItemInGroupChecklistRequest",
      "checkItemRequest"
    ]),
    ...mapMutations("ht_store/task/list", ["updateTaskSuccess"])
  }
};
</script>
