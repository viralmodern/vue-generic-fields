<template>
  <SelectInlineMenu
    :textTooltip="textTooltip"
    :icon="icon"
    class="custom"
    :value="value"
    :list="list"
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
    @select="select"
    @onOpenMenu="$emit('onOpenMenu')"
    @onStartSearch="$emit('onStartSearch')"
    @search="$emit('search', $event)"
  >
    <template slot-scope="{ items }" slot="section">
      <v-tooltip v-for="item in items.slice(0,lengthDisplay)" :key="item[keyId]" bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            <v-chip small class="mr-2">{{item.name}}</v-chip>
          </span>
        </template>
        <span>{{ item.name || "" }}</span>
      </v-tooltip>
      <v-chip
        v-if="items.length > lengthDisplay"
        label
        small
      >
        <span>+ {{ items.length - lengthDisplay }}</span>
      </v-chip>
    </template>
    <template slot-scope="{ item }" slot="item">
      <v-list-item-avatar class="border mr-3">
        <v-icon v-if="item.check">done</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-row no-gutters class="align-center" style="width:100%">
          <v-col cols="12" class="px-1 text-body-2">
            <div>{{ item.name }}</div>
          </v-col>
        </v-row>
      </v-list-item-content>
    </template>
  </SelectInlineMenu>
</template>

<script>
import SelectInlineMenu from "./SelectInlineMenu";
import UserAvatar from "../../avatars/UserAvatar";

export default {
  components: {
    SelectInlineMenu,
    UserAvatar
  },
  props: {
    value: [Array],
    list: Array,
    single: Boolean,
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
    isShowAction: Boolean,
    lengthDisplay: {
      type: Number,
      default: () => 3,
    },
    keyId: {
      type: String,
      default: () => "id",
    },
    timeDelaySearch: Number,
  },
  methods: {
    select(item) {
      let data;
      if (this.single) {
        data = this.selectSingle(item.check, item);
      } else {
        data = this.selectMultiple(item.check, item);
      }
      this.$emit("select", data);
      this.$emit("selectItem", item);
    },
    selectMultiple(check, item) {
      let data;
      if (check) {
        data = (this.value || []).filter(x => x[this.keyId] !== item[this.keyId]);
      } else {
        data = [...this.value, item];
      }
      return data;
    },
    selectSingle(check, item) {
      let data;
      if (check) {
        data = null;
      } else {
        data = item;
      }
      return data;
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
