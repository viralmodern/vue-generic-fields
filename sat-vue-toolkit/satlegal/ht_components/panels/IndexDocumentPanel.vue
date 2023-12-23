<template>
  <v-expansion-panel :value="panel" expand class="class-name">
    <v-expansion-panel-content v-for="(item,i) in items" :key="i">
      <template slot="header">
        <v-row no-gutters class="align-center">
          <span>Page {{item.page}}</span>
        </v-row>
      </template>
      <DocumentHightLight
        @addSupportRequest="addSupportRequest"
        @addSubItemInTabel="addSubItemInTabel"
        :supports="item.support"
        :expanId="item.id"
      />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { mapActions } from "vuex";
import DocumentHightLight from "../discovery-index/DocumentHightLight";
export default {
  components: {
    DocumentHightLight
  },
  props: {
    items: Array,
    panel: Array
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/index/detailIndex", [
      "addSupportRequest",
      "addSubItemInTabel"
    ])
  }
};
</script>
<style lang="stylus" scoped>
.class-name {
  span::last-child {
    b {
      display: none;
    }
  }
}
</style>
