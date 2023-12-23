<template>
  <v-row no-gutters="" class="pa-3">
    <v-col cols="12">
      <div class="text-h5">Payment history</div>
      <div>
        You can help us, by filling your data, create you a much better
        experience using our website.
      </div>
    </v-col>
    <v-col cols="12" class="mt-3">
      <v-card v-for="item in paymentHistory" :key="item.id" class="mt-3">
        <v-row
          no-gutters=""
          justify="center"
          class="height-card align-center d-flex"
        >
          <v-col cols="1" class="d-flex justify-center align-center">
            <v-icon small :color="item.isActive === true ? `success` : `error`"
              >mdi-fiber_manual_record</v-icon
            >
          </v-col>
          <v-col cols="2" class="align-center d-flex">
            <v-icon>mdi-date_range</v-icon>
            <span>{{ item.duedate | formatDMY }}</span>
          </v-col>
          <v-col cols="2" class="div-display">
            <span>#{{ item.tag }}</span>
          </v-col>
          <v-col cols="3" class="align-center d-flex">
            <v-icon>mdi-credit_card</v-icon>
            <span>{{ item.nameCard }}</span>
          </v-col>
          <v-col cols="3" class="div-display">
            <span :class="item.isActive === false ? `error--text` : null"
              >${{ item.totalCurrency }} USD</span
            >
          </v-col>
          <v-col cols="1" class="div-display">
            <MenuPaymentHistory @deleteCard="deleteCard(item)" />
          </v-col>
        </v-row>
      </v-card>
      <v-col
        cols="12"
        v-if="paymentHistory && Object.keys(paymentHistory).length === 0"
        >(No payment history)</v-col
      >
    </v-col>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteConfirm"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this Card?"
    />
  </v-row>
</template>
<script>
import ConfirmItem from "../dialogs/ConfirmItem";
import MenuPaymentHistory from "../menus/MenuPaymentHistory";
export default {
  components: {
    MenuPaymentHistory,
    ConfirmItem
  },
  props: {
    paymentHistory: Array
  },
  data() {
    return {
      isShowPopup: false,
      itemCard: null
    };
  },
  methods: {
    deleteCard(item) {
      this.itemCard = item;
      this.isShowPopup = true;
    },
    deleteConfirm() {
      if (this.itemCard) {
        this.$emit("deleteConfirm", this.itemCard);
        this.isShowPopup = false;
      }
    }
  }
};
</script>
<style scoped>
.height-card {
  height: 80px;
}
.div-display {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
