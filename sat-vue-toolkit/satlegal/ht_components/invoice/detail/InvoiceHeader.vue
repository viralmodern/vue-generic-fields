<template>
  <v-row no-gutters>
    <v-col cols="5" class="text-xs-center pa-3">
      <AvatarProfile
        type="thumbnail"
        :imageUrl="(joinClient.user || {}).imageUrl"
        @remove="removeAvatar"
        @change="
          updateDataClientRequest({
            id: dataInvoiceBuilder.client,
            imageUrl: $event.fileReader.result
          })
        "
      />
    </v-col>
    <v-col cols="7" class="pa-1">
      <v-row no-gutters>
        <v-col cols="6">
          <InvoiceBill
            :joinClient="joinClient"
            :dataClient="dataClient"
            @update="$emit('update', $event)"
          />
          <div class="py-1 custom">
            <DateMonthPicker
              label="Date of issue"
              appendIcon="date_range"
              hide-details
              :rules="[v => !!v || 'This field is required']"
              :value="dataInvoiceBuilder.dateOfIssue | formatYYYYMMDD"
              @change="$emit('update', { dateOfIssue: $event })"
            />
          </div>
          <div class="py-1 custom">
            <DateMonthPicker
              label="Due date"
              appendIcon="date_range"
              hide-details
              :min="new Date().toISOString()"
              :rules="[v => !!v || 'This field is required']"
              :value="dataInvoiceBuilder.dueDate | formatYYYYMMDD"
              @change="$emit('update', { dueDate: $event })"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <div>
            <div class="title">
              <v-row no-gutters class="align-center">
                <span>Invoice to 2355673</span>
                <v-btn icon>
                  <v-icon>mdi-print</v-icon>
                </v-btn>
              </v-row>
            </div>
            <v-row class="py-1" no-gutters>
              <v-col cols="3" class="font-weight-medium">Name</v-col>
              <v-col cols="1" class="font-weight-medium">:</v-col>
              <v-col cols="8">Nate Studio</v-col>
            </v-row>
            <v-row class="py-1" no-gutters>
              <v-col cols="3" class="font-weight-medium">City</v-col>
              <v-col cols="1" class="font-weight-medium">:</v-col>
              <v-col cols="8">Bozena Dowgan</v-col>
            </v-row>
            <v-row class="py-1" no-gutters>
              <v-col cols="3" class="font-weight-medium">Street</v-col>
              <v-col cols="1" class="font-weight-medium">:</v-col>
              <v-col cols="8">Atenska 7</v-col>
            </v-row>
            <v-row class="py-1" no-gutters>
              <v-col cols="3" class="font-weight-medium">Phone</v-col>
              <v-col cols="1" class="font-weight-medium">:</v-col>
              <v-col cols="8">1-(105)-209-232</v-col>
            </v-row>
            <div class="py-1">
              <v-text-field
                hide-details
                label="Reference"
                :value="dataInvoiceBuilder.reference"
                class="custom"
                @change="$emit('update', { reference: $event })"
              ></v-text-field>
            </div>
            <div class="py-1">
              <v-text-field
                hide-details
                :value="dataInvoiceBuilder.amount"
                label="Amount Due"
                prefix="$"
                class="custom"
                @change="$emit('update', { amount: $event })"
              ></v-text-field>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DateMonthPicker from "../../menus/DateMonthPicker";
import InvoiceBill from "./InvoiceBill";
import AvatarProfile from "../../avatars/AvatarProfile";

export default {
  components: {
    DateMonthPicker,
    InvoiceBill,
    AvatarProfile
  },
  computed: {
    joinClient() {
      return (
        (this.dataClient || []).find(
          x => x.id === this.dataInvoiceBuilder.client
        ) || {}
      );
    },
    ...mapGetters("ht_store/workspace/billing/invoice/builder", ["dataInvoiceBuilder"]),
    ...mapGetters("ht_store/workspace/client", ["dataClient"])
  },
  methods: {
    removeAvatar() {
      this.updateDataClientRequest({
        id: this.dataInvoiceBuilder.client,
        imageUrl:
          "https://d33v4339jhl8k0.cloudfront.net/docs/assets/528e78fee4b0865bc066be5a/images/52af1e8ce4b074ab9e98f0e0/file-mxuiNezRS5.jpg"
      });
    },
    ...mapActions("ht_store/workspace/client", ["updateDataClientRequest"])
  }
};
</script>

<style scoped>
.custom /deep/ .v-text-field {
  width: 105px;
}
.custom /deep/ .v-text-field__slot {
  font-size: 14px;
}
.custom /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
