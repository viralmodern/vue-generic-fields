<template>
  <MenuCharacters
    :textTooltip="textTooltip"
    icon="mdi-account-multiple-plus"
    style="flex-wrap: unset;"
    :value="value"
    :listCharacters="dataAllCharacter"
    single
    @select="$emit('update', $event)"
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
    value: [String, Number],
    textTooltip: String
  },
  computed: {
    ...mapGetters("ht_store/matter/character2", ["dataAllCharacter"])
  },
};
</script>
