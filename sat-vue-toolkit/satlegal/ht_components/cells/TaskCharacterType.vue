<template>
  <td :class="typeJoin.color">
    <SelectInline
      :item="typeJoin"
      :items="characterType"
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
import { characterType } from "../../config.js";

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
      return this.characterType.find(x => x.id === this.dataRow.characterType) || {};
    }
  },
  data() {
    return {
      characterType
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



