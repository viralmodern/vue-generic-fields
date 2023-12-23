<template>
  <td :style="{background: typeJoin.color}">
    <SelectInline
      :item="typeJoin"
      :items="typeFacts"
      keyText="name"
      keyColor="color"
      class="select"
      @select="$emit('update', $event.id)"
    >
      <template slot="section" slot-scope="props">
        <span>{{props.item.name}}</span>
      </template>
    </SelectInline>
  </td>
</template>

<script>
import { typeFacts, listColorCommon } from "../../config.js";

import SelectInline from "../menus/SelectInline";

export default {
  components: {
    SelectInline
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    typeJoin() {
      return this.typeFacts.find(x => x.id === this.dataRow.factType) || {};
    }
  },
  data() {
    return {
      typeFacts: typeFacts.map((x, i) => ({
        ...x,
        color: listColorCommon[i].text
      })),
      listColorCommon
    };
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



