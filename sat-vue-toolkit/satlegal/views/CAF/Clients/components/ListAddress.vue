<template>
  <v-menu v-model="menu" transition="scale-transition" offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on: onMenu }">
      <div class="d-flex align-center text-no-wrap">
        <span class="mr-2">{{ showAddressDefault }}</span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: onTooltip }">
            <AddIcon :on="{ ...onMenu, ...onTooltip }" icon="more" />
          </template>
          <span>View more</span>
        </v-tooltip>
      </div>
    </template>
    <v-list class="px-4">
      <v-form ref="form" v-model="valid" v-if="!isAddNew">
        <div v-for="(item, index) in listValue" :key="index">
          <div class="d-flex align-center">
            <Location
              ref="valueInput"
              :value="item.address.raw"
              @onChange="onChange(item.pk, $event)"
              @placechanged="getAddressData(item.pk, $event)"
              :extra="{required: true,
                       rules: [v => !!v || 'Address is required'],
                       errorMessage: ''}"
              placeholder="Address"
            />
            <v-card-actions>
              <v-radio-group
                :value="item.address_type"
                row
                label="Type Address"
                class="mr-2"
                :rules="[v => !!v || 'Type address is required']"
                required
              >
                <v-radio
                  class="custom-radio mr-2"
                  v-for="type in listType"
                  :key="type.value"
                  :label="type.label"
                  :value="type.value"
                  @change="update(item.pk, 'address_type',type.value)"
                ></v-radio>
              </v-radio-group>
            </v-card-actions>
            <v-icon color="primary">mdi-routes</v-icon>
            <div class="text-right ml-3">
              <Action @remove="removeRow(item.pk, $event)" />
            </div>
          </div>
        </div>
        <div>
          <v-btn
            class="pa-0 primary--text text-caption"
            style="text-transform: unset;"
            text
            @click="isAddNew = true"
            v-if="!isAddNew"
          >Add new</v-btn>
        </div>
      </v-form>
      <v-form ref="formAddNew" v-model="valid" v-if="isAddNew">
        <div class="d-flex align-center">
          <Location
            ref="valueInput"
            :value="addressNew.raw"
            @onChange="onChangeNew"
            @placechanged="getAddressDataNew"
            :extra="{required: true,
                       rules: [v => !!v || 'Address is required'],
                       errorMessage: ''}"
            placeholder="Address"
          />
          <v-card-actions>
            <v-radio-group
              :value="address_type"
              row
              label="Type Address"
              class="mr-2"
              :rules="[v => !!v || 'Type address is required']"
              required
            >
              <v-radio
                class="custom-radio mr-2"
                v-for="type in listType"
                :key="type.value"
                :label="type.label"
                :value="type.value"
                @change="address_type = type.value"
              ></v-radio>
            </v-radio-group>
          </v-card-actions>
          <v-icon color="primary">mdi-routes</v-icon>
        </div>
        <div class="text-right d-flex justify-end">
          <v-btn color="error" small @click="isAddNew = false; resetFormData()" class="mr-1">Close</v-btn>
          <v-btn color="primary" small @click="add" :loading="isLoading">Save</v-btn>
        </div>
      </v-form>
    </v-list>
  </v-menu>
</template>

<script>
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon.vue";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action.vue";
import Location from "@/sat-vue-toolkit/components/Location/Location.vue";
import { mapActions } from "vuex";

let timeout;
export default {
  components: {
    AddIcon,
    Action,
    Location
  },
  props: {
    listAddress: Array,
    listType: Array,
    pk: String,
    detail: Boolean
  },
  data() {
    return {
      valid: false,
      menu: false,
      address: {},
      listValue: [],
      isAddNew: false,
      addressNew: {
        raw: ""
      },
      address_type: "",
      isLoading: false,
      addressMap: {}
    };
  },
  computed: {
    showAddressDefault() {
      if ((this.listAddress || []).length > 0) {
        return this.listAddress[0].address.raw;
      }
      return "(No data)";
    }
  },
  methods: {
    ...mapActions("ht_store/clients", [
      "updateAddressRequest",
      "postAddressRequest",
      "removeAddressRequest"
    ]),
    getAddressData(pk, address) {
      this.address = { pk, address };
    },
    onChange(pk, value) {
      if (this.$refs.form.validate()) {
        let data = {};
        if (pk === this.address.pk) {
          data = this.address.address;
          this.address = {};
        } else {
          data = {
            raw: value
          };
        }
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.update(pk, "address", data);
        }, 500);
      }
    },
    getAddressDataNew(location) {
      this.addressNew = location;
    },
    onChangeNew(value) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (Object.keys(this.addressNew).length > 1) {
          this.addressMap = this.addressNew;
          this.addressNew = {
            raw: ""
          };
        } else {
          this.addressMap = {
            raw: value
          };
        }
      }, 500);
    },
    update(pk, name, value) {
      const data = {
        idParams: {
          clientId: this.pk,
          pk
        },
        body: {
          [name]: value
        },
        detail: this.detail
      };
      this.updateAddressRequest(data);
    },
    async add() {
      if (this.$refs.formAddNew.validate()) {
        const data = {
          idParams: {
            clientId: this.pk
          },
          body: {
            address: this.addressMap,
            address_type: this.address_type
          },
          detail: this.detail
        };
        try {
          this.isLoading = true;
          await this.postAddressRequest(data);
          this.isLoading = false;
          this.isAddNew = false;
          this.resetFormData();
        } catch (error) {
          this.isLoading = false;
        }
      }
    },
    resetFormData() {
      this.addressMap = {};
      this.address_type = "";
      this.addressNew = {
        raw: ""
      };
    },
    async removeRow(pk, close) {
      const data = {
        pk,
        clientId: this.pk,
        detail: this.detail
      };
      await this.removeAddressRequest(data);
      close();
    }
  },
  watch: {
    menu(isOpen) {
      if (isOpen) {
        this.listValue = this.listAddress;
      }
    },
    listAddress: {
      handler(val) {
        this.listValue = val;
      }
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
.custom-radio /deep/ .v-input--selection-controls__ripple {
  z-index: 1;
}
</style>
