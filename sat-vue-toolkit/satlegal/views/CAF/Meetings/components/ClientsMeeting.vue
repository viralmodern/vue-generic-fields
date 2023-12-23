<template>
  <MenuChooseMemberMeeting
    :textTooltip="textTooltip"
    icon="person_add"
    style="flex-wrap: unset;"
    :value="value"
    :valid="valid"
    :listCharacters="dataClients"
    :isLoadingGet="isLoadingGet"
    :isLoadingUpdate="isLoadingUpdate"
    :isChooseInMeeting="isChooseInMeeting"
    @select="$emit('update', $event)"
    @selectRow="$emit('selectRow', $event)"
    @removeRow="$emit('removeRow', $event)"
    @onOpenMenu="$emit('onOpenMenu')"
  >
    <template slot="searchNoResult">
      <p>No matching results</p>
    </template>
  </MenuChooseMemberMeeting>
</template>

<script>
import { mapGetters } from "vuex";
import MenuChooseMemberMeeting from "@/sat-vue-toolkit/satlegal/ht_components/menus/MenuChooseMemberMeeting";

export default {
  components: {
    MenuChooseMemberMeeting
  },
  props: {
    valid: Boolean,
    value: Array,
    textTooltip: {
      type: String,
      default: () => 'Add member',
    },
    isLoadingGet: Boolean,
    isLoadingUpdate: Boolean,
    isChooseInMeeting: Boolean,
  },
  computed: {
    ...mapGetters("ht_store/project/clients", ["dataClients"])
  }
};
</script>
