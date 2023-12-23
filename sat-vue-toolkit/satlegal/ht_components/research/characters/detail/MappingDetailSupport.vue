<template>
  <div>
    <v-card v-for="item in supports" :key="item.id">
      <div class="px-3 py-2">
        <MappingDetailSupportHeader
          :name="item.name"
          :progress="average('progress',item.list)"
          :percent="average('percent',item.list)"
          :message="sum(item.list)"
        />
      </div>
      <TableMappingDetail
        @addSubItemInTabel="data => $emit('addSubItemInTabel', data)"
        class="mb-2"
        :expanId="expanId"
        :idGroup="item.id"
        :items="item.list"
      />
    </v-card>
    <div>
      <v-btn v-if="!isShowAdd" outlined class="ma-0 my-2 primary--text" @click="isShowAdd = true">
        <v-icon>mdi-add_circle</v-icon>
        <span>&nbsp;Add support</span>
      </v-btn>
      <AddInline
        v-else
        style="width:300px"
        class="py-2"
        @add="addSupport"
        @close="isShowAdd = false"
        hint="Enter to add new Checklist"
      />
    </div>
  </div>
</template>

<script>
import { arrayUnique } from "@/sat-vue-toolkit/satlegal/utils";

import TableMappingDetail from "./TableMappingDetail";
import MappingDetailSupportHeader from "./MappingDetailSupportHeader";
import AddInline from "../../../inputs/AddInline";

export default {
  components: {
    TableMappingDetail,
    MappingDetailSupportHeader,
    AddInline
  },
  props: {
    supports: Array,
    expanId: Number
  },
  data() {
    return {
      isShowAdd: false
    };
  },
  methods: {
    average(key, list) {
      const result = list.reduce((result, x) => (result += x[key]), 0);
      const av = result / list.length || 0;
      return Math.round(av);
    },
    sum(list) {
      let merge = [];
      list.forEach(x => {
        merge = arrayUnique(merge.concat(x.characters));
      });
      return merge.length;
    },
    addSupport(text) {
      const data = {
        expanId: this.expanId,
        data: {
          id: Math.floor(Math.random() * 1000 + 1),
          name: text,
          list: []
        }
      };
      this.$emit("addSupportRequest", data);
    }
  }
};
</script>

<style>
.badge /deep/ .v-badge__badge {
  font-size: 12px;
  height: 17px;
  width: 17px;
}
</style>
