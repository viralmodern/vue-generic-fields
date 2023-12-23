<template>
  <div>
    <v-card v-for="item in supports" :key="item.id">
      <div class="px-3 py-2">
        <FactDetailSupportHeader
          :name="item.name"
          :message="sum(item.list)"
          @removeSupport="$emit('removeSupport', item.id)"
          @changeNameSupport="
            updateSupportFacts({
              matterId:$route.params.matter || $route.params.projectId,
              factId: $route.params.factId,
              supportId: item.id,
              body: { name: $event }
            })
          "
        />
      </div>
      <FactDetailSupportItem
        class="mb-2"
        :idGroup="item.id"
        :items="item.list"
      />
    </v-card>
    <v-row no-gutters class="justify-space-between">
      <v-btn
        v-if="!isShowAdd"
        outlined
        class="ma-0 my-2 primary--text"
        @click="isShowAdd = true"
      >
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
      <v-pagination
        v-model="page"
        :total-visible="7"
        :length="totals"
      ></v-pagination>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { arrayUnique } from "@/sat-vue-toolkit/satlegal/utils"
import AddInline from "@/sat-vue-toolkit/satlegal/ht_components/inputs/AddInline";

import FactDetailSupportItem from "./FactDetailSupportItem";
import FactDetailSupportHeader from "./FactDetailSupportHeader";

export default {
  components: {
    FactDetailSupportItem,
    FactDetailSupportHeader,
    AddInline
  },
  props: {
    supports: Array,
    total_support: Object
  },
  data() {
    return {
      isShowAdd: false,
      page: 1
    };
  },
  computed: {
    totals() {
      return Math.ceil((this.total_support / 20).toFixed(1)) || 1;
    }
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", [
      "postSupportFacts",
      "updateSupportFacts",
      "getSupportFacts"
    ]),
    sum(list) {
      let merge = [];
      list.forEach(x => {
        merge = arrayUnique(merge.concat(x.characters));
      });
      return merge.length;
    },
    addSupport(name) {
      const { factId, projectId } = this.$route.params;
      const data = {
        matterId: projectId,
        factId,
        body: {
          name,
          items: []
        }
      };
      this.postSupportFacts(data);
    }
  },
  watch: {
    page: {
      handler(page) {
        const { projectId, factId } = this.$route.params;
        this.getDataNotesRequest({ matterId: projectId, factId, page });
      }
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
