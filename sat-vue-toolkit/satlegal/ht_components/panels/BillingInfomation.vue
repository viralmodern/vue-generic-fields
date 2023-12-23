<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row no-gutters class="pa-2 pl-4 justify-center align-center">
        <v-col cols="3">Plan</v-col>
        <v-col cols="7">
          <span class="font-weight-bold">{{ dataInfomation.package }}</span>
          {{ dataInfomation.plan }}
        </v-col>
        <v-col cols="2" class="text-xs-center">
          <v-btn class="primary ml-5">
            <span class="text-capitalize">Upgrade</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-divider></v-divider>

    <v-col cols="12">
      <v-row no-gutters class="pa-4">
        <v-col sm="3" class="mt-3">Credit or debit cards</v-col>
        <v-col cols="9">
          <v-row no-gutters>
            <v-col cols="12">
              <v-row
                no-gutters
                v-for="item in dataInfomation.CreditOrDebitCards"
                :key="item.id"
                class="div-display"
              >
                <v-col sm="1" 1>
                  <v-icon class="mr-2">credit_card</v-icon>
                  <span
                    >{{ item.numberCard }} (Expires on {{ item.expires }})</span
                  >
                </v-col>
                <v-col sm="1">
                  <v-btn icon @click="openModalDelete(item)">
                    <v-icon>delete_outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row
                v-if="
                  dataInfomation.CreditOrDebitCards &&
                    Object.keys(dataInfomation.CreditOrDebitCards).length == 0
                "
              >
                <v-col sm="12" class="mt-3">
                  <span>(No there are credit cards)</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <v-divider></v-divider>

    <v-col cols="12">
      <v-row no-gutters class="pa-4 justify-center align-center">
        <v-col sm="3">Other information</v-col>
        <v-col sm="9">
          <span class="font-weight-bold"
            >${{ dataInfomation.OtherInformation }}</span
          >
          U.S Dollar
        </v-col>
      </v-row>
    </v-col>

    <v-divider></v-divider>

    <v-col cols="12">
      <v-row no-gutters class="pa-4 justify-center align-center">
        <v-col sm="3">Your balance</v-col>
        <v-col sm="9">
          <span>{{ dataInfomation.yourBalance }}</span>
        </v-col>
      </v-row>
    </v-col>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteConfirm"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this item?"
    />
  </v-row>
</template>
<script>
import ConfirmItem from "../dialogs/ConfirmItem";
export default {
  components: {
    ConfirmItem
  },
  data() {
    return {
      isShowPopup: false,
      itemInfo: null
    };
  },
  props: {
    dataInfomation: Object
  },
  methods: {
    openModalDelete(item) {
      this.itemInfo = item;
      this.isShowPopup = true;
    },
    deleteConfirm() {
      if (this.itemInfo) {
        this.$emit("deleteConfirm", this.itemInfo);
        this.isShowPopup = false;
      }
    }
  }
};
</script>
<style scoped>
.div-display {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
