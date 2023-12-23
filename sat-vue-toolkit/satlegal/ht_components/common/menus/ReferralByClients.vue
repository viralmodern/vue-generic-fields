<template>
  <MenuRaferralByClients
    :pk="pk"
    :textTooltip="textTooltip"
    icon="mdi-account-multiple-plus"
    style="flex-wrap: unset;"
    :value="value"
    :valid="valid"
    :single="single"
    :listCharacters="dataClients"
    :isLoadingGet="isLoadingGet"
    :isLoadingUpdate="isLoadingUpdate"
    @select="$emit('update', $event)"
    @selectRow="$emit('selectRow', $event)"
    @removeRow="$emit('removeRow', $event)"
    @onOpenMenu="$emit('onOpenMenu')"
  >
    <template slot="searchNoResult">
      <p>No matching results</p>
    </template>
  </MenuRaferralByClients>
</template>

<script>
import { mapGetters } from "vuex";
import MenuRaferralByClients from "../../menus/MenuRaferralByClients";

export default {
  components: {
    MenuRaferralByClients
  },
  props: {
    pk: String,
    single: Boolean,
    valid: Boolean,
    value: [Array, String],
    textTooltip: {
      type: String,
      default: () => "Add Clients"
    },
    isLoadingGet: Boolean,
    isLoadingUpdate: Boolean
  },
  computed: {
    ...mapGetters("ht_store/clients/clientsCommon", ["dataClients"])
  }
};
</script>
