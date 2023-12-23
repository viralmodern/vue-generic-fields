<template>
  <div>
    <MenuRelated2
      :width="318"
      :isShowMenu="isShowMenu"
      :positionX="positionX"
      :positionY="positionY"
      textTooltip="Add new"
      :to="toRequestItemDetail"
      icon="mdi-account-multiple-plus"
      :value="valueMap"
      :list="dataListNoGroup"
      :keyId="keyId"
      :isLoadingGet="isLoadingGet"
      :isLoadingSearch="isLoadingSearchRequestSetItemDetail"
      :single="single"
      :timeDelaySearch="500"
      title="List Request Set Item"
      @select="$emit('update', $event)"
      @selectItem="selectItem"
      @search="search"
      @onStartSearch="isLoadingSearchRequestSetItemDetail = true"
      @closeMenu="$emit('closeMenu')"
    />
  </div>
</template>

<script>
import searchRequestSetItemDetailMixin from "./mixins/searchRequestSetItemDetailMixin";

import MenuRelated2 from "../MenuRelated2";

export default {
  mixins: [searchRequestSetItemDetailMixin],
  components: {
    MenuRelated2
  },
  props: {
    matterId: [Number, String],
    requestSetId: [Number, String],
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
    }
  },
  computed: {
    toRequestItemDetail() {
      return {
        name: 'RequestSetItems',
        params: {
          requestSetId: this.requestSetId
        },
      }
    },
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
    search(text){
      const query = {
        idParams: {
          matterId: this.matterId,
          rSId: this.requestSetId,
        },
        searchObject: {
          ungroup: true,
          name: text,
        },
        isFirstCall: true
      }
      this.$_searchRequestSetItemDetailMixin_search(query);
    },
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
