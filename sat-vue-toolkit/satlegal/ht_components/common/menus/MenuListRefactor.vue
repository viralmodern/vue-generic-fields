<template>
  <BasicMenu
    :width="width"
    :isShowMenu="isShowMenu"
    :positionX="positionX"
    :positionY="positionY"
    :title="title"
    @closeMenu="$emit('closeMenu')"
  >
    <template v-slot:content>
      <div class="menu-list">
        <Sniper :isLoading="isLoadingGet || isLoadingUpdate" />
        <v-list style="width:100%">
          <div class="ma-2">
            <v-text-field
              class="input-search"
              hide-details
              solo
              :value="search"
              :placeholder="labelSearch"
              @input="handleSearch"
              :loading="isLoadingSearch"
            ></v-text-field>
          </div>
          <div class="scroll-list">
            <div
              style="width: 326px;text-align: center;padding: 5px 25px;"
              v-if="!searchList.length"
            >
              <slot v-if="!!$scopedSlots.searchNoResult" name="searchNoResult"></slot>
              <div v-else>
                There is no
                <b>{{ name }}</b>
                matched with your search pattern. Please consider adding
                {{ name }} first. Click
                <router-link :to="to || ''" target="_blank">here</router-link>
                to {{ name }} add
              </div>
            </div>
            <div
              v-else
              v-for="item in searchList"
              :key="item[keyId]"
              class="my-2"
            >
              <v-list-item ripple @click.prevent="$emit('select', item)">
                <slot name="item" :item="item"></slot>
              </v-list-item>
            </div>
          </div>
          <div v-if="isShowAction" class="text-right">
            <v-divider></v-divider>
            <v-btn
              text
              small
              @click="$emit('onClickAdd')"
              class="ma-0 mt-2 text-body-2"
              style="text-transform: none;"
              color="primary"
              >Add new</v-btn
            >
          </div>
        </v-list>
      </div>
    </template>
  </BasicMenu>
</template>
<script>
import BasicMenu from "./BasicMenu";
import AddIcon from "../buttons/AddIcon";
import Sniper from "../loadings/Sniper";

export default {
  components: {
    BasicMenu,
    AddIcon,
    Sniper
  },
  props: {
    positionX: Number,
    positionY: Number,
    isShowMenu: Boolean,
    width: Number,

    list: Array,
    labelSearch: String,
    title: String,
    name: String,
    to: [Object, String],
    keySearch: String,
    icon: String,
    textTooltip: String,
    isLoadingSearch: Boolean,
    isSearchClient: Boolean,
    isLoadingGet: Boolean,
    isLoadingUpdate: Boolean,
    isShowAction: Boolean,
    timeDelaySearch: {
      type: Number,
      default: () => 0
    },
    keyId: {
      type: String,
      default: () => "id"
    }
  },
  data() {
    return {
      search: "",
      debounce: null
    };
  },
  computed: {
    searchList() {
      if (this.isSearchClient) {
        const filter = this.list.filter(
          x =>
            (x[this.keySearch] || "")
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) > -1
        );
        return filter;
      }
      return this.list;
    }
  },
  methods: {
    handleSearch(text) {
      if (this.isSearchClient) {
        this.search = text;
      } else {
        this.$emit("onStartSearch");
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          this.search = text;
          this.$emit("search", text);
        }, this.timeDelaySearch);
      }
    }
  }
};
</script>

<style scoped>
.scroll-list {
  max-height: 320px;
  overflow: auto;
}
.scroll-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
.scroll-list::-webkit-scrollbar {
  width: 3px;
  background-color: #f5f5f5;
}
.scroll-list::-webkit-scrollbar-thumb {
  background-color: #3f51b5;
}
.input-search >>> .v-input__slot {
  min-height: 42px;
}
</style>
