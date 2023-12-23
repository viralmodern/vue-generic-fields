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
      :list="(((dataCharacter || {}).all || {}).results || []).map(x => ({...x, name: x.last_name + ' ' + x.first_name}))"
      :keyId="keyId"
      :isLoadingGet="isLoadingGet"
      :isLoadingSearch="isLoadingSearchCharacter"
      :isLoadingUpdate="isLoadingUpdate"
      :single="single"
      :timeDelaySearch="500"
      title="List Characters"
      @select="$emit('update', $event)"
      @selectItem="selectItem"
      @search="$_searchCharacterMixin_search"
      @onStartSearch="isLoadingSearchCharacter = true"
      @closeMenu="$emit('closeMenu')"
    />
  </div>
</template>

<script>
import searchCharacterMixin from "./mixins/searchCharacterMixin";

import MenuRelated2 from "../MenuRelated2";

export default {
  mixins: [searchCharacterMixin],
  components: {
    MenuRelated2
  },
  props: {
    positionX: Number,
    positionY: Number,
    isShowMenu: Boolean,

    value: [Array, Object],
    isLoadingGet: Boolean,
    isLoadingUpdate: Boolean,
    single: Boolean,
    isShowAction: Boolean,
    keyId: {
      type: String,
      default: () => "id"
    },
    to: {
      type: [Object, String],
      default: () => ({ name: 'CharacterLayout'})
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
