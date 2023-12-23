<template>
    <v-menu
      :close-on-content-click="false"
      transition="scale-transition"
      :nudge-width="290"
      offset-y
    >
      <template v-slot:activator="{ on: onMenu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: onTooltip }">
            <AddIcon
              :on="{ ...onMenu, ...onTooltip }"
              @onClickIcon="$emit('onOpenMenu')"
              :icon="icon"
            />
          </template>
          <span>{{ textTooltip }}</span>
        </v-tooltip>
      </template>
      <v-col cols="12" class="pa-0 menu-list">
        <Sniper :isLoading="isLoadingGet"/>
        <v-list style="width:100%">
          <div class="text-center title mb-2">{{ title }}</div>
          <v-divider></v-divider>
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
            <div v-else v-for="item in searchList" :key="item[keyId]" class="my-2">
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
      </v-col>
    </v-menu>
</template>
<script>
import AddIcon from "../buttons/AddIcon";
import Sniper from "../loadings/Sniper";

export default {
  components: {
    AddIcon,
    Sniper,
  },
  props: {
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
    isShowAction: Boolean,
    timeDelaySearch: {
      type: Number,
      default: () => 0
    },
    keyId: {
      type: String,
      default: () => "id",
    },
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
