<template>
  <td>
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <v-icon :color="dataRow.approvalStatus.color">{{
            dataRow.approvalStatus.icon
          }}</v-icon>
          <span class="ml-2">{{ dataRow.approvalStatus.name }}</span>
        </div>
      </template>
      <v-list>
        <v-list-item
          @click="changeData(item)"
          v-for="(item, index) in dataApprovalStatus"
          :key="index"
        >
          <v-icon :color="item.color">{{ item.icon }}</v-icon>
          <span class="ml-2">{{ item.name }}</span>
        </v-list-item>
      </v-list>
    </v-menu>
  </td>
</template>
<script>
import { dataApprovalStatus } from "../../config.js";
export default {
  data() {
    return {
      dataApprovalStatus,
      approvalStatus: {},
      menu: false
    };
  },
  props: {
    dataRow: Object
  },
  methods: {
    changeData(item) {
      const data = {
        id: this.dataRow.id,
        value: item,
        nameRow: "approvalStatus"
      };
      this.$emit("changeDocument", data);
      this.menu = false;
    }
  },
  mounted() {
    this.approvalStatus = this.dataRow.approvalStatus;
  }
};
</script>
