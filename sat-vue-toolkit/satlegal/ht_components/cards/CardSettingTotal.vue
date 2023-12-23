<template>
  <v-card>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <v-row class="justify-space-between align-center" no-gutters>
            <strong class="title">Total</strong>
            <v-btn class="ml-0" small color="success" rounded outlined>{{
              item.price
            }}</v-btn>
          </v-row>
        </v-col>
        <v-col>
          <span>Payment method:&nbsp;</span>
          <strong class="text--secondary">{{ item.paymentMethod }}</strong>
        </v-col>
        <v-col>
          <span>Will renew on:&nbsp;</span>
          <strong class="text--secondary">{{
            item.renewOn | formatDMY
          }}</strong>
        </v-col>
        <v-col class="mt-2">
          <v-btn color="primary ml-0">Edit payment</v-btn>
          <v-btn color="default ml-0">View invoices</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    item: Object
  }
};
</script>
