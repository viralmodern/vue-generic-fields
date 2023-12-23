<template>
  <td :style="{background: strengThJoin.color}">
    <SelectInline
      :item="strengThJoin"
      :items="Strength"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    >
      <template slot="section" slot-scope="props">
        <span>{{props.item.name}}</span>
      </template>
    </SelectInline>
  </td>
</template>

<script>
import { mapActions } from "vuex";
import { Strength } from "@/sat-vue-toolkit/satlegal/config.js";

import SelectInline from "@/sat-vue-toolkit/satlegal/ht_components/menus/SelectInline";

export default {
  components: {
    SelectInline
  },
  props: {
    idGroup: [String, Number],
    dataRow: Object,
    column: Object
  },
  computed: {
    strengThJoin() {
      return this.Strength.find(x => x.id === this.dataRow.strength) || {};
    }
  },
  data() {
    return {
      Strength
    };
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["updateSubFactsSupport"]),
    select(item) {
      const { projectId, factId } = this.$route.params;
      const data = {
        matterId: projectId,
        itemId: this.dataRow.id,
        factId,
        supportId: this.idGroup,
        body: {
          strength: item.id
        }
      };
      this.updateSubFactsSupport(data);
    }
  }
};
</script>

<style>
.select {
  color: white;
}
.select /deep/ .v-menu__activator {
  justify-content: center;
}
</style>



