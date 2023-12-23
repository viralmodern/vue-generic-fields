<template>
  <v-row no-gutters class="pa-3">
    <v-col cols="12">
      <div class="text-h5">Your credit and debit cards</div>
    </v-col>
    <v-col cols="12" class="pt-4">
      <v-expansion-panel>
        <v-expansion-panel-content
          v-for="(item, i) in dataCreditCard"
          :key="i"
          expand-icon="mdi-menu-down"
        >
          <template slot="header">
            <v-row no-gutters class="div-display">
              <v-col cols="1" class="height-card">
                <div class="pt-2">
                  <img :src="item.imageUrl" height="30px" width="50px" />
                </div>
              </v-col>
              <v-col cols="5">
                <span>{{ item.nameCard }}</span>
              </v-col>
              <v-col cols="2" class="div-display">
                <v-chip
                  v-if="item.type === true"
                  color="primary"
                  text-color="white"
                  >Primary</v-chip
                >
              </v-col>
              <v-col cols="4" class="div-display">
                <span :class="item.isExpires === false ? `error--text` : null"
                  >Expires: {{ item.expires }}</span
                >
              </v-col>
            </v-row>
          </template>
          <template slot="actions">
            <v-icon>$vuetify.icons.expand</v-icon>
          </template>
          <v-card>
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="6">
                  <v-row no-gutters>
                    <span class="title pa-1">{{ item.name }}</span>
                    <span class="font-weight-medium pa-1">{{ item.bank }}</span>
                    <v-row no-gutters>
                      <v-icon small>mdi-info</v-icon>
                      <span class="pa-1"
                        >Use this card to add funds to Your Front Balance.</span
                      >
                      <a href="#" class="tag-a-href mt-1">See Benefits</a>
                    </v-row>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row no-gutters>
                    <span class="title pa-1">{{ item.addressPayment }}</span>
                    <span class="pa-1">{{ item.address }}</span>
                    <v-row no-gutters>
                      <v-btn
                        class="text-capitalize primary"
                        @click="openModalDelete(item)"
                        >Delete</v-btn
                      >
                      <!-- <v-btn class="text-capitalize primary">Edit</v-btn> -->
                    </v-row>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-col
        cols="12"
        v-if="dataCreditCard && Object.keys(dataCreditCard).length === 0"
        >(Your credit and debit card is empty)</v-col
      >
    </v-col>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteConfirm"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this item credit card ?"
    />
  </v-row>
</template>
<script>
import ConfirmItem from "../dialogs/ConfirmItem";
export default {
  components: {
    ConfirmItem
  },
  props: {
    dataCreditCard: Array
  },
  data() {
    return {
      isShowPopup: false,
      objectCard: null
    };
  },
  methods: {
    openModalDelete(item) {
      this.objectCard = item;
      this.isShowPopup = true;
    },
    deleteConfirm() {
      if (this.objectCard) {
        this.$emit("deleteConfirm", this.objectCard);
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
.height-card {
  height: 45px;
}
.tag-a-href {
  text-decoration: none;
}
</style>
