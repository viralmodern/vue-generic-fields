<template>
  <MenuListRefactor
    :width="width"
    :isShowMenu="isShowMenu"
    :positionX="positionX"
    :positionY="positionY"
    :textTooltip="textTooltip"
    :icon="icon"
    class="custom"
    :list="listMap"
    :title="title"
    :labelSearch="labelSearch"
    :name="name"
    :to="to"
    :keySearch="keySearch"
    :isLoadingSearch="isLoadingSearch"
    :isSearchClient="isSearchClient"
    :isLoadingGet="isLoadingGet"
    :isLoadingUpdate="isLoadingUpdate"
    :timeDelaySearch="timeDelaySearch"
    :isShowAction="isShowAction"
    :keyId="keyId"
    @onClickAdd="$emit('onClickAdd')"
    @select="select"
    @onOpenMenu="$emit('onOpenMenu')"
    @onStartSearch="$emit('onStartSearch')"
    @search="$emit('search', $event)"
    @closeMenu="$emit('closeMenu')"
  >
    <template slot="searchNoResult">
      <slot name="searchNoResult"></slot>
    </template>
    <template slot-scope="{ items }" slot="section">
      <v-tooltip
        v-for="item in items.slice(0, lengthDisplay)"
        :key="item[keyId]"
        bottom
      >
        <template v-slot:activator="{ on }">
          <span v-on="on">
            <v-chip small class="mr-2">{{ item.name }}</v-chip>
          </span>
        </template>
        <span>{{ item.name || "" }}</span>
      </v-tooltip>
      <v-chip v-if="items.length > lengthDisplay" label small>
        <span>+ {{ items.length - lengthDisplay }}</span>
      </v-chip>
    </template>
    <template slot-scope="{ item }" slot="item">
      <v-list-item-avatar class="border mr-3">
        <v-icon v-if="item.check">done</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <slot v-if="!!$scopedSlots.content" name="content" :props="{ item }"></slot>
        <v-row v-else no-gutters class="align-center" style="width:100%">
          <v-col cols="12" class="px-1 text-body-2">
            <div>{{ item.name }}</div>
          </v-col>
        </v-row>
      </v-list-item-content>
    </template>
  </MenuListRefactor>
</template>

<script>
import MenuListRefactor from "../MenuListRefactor";

export default {
  components: {
    MenuListRefactor
  },
  props: {
    positionX: Number,
    positionY: Number,
    isShowMenu: Boolean,
    width: Number,

    value: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default: () => [],
    },
    icon: String,
    textTooltip: String,
    name: String,
    keySearch: {
      type: String,
      default: () => "name"
    },
    labelSearch: {
      type: String,
      default: () => "search"
    },
    title: {
      type: String,
      default: () => "List"
    },
    to: Object,
    isLoadingSearch: Boolean,
    isSearchClient: Boolean,
    isLoadingGet: Boolean,
    isLoadingUpdate: Boolean,
    isShowAction: Boolean,
    lengthDisplay: {
      type: Number,
      default: () => 3
    },
    keyId: {
      type: String,
      default: () => "id"
    },
    timeDelaySearch: Number
  },
  computed: {
    listMap() {
      const result = this.list.map(x => {
        if ((this.value || []).some(v => +v[this.keyId] === +x[this.keyId])) {
          x.check = true;
        } else {
          x.check = false;
        }
        return x;
      });
      return result;
    }
  },
  methods: {
    select(item) {
      this.$emit("selectItem", item);
    }
  }
};
</script>

<style scoped>
.custom {
  align-items: center;
  flex-wrap: wrap;
}
.border {
  height: 30px !important;
  min-width: 30px !important;
  width: 30px !important;
  border: 1px solid silver;
}
</style>
