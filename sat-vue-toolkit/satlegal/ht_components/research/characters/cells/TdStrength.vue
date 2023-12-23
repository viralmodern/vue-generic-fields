<template>
  <td>
    <SelectInline
      :item="strengThJoin"
      :items="Strength"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </td>
</template>

<script>
import { mapActions } from "vuex";
import { Strength } from "../../../../config.js";

import SelectInline from "../../../menus/SelectInline";

export default {
  components: {
    SelectInline
  },
  props: {
    idGroup: Number,
    dataRow: Object,
    column: Object,
    expanId: Number
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
    select(item) {
      const data = {
        expanId: this.expanId,
        idGroup: this.idGroup,
        columnName: this.column.name,
        id: this.dataRow.id,
        newValue: item.id
      };
      this.updateTaskSupport(data);
    },
    ...mapActions("ht_store/matter/character/characterProfile", ["updateTaskSupport"])
  }
};
</script>
