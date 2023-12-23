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
      :list="dataDocketNoGroup"
      :keyId="keyId"
      :isLoadingGet="isLoadingGet"
      :isLoadingSearch="isLoadingSearchDocket"
      :single="single"
      :timeDelaySearch="500"
      title="List Docket"
      @select="$emit('update', $event)"
      @selectItem="selectItem"
      @search="$_searchDocketMixin_search"
      @onStartSearch="isLoadingSearch = true"
      @closeMenu="$emit('closeMenu')"
    >
      <template v-slot:content="{ props: { item } }">
        <div class="mb-2">{{ item.description }}</div>
        <div class="text-caption">
          {{ item.date_added }},
          <v-chip
            v-for="(itemConstant, index) in list"
            :key="index"
            class="mr-1"
            x-small
            :color="
              findType(
                item[itemConstant.field],
                appConfigChoices[appConfigConstants[itemConstant.constant]]
              ).color
            "
            >{{
              findType(
                item[itemConstant.field],
                appConfigChoices[appConfigConstants[itemConstant.constant]]
              ).label
            }}</v-chip
          >
        </div>
      </template>
    </MenuRelated>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import searchDocketMixin from "./mixins/searchDocketMixin";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";

import MenuRelated from "../MenuRelated";

export default {
  mixins: [searchDocketMixin, appConfigMixin],
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
      default: () => "id"
    }
  },
  data() {
    return {
      list: [
        {
          constant: "MATTER_DOCKET_ENTRY",
          field: "filed_by"
        },
        {
          constant: "MATTER_DOCKET_ENTRY_TYPE",
          field: "entry_type"
        }
      ]
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
    },
    findType(value, list) {
      return list.find(x => x.value === value) || {};
    }
  }
};
</script>
