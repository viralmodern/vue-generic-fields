<template>
  <div>
    <v-btn rounded color="primary" :outlined="!hasFilter" @click="openRight('filterPayment')">
      Filter is {{hasFilter ? 'on' : 'off'}}
      <v-icon right>mdi-filter_list</v-icon>
    </v-btn>
    <v-navigation-drawer fixed :value="rightType==='filterPayment'" right clipped app>
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
              :items="paymentMethods"
              item-text="name"
              item-value="id"
              label="Method payment"
              prepend-icon="search"
              placeholder="Choose method payment"
              return-object
              @change="filterRequest('paymentMethod', $event ? $event.id : undefined)"
            ></v-combobox>
          </div>
          <div>
            <SelectMultipleUser
              placeholder="Choose client"
              prepend-icon="search"
              label="Client"
              :user="client"
              :users="dataClient"
              @change="filterRequest('client', $event ? $event : undefined)"
              item-value="id"
              itemText="user.name"
              itemImg="user.imageUrl"
            />
          </div>
          <div>
            <v-row no-gutters class="align-center">
              <DateMonthPicker
                placeholder="Choose date"
                prepend-icon="search"
                label="Date"
                :value="paymentDate"
                @change="filterRequest('paymentDate', $event ? $event : undefined)"
              />
              <v-btn @click="filterRequest('paymentDate', undefined)" class="ma-0" icon>
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-row>
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { paymentMethods } from "../../config";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
import DateMonthPicker from "../menus/DateMonthPicker";

export default {
  components: {
    SelectMultipleUser,
    DateMonthPicker
  },
  data() {
    return {
      isShowFilter: false,
      paymentMethods,
      client: "",
      paymentDate: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]), // eslint-disable-line
    ...mapGetters("ht_store/workspace/billing/payment", ["hasFilter"]), // eslint-disable-line
    ...mapGetters("ht_store/workspace/client", ["dataClient"]) // eslint-disable-line
  },
  methods: {
    filterRequest(name, value) {
      this[name] = value;
      this.filterPaymentRequest({ name, value });
    },
    close() {
      this.openRight("filterPayment");
    },
    ...mapMutations("ht_store/layout", ["openRight"]), // eslint-disable-line
    ...mapActions("ht_store/workspace/billing/payment", ["filterPaymentRequest"]) // eslint-disable-line
  }
};
</script>
