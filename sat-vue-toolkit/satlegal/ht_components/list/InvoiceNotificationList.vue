<template>
  <v-card class="elevation-0">
    <v-app-bar card dense color="transparent">
      <v-toolbar-title>
        <h4>Your invoices</h4>
      </v-toolbar-title>
    </v-app-bar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list class="pa-0">
        <v-list-item
          avatar
          v-for="item in dataInvoiceJoin"
          :key="item.id"
          :to="showDetail(item.id)"
          exact
        >
          <UserAvatar
            :name="item.client.name || ''"
            :imageUrl="(item.client || {}).avatar"
            :avatarSize="40"
            is-in-list
          />
          <v-list-item-content>
            <v-list-item-title>{{ item.invoice }}</v-list-item-title>
            <v-list-item-subtitle>
              <strong :style="{ color: item.status.color }">{{
                item.status.name
              }}</strong>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-btn block class="ma-0" :to="{ name: 'BillingPortal' }">All</v-btn>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import UserAvatar from "../avatars/UserAvatar";
import { mapGetters } from "vuex";
import { invoicesFulfillment } from "../../config";
export default {
  components: {
    UserAvatar
  },
  data() {
    return {
      invoicesFulfillment
    };
  },
  computed: {
    ...mapGetters("ht_store/clientPortal/billing/invoice", ["dataInvoice"]),
    ...mapGetters("ht_store/workspace/client", ["dataClient"]),
    dataInvoiceJoin() {
      const clone = JSON.parse(JSON.stringify(this.dataInvoice));
      return clone.map(x => {
        x.client = this.dataClient.find(x1 => x1.id === x.client) || {};
        x.status =
          this.invoicesFulfillment.find(x2 => x2.id === x.status) || {};
        return x;
      });
    }
  },
  methods: {
    showDetail(id) {
      return {
        name: "PortalInvoiceDetail",
        params: {
          id
        }
      };
    }
  }
};
</script>
