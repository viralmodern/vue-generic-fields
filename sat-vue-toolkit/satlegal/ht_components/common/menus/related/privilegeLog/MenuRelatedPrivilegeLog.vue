<template>
  <div>
    <MenuRelated
      :width="318"
      :isShowMenu="isShowMenu"
      :positionX="positionX"
      :positionY="positionY"
      textTooltip="Add new"
      icon="mdi-account-multiple-plus"
      :value="valueMap"
      :list="(((dataPrivilege || {}).all || {}).results || []).map(x => ({...x, name: x.entry_name}))"
      :keyId="keyId"
      :to="{name: 'privilegeLogs', params: { listType: 'grid' }}"
      :isLoadingGet="isLoadingGet"
      :isLoadingSearch="isLoadingSearchPrivilegeLog"
      :single="single"
      :timeDelaySearch="500"
      title="List PrivilegeLog"
      @select="$emit('update', $event)"
      @selectItem="selectItem"
      @search="$_searchPrivilegeLogMixin_search"
      @onStartSearch="isLoadingSearch = true"
      @closeMenu="$emit('closeMenu')"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import searchdataPrivilegeLogMixin from "./mixins/searchPrivilegeLogMixin";

import MenuRelated from "../MenuRelated";

export default {
  mixins: [searchdataPrivilegeLogMixin],
  components: {
    MenuRelated
  },
  props: {
    positionX: Number,
    positionY: Number,
    isShowMenu: Boolean,

    value: [Array, Object],
    isEmitOpenMenu: Boolean,
    isLoadingGet: Boolean,
    single: Boolean,
    isShowAction: Boolean,
    keyId: {
      type: String,
      default: () => "id",
    },
  },
  computed: {
    valueMap() {
      if (!this.value) return [];
      if (Array.isArray(this.value)) {
        return this.value;
      } else {
        return [this.value];
      }
    },
  },
  methods: {
    selectItem(item) {
      if(item.check) {
        this.$emit('remove', item);
      } else {
        this.$emit('select', item)
      }
    },
  }
};
</script>
