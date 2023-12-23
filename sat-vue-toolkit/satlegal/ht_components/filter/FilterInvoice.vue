<template>
  <div>
    <v-btn rounded color="primary" :outlined="!hasFilter" @click="openRight('filterInvoice')">
      Filter is {{hasFilter ? 'on' : 'off'}}
      <v-icon right>mdi-filter_list</v-icon>
    </v-btn>
    <v-navigation-drawer fixed :value="rightType==='filterInvoice'" right clipped app>
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
              :items="invoicesStatus"
              item-text="name"
              item-value="id"
              label="Status"
              prepend-icon="search"
              placeholder="Choose status"
              return-object
              @change="filterRequest('status', $event ? $event.id : undefined)"
            ></v-combobox>
          </div>
          <div>
            <v-combobox
              :items="invoicesFulfillment"
              item-text="name"
              item-value="id"
              label="Fulfillment"
              prepend-icon="search"
              placeholder="Choose fulfillment"
              return-object
              @change="filterRequest('fulfillment', $event ? $event.id : undefined)"
            ></v-combobox>
          </div>
          <div>
            <SelectMultipleUser
              placeholder="Choose client"
              prepend-icon="search"
              label="Client"
              :user="client"
              :users="dataClient"
              @change="filterRequest('client', $event.length ? $event : undefined)"
              item-value="id"
              itemText="user.name"
              itemImg="user.imageUrl"
              multiple
            />
          </div>
          <div>
            <v-row no-gutters class="align-center">
              <DateMonthPicker
                placeholder="Choose dueDate"
                prepend-icon="search"
                label="Duedate"
                :value="dueDate"
                :min="new Date().toISOString()"
                @change="filterRequest('dueDate', $event ? $event : undefined)"
              />
              <v-btn @click="filterRequest('dueDate', undefined)" class="ma-0" icon>
                <v-icon>refresh</v-icon>
              </v-btn>
            </v-row>
          </div>
          <div>
            <v-row no-gutters class="align-center">
              <DateMonthPicker
                placeholder="Choose created"
                prepend-icon="search"
                label="Created"
                :value="created"
                @change="filterRequest('created', $event.length ? $event : undefined)"
              />
              <v-btn @click="filterRequest('created', undefined)" class="ma-0" icon>
                <v-icon>refresh</v-icon>
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
import { invoicesFulfillment, invoicesStatus } from "../../config";
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
      client: [],
      created: "",
      dueDate: "",
      invoicesFulfillment,
      invoicesStatus
    };
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]),
    ...mapGetters("ht_store/workspace/billing/invoice", ["hasFilter"]),
    ...mapGetters("ht_store/workspace/client", ["dataClient"])
  },
  methods: {
    filterRequest(name, value) {
      this[name] = value;
      this.filterInvoiceRequest({ name, value });
    },
    close() {
      this.openRight("filterInvoice");
    },
    ...mapMutations("ht_store/layout", ["openRight"]),
    ...mapActions("ht_store/workspace/billing/invoice", ["filterInvoiceRequest"])
  }
};
</script>
