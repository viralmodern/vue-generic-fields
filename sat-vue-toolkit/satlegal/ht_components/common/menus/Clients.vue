<template>
  <MenuCharacters
    :textTooltip="textTooltip"
    icon="person_add"
    style="flex-wrap: unset;"
    :value="value"
    :valid="valid"
    :listCharacters="dataClients"
    @select="$emit('update', $event)"
    @onOpenMenu="$emit('onOpenMenu')"
  >
    <template slot="searchNoResult">
      <p>No matching results</p>
    </template>
  </MenuCharacters>
</template>

<script>
import { mapGetters } from "vuex";
import MenuCharacters from "../../menus/MenuCharacters";

export default {
  components: {
    MenuCharacters
  },
  props: {
    valid: Boolean,
    value: Array,
    textTooltip: {
      type: String,
      default: () => 'Add member',
    },
  },
  computed: {
    ...mapGetters("ht_store/project/clients", ["dataClients"])
  }
};
</script>
