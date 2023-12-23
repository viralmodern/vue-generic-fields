<template>
  <v-row no-gutters>
    <slot name="section" :items="valueJoin"></slot>&nbsp;
    <MenuListTax
      :textTooltip="textTooltip"
      :icon="icon"
      @select="$emit('select', $event)"
      :list="listMap"
      :title="title"
      :labelSearch="labelSearch"
      :name="name"
      :to="to"
      :valid="valid"
      :keySearch="keySearch"
      :isLoadingGet="isLoadingGet"
      :isLoadingUpdate="isLoadingUpdate"
      :isShowOpenMenu="isShowOpenMenu"
      @onOpenMenu="$emit('onOpenMenu')"
    >
      <template slot="searchNoResult">
        <slot name="searchNoResult"></slot>
      </template>
      <template slot="item" slot-scope="{item}">
        <slot name="item" :item="item"></slot>
      </template>
    </MenuListTax>
  </v-row>
</template>

<script>
import MenuListTax from "../menus/MenuListTax";
export default {
  components: {
    MenuListTax
  },
  props: {
    value: Array,
    list: Array,
    title: String,
    labelSearch: String,
    name: String,
    to: [Object, String],
    keySearch: String,
    icon: String,
    textTooltip: String,
    valid: Boolean,
    isLoadingGet: Boolean,
    isLoadingUpdate: Boolean,
    isShowOpenMenu: {
      type: Boolean,
      default: () => true
    },
  },
  computed: {
    valueJoin() {
      const map = (this.list || []).filter(x =>
        (this.value || []).includes(x.id)
      );
      return map;
    },
    listMap() {
      const clone = JSON.parse(JSON.stringify(this.list || []));
      const result = clone.map(x => {
        if ((this.value || []).includes(x.id)) {
          x.check = true;
        } else {
          x.check = false;
        }
        return x;
      });
      return result;
    }
  }
};
</script>
