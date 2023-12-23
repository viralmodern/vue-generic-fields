<template>
  <div>
    <MenuRelated
      :to="to"
      :width="318"
      :isShowMenu="isShowMenu"
      :positionX="positionX"
      :positionY="positionY"
      textTooltip="Add new"
      icon="mdi-account-multiple-plus"
      :value="valueMap"
      :list="((dataList || {}).all || {}).results"
      :keyId="keyId"
      :isLoadingGet="isLoadingGet"
      :isLoadingSearch="isLoadingSearchRequestSet"
      :single="single"
      :timeDelaySearch="500"
      title="List Request Set"
      @select="$emit('update', $event)"
      @selectItem="selectItem"
      @search="$_searchRequestSetMixin_search"
      @onStartSearch="isLoadingSearchRequestSet = true"
      @closeMenu="$emit('closeMenu')"
    />
  </div>
</template>

<script>
import searchRequestSetMixin from "./mixins/searchRequestSetMixin";

import MenuRelated from "../MenuRelated";

export default {
  mixins: [searchRequestSetMixin],
  components: {
    MenuRelated
  },
  props: {
    positionX: Number,
    positionY: Number,
    isShowMenu: Boolean,

    value: [Array, Object],
    isLoadingGet: Boolean,
    single: Boolean,
    isShowAction: Boolean,
    keyId: {
      type: String,
      default: () => "id"
    },
    to: {
      type: [Object, String],
      default: () => ({ name: 'RequestSet'})
    }
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
