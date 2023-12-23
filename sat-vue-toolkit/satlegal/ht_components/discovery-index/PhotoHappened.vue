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
      <TablePhotoIndexDetail
        @addSubPhotoInTabel="data => $emit('addSubPhotoInTabel', data)"
        @updateTableSupport="data => $emit('updateTableSupport', data)"
        class="mb-2"
        :expanId="expanId"
        :idGroup="item.id"
        :items="item.list"
      />
    </v-card>
    <div>
      <v-btn v-if="!isShowAdd" outlined class="ma-0 my-2 primary--text" @click="isShowAdd = true">
        <v-icon>mdi-add_circle</v-icon>
        <span>&nbsp;Add what happened</span>
      </v-btn>
      <AddInline
        v-else
        style="width:300px"
        class="py-2"
        @add="addSupport"
        @close="isShowAdd = false"
        hint="Enter to add new happened"
      />
    </div>
  </div>
</template>

<script>
import { arrayUnique } from "@/sat-vue-toolkit/satlegal/utils";

import TablePhotoIndexDetail from "./TablePhotoIndexDetail";
import MappingDetailSupportHeader from "../research/characters/detail/MappingDetailSupportHeader";
import AddInline from "../inputs/AddInline";

export default {
  components: {
    TablePhotoIndexDetail,
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
      const result = list && list.reduce((result, x) => (result += x[key]), 0);
      const av = (result / list && list.length) || 0;
      return Math.round(av);
    },
    sum(list) {
      let merge = [];
      list &&
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
      this.$emit("addItemPhotoRequest", data);
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
