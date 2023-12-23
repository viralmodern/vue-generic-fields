<template>
  <td>
    <MenuCharacters
      style="flex-wrap: unset;"
      :value="dataRow[column.name]"
      :listCharacters="character"
      single
      @select="$emit('update', $event)"
    />
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import MenuCharacters from "../menus/MenuCharacters";

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
  }
};
</script>
