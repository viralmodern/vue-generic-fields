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
      :list="dataDepositionNoGroup"
      :keyId="keyId"
      :to="{name: 'discoveryDeposition'}"
      :isLoadingGet="isLoadingGet"
      :isLoadingSearch="isLoadingSearchDeposition"
      :single="single"
      :timeDelaySearch="500"
      title="List Deposition"
      @select="$emit('update', $event)"
      @selectItem="selectItem"
      @search="$_searchDepositionMixin_search"
      @onStartSearch="isLoadingSearchDeposition = true"
      @closeMenu="$emit('closeMenu')"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import searchDepositionMixin from "./mixins/searchDepositionMixin";

import MenuRelated from "../MenuRelated";

export default {
  mixins: [searchDepositionMixin],
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
