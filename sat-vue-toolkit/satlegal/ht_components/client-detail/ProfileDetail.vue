<template>
  <v-card>
    <v-row class="card-height">
      <!-- <v-col cols="12"> -->
      <!-- <v-row> -->
      <v-col cols="2" class="mt-4">
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" class="d-flex align-center justify-center">
            <label class="btn-default">
              <UserAvatar
                class="avatar-custom"
                :imageUrl="clientDetail.avatar || null"
                :name="clientDetail.name || ''"
              />
              <input type="file" @change="updateImage" hidden class="hidden" />
            </label>
          </v-col>
          <v-col class="mt-3">
            <ClientAboutUs />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="card-height">
        <v-card-title primary-title>
          <div style="width: 100%">
            <v-row class="justify-space-between">
              <div class="text-h5">{{ clientDetail.name }}</div>
              <div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon color="default" :to="toAddressBook" v-on="on">
                      <v-icon>mdi-library_books</v-icon>
                    </v-btn>
                  </template>
                  <span>Adress book</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon color="default" :to="toDocument" v-on="on">
                      <v-icon>mdi-book</v-icon>
                    </v-btn>
                  </template>
                  <span>Document request</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon color="default" v-on="on">
                      <v-icon>mdi-settings</v-icon>
                    </v-btn>
                  </template>
                  <span>Setting</span>
                </v-tooltip>
              </div>
            </v-row>

            <ClientDetailChip
              :clientDetail="clientDetail"
              @changeSigned="changeSignedRequest"
              @changeAccountType="changeAccountTypeRequest"
            />

            <div>
              <v-row>
                <div>
                  <v-icon small color="primary">mdi-mail</v-icon>
                  <span class="ml-1 text-body-1">{{ clientDetail.email }}</span>
                </div>
                <div>
                  <v-icon small color="primary" class="ml-3">mdi-phone</v-icon>
                  <span class="ml-1 text-body-1">{{ clientDetail.phone }}</span>
                </div>
                <div>
                  <v-icon small color="primary" class="ml-3">mdi-location_on</v-icon>
                  <span class="ml-1 text-body-1">
                    {{
                    clientDetail.location
                    }}
                  </span>
                </div>
              </v-row>
            </div>

            <div class="mt-3">
              <div class="title primary--text">{{ clientDetail.nameDescription }}</div>
              <div>
                <v-textarea
                  hide-details
                  name="input-7-1"
                  :value="clientDetail.description"
                  class="ma-0 pa-0 custom-text-field input-size"
                  @input="changeDescription"
                  rows="5"
                ></v-textarea>
              </div>
            </div>
          </div>
        </v-card-title>
      </v-col>
      <!-- </v-row> -->
      <!-- </v-col> -->
    </v-row>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
import ClientAboutUs from "../cards/ClientAboutUs";
import ClientDetailChip from "../cards/ClientDetailChip";
export default {
  components: {
    UserAvatar,
    ClientAboutUs,
    ClientDetailChip
  },
  props: {
    dataUser: Object
  },
  data() {
    return {
      imageData: "",
      urlAvatar: null,
      description: ""
    };
  },
  methods: {
    ...mapActions("ht_store/workspace/client/detail", [
      "updateAvatar",
      "changeDescription",
      "changeSignedRequest",
      "changeAccountTypeRequest"
    ]),
    updateImage() {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      this.urlAvatar = (window.URL || window.webkitURL).createObjectURL(
        input.files[0]
      );
      this.updateAvatar(this.urlAvatar);
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/client/detail", ["clientDetail"]),
    toDocument() {
      return {
        name: "DocumentClient",
        id: this.$route.params.id
      };
    },
    toAddressBook() {
      return {
        name: "AddressBookClient",
        id: this.$route.params.id
      };
    }
  }
};
</script>
<style scoped>
.card-height {
  height: auto;
}
.hidden {
  display: none !important;
}
.btn-default {
  cursor: pointer;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.input-size {
  font-size: 13px;
}
.avatar-custom {
  margin: auto;
  width: -webkit-fill-available;
  max-width: 150px;
}
</style>
