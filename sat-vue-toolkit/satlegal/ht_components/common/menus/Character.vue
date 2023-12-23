<template>
  <MenuCharacters
    textTooltip="Add character"
    icon="mdi-account-multiple-plus"
    style="flex-wrap: unset;"
    :value="value"
    :listCharacters="character"
    @select="$emit('update', $event)"
    @onOpenMenu="$emit('onOpenMenu')"
  />
</template>

<script>
import { mapGetters } from "vuex";
import MenuCharacters from "../../menus/MenuCharacters";

export default {
  components: {
    MenuCharacters
  },
  props: {
    value: Array,
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"])
  }
};
</script>
