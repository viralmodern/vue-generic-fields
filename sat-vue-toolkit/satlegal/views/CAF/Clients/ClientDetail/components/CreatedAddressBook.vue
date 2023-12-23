<template>
  <div>
    <v-btn
      v-if="!isShowAdd"
      style="text-transform: unset;"
      text
      class="pa-1 primary--text"
      @click="isShowAdd = true"
    >
      <v-icon small>mdi-plus</v-icon>Add new
    </v-btn>
    <div v-else style="position: relative">
      <AddIcon
        style="position: absolute;top: 5px;"
        @onClickIcon="isShowAdd = false"
        icon="mdi-close"
        colorButton="warning"
        colorIcon="white"
      />
      <v-form class="ml-9" ref="form" v-model="valid">
        <v-row class="ma-0 mt-2">
          <v-col cols="4" class="pa-0 pr-2">
            <v-textarea
              v-model="first_name"
              class="custom ma-0 pa-0"
              placeholder="First name"
              auto-grow
              rows="1"
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-col>
          <v-col cols="4" class="pa-0 pr-2">
            <v-textarea
              v-model="last_name"
              class="custom ma-0 pa-0"
              placeholder="Last name"
              auto-grow
              rows="1"
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-col>
          <v-col  class="pa-0 pr-2">
            <SelectChip
              placeholder="Select relationship"
              :items="appConfigChoices[appConfigConstants.CLIENTS_ADDRESS_BOOK]"
              label="Relationship"
              item-text="label"
              item-value="value"
              item-color="color"
              :value="relationship"
              @change="relationship = $event"
              :rules="[v => !!v || 'This field is required']"
            />
          </v-col>
          <v-col class="pa-0 mt-2">
            <v-btn small class="primary mx-1" @click="add" :loading="isLoadingAdd">Add</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import SelectChip from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/SelectChip";

export default {
  components: {
    AddIcon,
    SelectChip
  },
  props: {
    clientId: String
  },
  data() {
    return {
      valid: false,
      first_name: "",
      last_name: "",
      relationship: "",
      errorsForm: {
        time: {
          messages: "",
          valid: false
        }
      },
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  methods: {
    validForm() {
      const errors = {
      };
      const valid = !Object.keys(errors).some(
        key => errors[key].valid === true
      );
      this.errorsForm = errors;
      const validForm = this.$refs.form.validate();
      return valid && validForm;
    },
    add() {
      if (this.validForm()) {
        const data = {
          clientId: this.clientId,
          body: {
            last_name: this.last_name,
            first_name: this.first_name,
            relationship: this.relationship
          }
        };
        this.isLoadingAdd = true;
        this.postAddressBookRequest(data)
          .then(() => {
            this.isLoadingAdd = false;
            this.isShowAdd = false;
          })
          .catch(() => {
            this.isLoadingAdd = false;
          });
      }
    },
    clearForm() {
      this.first_name = "";
      this.last_name = "";
      this.relationship = "";
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/clients/addressBook", ["postAddressBookRequest"])
  },
  watch: {
    isShowAdd(val) {
      if (!val) {
        this.clearForm();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.custom {
  /deep/ .v-text-field__slot {
    font-size: 13px;
    width: 100px;
  }
}
</style>
