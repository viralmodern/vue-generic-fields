<template>
  <td :style="{background: typeJoin.color}">
    <SelectInline
      :item="typeJoin"
      :items="evidenceType"
      keyText="name"
      keyColor="color"
      class="select"
      @select="$emit('update', $event.value)"
    >
      <template slot="section" slot-scope="props">
        <span>{{props.item.name}}</span>
      </template>
    </SelectInline>
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import { listColorCommon } from "../../config.js";

import SelectInline from "../menus/SelectInline";

export default {
  components: {
    SelectInline
  },
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      listColorCommon
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    evidenceType() {
      return (this.appConfigs.evidenceType || []).map((x, i) => ({
        ...x,
        color: this.listColorCommon[i].text
      }));
    },
    typeJoin() {
      return (
        (this.evidenceType || []).find(
          x => x.value === this.dataRow.evidenceType
        ) || {}
      );
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



