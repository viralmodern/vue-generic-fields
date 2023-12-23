<template>
  <div>
    <v-navigation-drawer
      :value="isShow"
      @input="$emit('closeMenuRight', $event)"
      :right="true"
      :stateless="isClickOutSide"
      fixed
      class="fill-height"
      temporary
      width="60%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span>Client Detail Profile</span>
        </v-col>
        <v-col cols="2 text-right">
          <v-btn text icon color="white" @click="$emit('closeMenuRight', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div>
        <v-list dense>
          <v-tabs :centered="true" :grow="true" v-model="tabs">
            <v-tab>Profile</v-tab>
            <v-tab>Client Address Book slickgrid</v-tab>
            <v-tab>Document Request slickgrid</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card flat :disabled="isLoadingGetDetail">
                <v-progress-linear v-if="isLoadingGetDetail" class="mt-1" indeterminate rounded></v-progress-linear>
                <v-card-text>
                  <ProfileDetail :isShow="isShow" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-progress-linear v-if="isLoadingGet" class="mt-1" indeterminate rounded></v-progress-linear>
                  <ClientAddressBook :clientId="pk" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-progress-linear v-if="isLoadingGetDocument" class="mt-1" indeterminate rounded></v-progress-linear>
                <v-card-text>
                  <DocumentRequest :clientId="pk" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ProfileDetail from "./components/ProfileDetail";
import ClientAddressBook from "./components/ClientAddressBook";
import DocumentRequest from "./components/DocumentRequest";

export default {
  props: {
    isShow: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    pk: String
  },
  components: { ProfileDetail, ClientAddressBook, DocumentRequest },
  data() {
    return {
      valid: false,
      isCallAPIAdressBook: false,
      detailCharacter: {
        name: ""
      },
      tabs: null,
      laodingUpdate: false,
      isLoadingGetDocument: false
    };
  },
  methods: {
    ...mapActions("ht_store/clients/addressBook", ["getAdressBookRequest"]),
    ...mapActions("ht_store/clients/documentRequest", ["getDocumentRequest"])
  },
  computed: {
    ...mapGetters("ht_store/clients/addressBook", ["isLoadingGet"]),
    // ...mapGetters("ht_store/clients/documentRequest", ["isLoadingGetDocument"])
  },
  watch: {
    tabs: {
      async handler(val) {
        if (val === 1) {
          await this.getAdressBookRequest({ pk: this.pk, isFirstCall: true });
        }
        if (val === 2) {
          this.isLoadingGetDocument = true
          await this.getDocumentRequest({ pk: this.pk, isFirstCall: true });
          this.isLoadingGetDocument = false
        }
      }
    },
    pk: {
      async handler(val) {
        if (this.tabs === 1) {
          await this.getAdressBookRequest({ pk: val, isFirstCall: true });
        }
        if (this.tabs === 2) {
          this.isLoadingGetDocument = true
          await this.getDocumentRequest({ pk: val, isFirstCall: true });
           this.isLoadingGetDocument = false
        }
      }
    }
  }
};
</script>
<style scoped>
.save_button {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.header-right {
  background-color: #6d42c7;
  color: white;
  display: flex;
  align-items: center;
}
</style>
