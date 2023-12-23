<template>
  <td>
    <MenuCharacters
      style="flex-wrap: unset;"
      :value="dataRow[column.name]"
      :listCharacters="character"
      @select="select"
    />
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import MenuCharacters from "../../../../menus/MenuCharacters";

export default {
  components: {
    MenuCharacters
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    select(data) {
      if (this.dataRow.treatmentTaken) {
        this.$emit("update", data);
      }
    }
  }
};
</script>
