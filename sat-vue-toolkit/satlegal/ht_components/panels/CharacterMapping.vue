<template>
  <v-expansion-panel :value="panel" expand class="class-name">
    <v-expansion-panel-content v-for="(item,i) in characterMapping" :key="i">
      <template slot="header">
        <v-row no-gutters class="align-center">
          <span class="text-body-2 mr-1">{{nameUser}}</span>
          has
          <span
            class="mr-1 ml-1 text-body-2"
            v-for="(e, i) in item.support"
            :key="i"
          >{{ e.name }}</span>
          with
          <TooltipSupportCharacter :listSupported="item.listSupported"/>
        </v-row>
      </template>
      <MappingDetailSupport
        @addSubItemInTabel="addSubItemInTabel"
        @addSupportRequest="addSupportRequest"
        :supports="item.support"
        :expanId="item.id"
      />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { mapActions } from "vuex";
import MappingDetailSupport from "../research/characters/detail/MappingDetailSupport";
import TooltipSupportCharacter from "../list/TooltipSupportCharacter";
export default {
  components: {
    MappingDetailSupport,
    TooltipSupportCharacter
  },
  props: {
    characterMapping: Array,
    nameUser: String,
    panel: Array
  },
  methods: {
    ...mapActions("ht_store/matter/character/characterProfile", [
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
