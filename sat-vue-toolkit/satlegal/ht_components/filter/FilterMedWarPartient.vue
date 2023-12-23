<template>
  <div>
    <v-btn rounded color="primary" :outlined="!hasFilter" @click="openRight('filterMedWar')">
      Filter is {{hasFilter ? 'on' : 'off'}}
      <v-icon right>mdi-filter_list</v-icon>
    </v-btn>
    <v-navigation-drawer fixed :value="rightType==='filterMedWar'" right clipped app>
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
          1123
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      isShowFilter: false,
    };
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]),
    ...mapGetters("ht_store/workspace/billing/payment", ["hasFilter"]),
    ...mapGetters("ht_store/workspace/client", ["dataClient"])
  },
  methods: {
    filterRequest(name, value) {
      this[name] = value;
      this.filterPaymentRequest({ name, value });
    },
    close() {
      this.openRight("filterMedWar");
    },
    ...mapMutations("ht_store/layout", ["openRight"]),
    ...mapActions("ht_store/workspace/billing/payment", ["filterPaymentRequest"])
  }
};
</script>
