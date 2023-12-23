<template>
  <MenuChooseMemberMeeting
    :textTooltip="textTooltip"
    icon="mdi-account-multiple-plus"
    style="flex-wrap: unset;"
    :value="value"
    :valid="valid"
    :single="single"
    :listCharacters="members"
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
    single: Boolean,
    valid: Boolean,
    value: [Array, Number],
    textTooltip: {
      type: String,
      default: () => 'Add member',
    },
    isLoadingGet: Boolean,
    isLoadingUpdate: Boolean,
    isChooseInMeeting: Boolean
  },
  computed: {
    ...mapGetters("ht_store/clients/clientsCommon", ["members"])
  }
};
</script>
