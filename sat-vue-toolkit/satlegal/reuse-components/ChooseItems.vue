<template>
  <v-menu bottom offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <slot name="content" :selected="list_selected" :on="on">
        <v-btn v-on="on" text small>
          <span class="text-subtitle-2 text-caption text-capitalize">
            {{ labelHeader }}
            <sup class="font-weight-bold" v-if="list_selected.length > 0"
              >+{{ list_selected.length }}</sup
            >
          </span>
          <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </slot>
    </template>
    <v-card :max-width="maxWidth">
      <v-card v-if="list_selected.length > 0" flat max-width="450px">
        <v-card-text>
          <ChipType
            dark
            close
            class="ma-1"
            v-for="(i, index) in list_selected"
            :text="`${i[itemText]}`"
            @click-close="clearItem(i[itemValue])"
            :key="`select-${i[itemValue]}-${index}`"
          />
        </v-card-text>
        <v-divider />
      </v-card>
      <v-text-field
        :placeholder="labelSearch"
        dense
        flat
        solo
        @keyup.enter="addNew"
        style="font-size: 14px;"
        v-model="searchQuery"
        hide-details
      ></v-text-field>
      <v-divider />
      <v-list dense v-if="list.length > 0" class="my-0 py-0">
        <v-subheader v-if="showLabelHeader">{{ labelHeader }}</v-subheader>
        <v-list-item-group
          :multiple="multiple"
          v-model="selected"
          active-class="primary--text"
        >
          <template v-for="(cate, index1) in list">
            <v-hover v-slot:default="{ hover }" :key="index1">
              <v-list-item @click="chooseItem" :value="cate">
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-avatar v-if="listAvatar">
                    <v-img
                      src="https://cdn.the-scientist.com/assets/articleNo/66168/hImg/32799/205350-banner-3-s.png"
                    />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ cate[itemText] }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon color="primary" v-show="hover"
                      >mdi-dots-horizontal
                    </v-icon>
                  </v-list-item-icon>
                </template>
              </v-list-item>
            </v-hover>
            <v-divider :key="'dr-choose-' + index1" />
          </template>
        </v-list-item-group>
      </v-list>
      <v-card v-else flat>
        <v-card-subtitle>
          <template v-if="createNewSearch">
            Press <code>Enter</code>&nbsp;to create new
            {{ labelHeader }}
          </template>
          <template v-else>
            Search entries
          </template>
        </v-card-subtitle>
      </v-card>
      <slot name="footer" v-if="showFooter">
        <v-card-subtitle
          class="primary--text cusor--pointer text-caption"
          @click="$emit('click-footer')"
        >
          Create new {{ labelFooter }}
        </v-card-subtitle>
      </slot>
    </v-card>
  </v-menu>
</template>

<script>
import ChipType from "../matters/caf/utils/ChipType";

export default {
  name: "ChooseItems",
  components: { ChipType },
  data() {
    return {
      searchQuery: "",
      selected: []
    };
  },
  props: {
    items: {
      type: Array,
      default: () => [
        {
          name: "dummy 1",
          pk: "dummy 1"
        },
        {
          name: "dummy 2",
          pk: "dummy 2"
        }
      ]
    },
    value: {
      type: Array,
      default: () => []
    },
    labelHeader: {
      type: String,
      default: "Category"
    },
    labelFooter: {
      type: String,
      default: "Category"
    },
    showFooter: {
      type: Boolean,
      default: false
    },

    labelSearch: {
      type: String,
      default: "Search or Create New"
    },
    showLabelHeader: {
      type: Boolean,
      default: () => true
    },
    itemText: {
      type: String,
      default: () => "name"
    },
    itemValue: {
      type: String,
      default: () => "pk"
    },
    multiple: {
      type: Boolean,
      default: () => false
    },
    createNewSearch: {
      type: Boolean,
      default: () => true
    },
    listAvatar: {
      type: Boolean,
      default: () => false
    },

    maxWidth: {
      type: String,
      default: () => "100%"
      // default: () => '350px'
    }
  },
  computed: {
    list: {
      get() {
        let _search = this.searchQuery || "";
        try {
          return this.items.filter(field => {
            if (field) {
              return field[this.itemText]
                .toLowerCase()
                .includes(_search.toLowerCase());
            }
          });
        } catch (e) {
          return [];
        }
      }
    },
    list_selected: {
      get() {
        if (this.multiple) {
          return this.selected;
        }
        if (!this.selected) {
          return [];
        }
        return Array.isArray(this.selected) ? this.selected : [this.selected];
      },
      set() {}
    }
  },
  methods: {
    save() {},
    cancel() {},

    close() {},
    addNew() {
      if (!this.createNewSearch) {
        return;
      }
      let _self = this;
      let temp = {
        [this.itemText]: this.searchQuery,
        [this.itemValue]: this.searchQuery
      };
      try {
        if (this.multiple) {
          _self.selected.push(temp);
        } else {
          _self.selected = [temp];
        }
        this.searchQuery = "";
      } catch (e) {
        // eslint-disable-next-line
        console.log("addNew", _self, _self.selected);
      }
    },
    chooseItem() {},
    clearItem(pk) {
      // eslint-disable-next-line
      console.log("clearItem", pk);
      if (this.multiple) {
        let item = this.selected.findIndex(s => s[this.itemValue] === pk);
        if (item >= 0) {
          this.selected.splice(item, 1);
        }
      } else {
        this.selected = [];
      }
    }
  },
  mounted() {
    this.selected = this.value;
  },
  watch: {
    selected(n) {
      // eslint-disable-next-line
      console.log("POL", n);
      this.$emit("change", { items: n });
    },
    value(v) {
      this.selected = v;
    }
  }
};
</script>

<style scoped></style>
