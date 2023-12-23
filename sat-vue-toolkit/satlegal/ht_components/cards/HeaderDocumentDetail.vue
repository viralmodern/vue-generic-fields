<template>
  <v-row no-gutters justify-center align-center class="pa-2">
    <v-col cols="12" sm="9">
      <v-row no-gutters class="mx-1">
        <v-col class="my-1">
          <span class="text--secondary">{{ item.documentName }}</span>
        </v-col>
        <v-col>
          <span v-if="item.clientName" class="subheading font-weight-bold">{{
            item.clientName.name
          }}</span>
        </v-col>
        <v-col class="my-1">
          <v-icon size="15" class="mr-1">mdi-alarm</v-icon>
          <span class="text--secondary">Last activity {{ timespan }}</span>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="3">
      <v-row no-gutters class="align-center" v-if="item.approvalStatus">
        <v-col class="text-xs-right">
          <v-menu
            v-model="menu"
            transition="scale-transition"
            offset-y
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-icon :color="item.approvalStatus.color">{{
                  item.approvalStatus.icon
                }}</v-icon>
                <span class="mx-2">{{ item.approvalStatus.name }}</span>
              </div>
            </template>
            <v-list>
              <v-list-item
                @click="changeData(val)"
                v-for="(val, index) in dataApprovalStatus"
                :key="index"
              >
                <v-icon :color="val.color">{{ val.icon }}</v-icon>
                <span
                  class="ml-2 primary--text"
                  v-if="val.id === item.approvalStatus.id"
                  >{{ val.name }}</span
                >
                <span class="ml-2" v-else>{{ val.name }}</span>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import moment from "moment";
import { dataApprovalStatus } from "../../config.js";
export default {
  props: {
    item: Object
  },
  data() {
    return {
      dataApprovalStatus,
      menu: false
    };
  },
  methods: {
    changeData(item) {
      this.$emit("changeStatusRequest", item);
      this.menu = false;
    }
  },
  computed: {
    timespan() {
      if (!this.item) return "";
      return moment(this.item.dueDate).fromNow();
    }
  }
};
</script>
