<template>
  <div>
    <MenuRelated2
      :to="to"
      :width="318"
      :isShowMenu="isShowMenu"
      :positionX="positionX"
      :positionY="positionY"
      textTooltip="Add new"
      icon="mdi-account-multiple-plus"
      :value="valueMap"
      :list="dataRequestItemNoGroup"
      :keyId="keyId"
      :isLoadingGet="isLoadingGet"
      :isLoadingSearch="isLoadingSearchRequestSetItem"
      :single="single"
      :timeDelaySearch="500"
      title="List Request Set Item"
      @select="$emit('update', $event)"
      @selectItem="selectItem"
      @search="$_searchRequestSetItemMixin_search"
      @onStartSearch="isLoadingSearchRequestSetItem = true"
      @closeMenu="$emit('closeMenu')"
    >
      <template slot="searchNoResult">
        <slot name="searchNoResult"></slot>
      </template>
    </MenuRelated2>
  </div>
</template>

<script>
import searchRequestSetItemMixin from "./mixins/searchRequestSetItemMixin";

import MenuRelated2 from "../MenuRelated2";

export default {
  mixins: [searchRequestSetItemMixin],
  components: {
    MenuRelated2
  },
  props: {
    positionX: Number,
    positionY: Number,
    isShowMenu: Boolean,

    value: [Array, Number, String],
    isLoadingGet: Boolean,
    single: Boolean,
    isShowAction: Boolean,
    keyId: {
      type: String,
      default: () => "id"
    },
    to: [Object, String]
  },
  computed: {
    valueMap() {
      if (!this.value) return [];
      if (Array.isArray(this.value)) {
        return this.value;
      } else {
        return [this.value];
      }
    }
  },
  methods: {
    selectItem(item) {
      if (item.check) {
        this.$emit("remove", item);
      } else {
        this.$emit("select", item);
      }
    }
  }
};
</script>
