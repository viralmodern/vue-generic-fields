<template>
  <v-expansion-panel :value="panel" expand class="class-name">
    <v-expansion-panel-content v-for="(item,i) in items" :key="i">
      <template slot="header">
        <v-row no-gutters class="align-center">
          <span class="font-weight-bold">What happened ?</span>
          <!-- <span class="font-weight-bold">What happened #{{i + 1}} ?</span> -->
          <!-- <span class="ml-2">{{item.timeHappen | formatMMDDYYYYHHMM}}</span> -->
        </v-row>
      </template>
      <PhotoHappened
        @addItemPhotoRequest="addItemPhotoRequest"
        @addSubPhotoInTabel="addSubPhotoInTabel"
        :supports="item.support"
        :expanId="item.id"
      />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { mapActions } from "vuex";
import PhotoHappened from "../discovery-index/PhotoHappened";
export default {
  components: {
    PhotoHappened
  },
  props: {
    items: Array,
    panel: Array
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/index/detailIndex", [
      "addItemPhotoRequest",
      "addSubPhotoInTabel"
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
