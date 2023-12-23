<template>
  <div>
    <MenuRelated
      :width="318"
      :isParseIntKeyId="false"
      :isShowMenu="isShowMenu"
      :positionX="positionX"
      :positionY="positionY"
      textTooltip="Add new"
      icon="mdi-account-multiple-plus"
      :value="valueMap"
      :list="dataClients"
      :keyId="keyId"
      :to="{name: 'clients'}"
      :isLoadingGet="isLoadingGet"
      :isLoadingSearch="isLoadingSearchClient"
      :single="single"
      :timeDelaySearch="500"
      title="List Client"
      @select="$emit('update', $event)"
      @selectItem="selectItem"
      @search="$_searchClientMixin_search"
      @onStartSearch="isLoadingSearchClient = true"
      @closeMenu="$emit('closeMenu')"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import searchClientMixin from "./mixins/searchClientMixin";

import MenuRelated from "../MenuRelated";

export default {
  mixins: [searchClientMixin],
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
    dataClients() {
      return this.dataClientsNoGroup.map(x => ({
        ...x,
        name: x.first_name + " " + x.last_name
      }))
    },
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
