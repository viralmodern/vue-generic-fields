<template>
  <MenuCharacters
    :textTooltip="textTooltip"
    icon="mdi-account-multiple-plus"
    style="flex-wrap: unset;"
    :value="value"
    :valid="valid"
    :single="single"
    :listCharacters="dataMembersNotExitsCurrentUser"
    :isLoadingGet="isLoadingGet"
    :isLoadingUpdate="isLoadingUpdate"
    @select="$emit('update', $event)"
    @selectRow="$emit('selectRow', $event)"
    @removeRow="$emit('removeRow', $event)"
    @onOpenMenu="$emit('onOpenMenu')"
    :isShowOpenMenu="isShowOpenMenu"
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
    single: Boolean,
    valid: Boolean,
    value: [Array, Number],
    textTooltip: {
      type: String,
      default: () => 'Add member',
    },
    isLoadingGet: Boolean,
    isLoadingUpdate: Boolean,
    isShowOpenMenu: {
      type: Boolean,
      default: () => true
    },
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["dataMembersNotExitsCurrentUser"])
  }
};
</script>
