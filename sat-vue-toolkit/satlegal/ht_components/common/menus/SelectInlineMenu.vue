<template>
  <v-row no-gutters>
    <slot name="section" :items="value"></slot>&nbsp;
    <MenuList
      :textTooltip="textTooltip"
      :icon="icon"
      @select="$emit('select', $event)"
      :list="listMap"
      :title="title"
      :labelSearch="labelSearch"
      :name="name"
      :to="to"
      :keySearch="keySearch"
      :isLoadingSearch="isLoadingSearch"
      :isSearchClient="isSearchClient"
      :isLoadingGet="isLoadingGet"
      :timeDelaySearch="timeDelaySearch"
      :isShowAction="isShowAction"
      :keyId="keyId"
      @onClickAdd="$emit('onClickAdd')"
      @onOpenMenu="$emit('onOpenMenu')"
      @onStartSearch="$emit('onStartSearch')"
      @search="$emit('search', $event)"
    >
      <template slot="searchNoResult">
        <slot name="searchNoResult"></slot>
      </template>
      <template slot="item" slot-scope="{item}">
        <slot name="item" :item="item"></slot>
      </template>
    </MenuList>
  </v-row>
</template>

<script>
import MenuList from "./MenuList";
export default {
  components: {
    MenuList
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
    isLoadingSearch: Boolean,
    isSearchClient: Boolean,
    isLoadingGet: Boolean,
    isShowAction: Boolean,
    timeDelaySearch: Number,
    keyId: {
      type: String,
      default: () => "id",
    },
  },
  computed: {
    listMap() {
      const clone = JSON.parse(JSON.stringify(this.list || []));
      const result = clone.map(x => {
        if ((this.value || []).some(v => +v[this.keyId] === +x[this.keyId])) {
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
