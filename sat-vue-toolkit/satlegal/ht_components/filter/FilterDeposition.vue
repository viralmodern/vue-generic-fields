<template>
  <div>
    <v-btn
      rounded
      color="primary"
      :outlined="!hasFilter"
      @click="openRight('filterDeposition')"
    >
      <v-progress-circular
        v-if="loadingFilter"
        rotate
        :indeterminate="loadingFilter"
        size="25"
        class="mr-2"
      />
      Filter is {{ hasFilter ? "on" : "off" }}
      <v-icon right>mdi-filter_list</v-icon>
    </v-btn>
    <v-navigation-drawer fixed :value="rightType==='filterDeposition'" right clipped app>
      <v-list dense>
        <div class="pa-2">
          <v-row no-gutters class="align-center">
            <h2>Filters</h2>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-0">
              <v-icon @click="close">mdi-close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <div class="pa-2">
          <div>
            <v-combobox
              :items="types"
              item-text="name"
              item-value="id"
              label="Types"
              prepend-icon="search"
              placeholder="Choose type"
              return-object
              @change="filterRequest('type', $event ? $event.id : undefined)"
            ></v-combobox>
          </div>
          <div>
            <SelectMultipleUser
              placeholder="Choose creator"
              prepend-icon="search"
              label="Creator"
              :user="creator"
              :users="members"
              @change="filterRequest('creator', $event)"
              item-value="id"
              itemText="avatar.name"
              itemImg="avatar.imageUrl"
            />
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
export default {
  components: {
    SelectMultipleUser
  },
  props: {
    types: Array,
    loadingFilter: Boolean,
  },
  data() {
    return {
      isShowFilter: false,
      creator: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/matter/discovery/deposition", ["hasFilter"])
  },
  methods: {
    filterRequest(name, value) {
      this[name] = value;
      this.filterDeposition({ name, value });
    },
    close() {
      this.openRight("filterDeposition");
    },
    ...mapMutations("ht_store/layout", ["openRight"]),
    ...mapMutations("ht_store/matter/discovery/deposition", ["filterDeposition"])
  }
};
</script>
