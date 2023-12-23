<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="450" persistent>
      <v-card>
        <div class="primary">
          <v-row no-gutters class=" justify-center align-center pa-3">
            <div class="title font-weight-regular white--text">{{ title }}</div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <div class="address">
            <v-text-field
              rows="2"
              v-model="address"
              label="Address"
              append-icon="place"
            ></v-text-field>
          </div>
          <div class="website">
            <v-text-field
              v-model="website"
              :rules="[
                v => !!v || 'Url is required',
                v =>
                  !!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(
                    v
                  ) || 'Url is invalid'
              ]"
              label="Website"
              required
              append-icon="web"
            ></v-text-field>
          </div>
          <AddPhones :phoneList="itemEdit.phones" @onChange="onChangePhone" />
          <AddEmails :emailList="itemEdit.emails" @onChange="onChangeEmail" />
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="edit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AddPhones from "../cards/AddPhones";
import AddEmails from "../cards/AddEmails";
export default {
  components: {
    AddPhones,
    AddEmails
  },
  props: {
    isShow: Boolean,
    title: String,
    itemEdit: Object
  },
  data() {
    return {
      valid: true,
      menu: false,
      address: "",
      phones: [],
      website: "",
      emails: []
    };
  },
  methods: {
    clearData() {
      this.address = "";
      this.phones = [];
      this.website = "";
      this.emails = [];
    },
    cancel() {
      this.$emit("closeModal");
      this.clearData();
      this.$refs.form.resetValidation();
    },
    edit() {
      if (this.$refs.form.validate()) {
        const data = {
          address: this.address,
          phones: this.phones,
          website: this.website,
          emails: this.emails
        };
        this.$emit("edit", data);
        this.cancel();
      }
    },
    onChangePhone(phones) {
      this.phones = phones;
    },
    onChangeEmail(emails) {
      this.emails = emails;
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        const { address, website } = this.itemEdit;
        this.address = address;
        this.website = website;
      }
    }
  }
};
</script>
