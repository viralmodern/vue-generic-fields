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
      :list="dataEvidences"
      :keyId="keyId"
      :isLoadingGet="isLoadingGet"
      :isLoadingSearch="isLoadingSearchEvidence"
      :single="single"
      :timeDelaySearch="500"
      title="List Evidence"
      @select="$emit('update', $event)"
      @selectItem="selectItem"
      @search="$_searchEvidenceMixin_search"
      @onStartSearch="isLoadingSearchEvidence = true"
      @closeMenu="$emit('closeMenu')"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import searchEvidenceMixin from "./mixins/searchEvidenceMixin";

import MenuRelated from "../MenuRelated";

export default {
  mixins: [searchEvidenceMixin],
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
    to: {
      type: [Object, String],
      default: () => ({ name: 'evidencesSlickGrid'})
    }
  },
  data() {
    return {
      isCallApi: false,
      isLoading: false,
    };
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
