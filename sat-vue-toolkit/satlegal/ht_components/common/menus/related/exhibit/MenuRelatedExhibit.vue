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
      :list="dataExhibitNoGroup"
      :keyId="keyId"
      :isLoadingGet="isLoadingGet"
      :isLoadingSearch="isLoadingSearchExhibit"
      :single="single"
      :timeDelaySearch="500"
      title="List Exhibit"
      @select="$emit('update', $event)"
      @selectItem="selectItem"
      @search="$_searchExhibitMixin_search"
      @onStartSearch="isLoadingSearch = true"
      @closeMenu="$emit('closeMenu')"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import searchExhibitMixin from "./mixins/searchExhibitMixin";

import MenuRelated from "../MenuRelated";

export default {
  mixins: [searchExhibitMixin],
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
