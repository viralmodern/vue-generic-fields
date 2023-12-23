<template>
  <td>
    <SelectInline
      :item="itemJoin"
      :items="characterType"
      keyText="name"
      keyColor="color"
      @select="select"
    />
  </td>
</template>

<script>
import SelectInline from "../../../menus/SelectInline";
import { characterType } from "../../../../config.js";
export default {
  components: {
    SelectInline
  },
  props: {
    column: Object,
    dataRow: Object
  },
  data() {
    return {
      characterType
    };
  },
  computed: {
    itemJoin() {
      return this.characterType.find(x => x.id === this.dataRow.avatar.type);
    }
  },
  methods: {
    select(item) {
      this.$emit("onChange", item.id);
    }
  }
};
</script>
