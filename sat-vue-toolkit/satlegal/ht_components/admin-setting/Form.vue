<template>
  <v-dialog persistent :value="isShow" @input="closeDialog" width="500">
    <v-card>
      <div class="primary">
        <v-row no-gutters class="pa-3 justify-center align-center">
          <v-icon dark>mdi-person</v-icon>
          <span
            class="title font-weight-regular white--text ml-2 mt-1"
            v-if="item"
            >{{ item.fullName }}</span
          >
          <span class="title font-weight-regular white--text ml-2 mt-1" v-else
            >Create new user</span
          >
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-form ref="form" v-model="valid">
        <v-row no-gutters class="pa-2">
          <v-col cols="12">
            <v-text-field
              label="Name user"
              :rules="[v => !!v || 'This field is required']"
              v-model="fullName"
              append-icon="person_outline"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="pa-2">
          <v-col cols="12">
            <v-text-field
              label="Email user"
              :rules="[
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
              ]"
              v-model="email"
              append-icon="mail_outline"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-2">
          <v-col cols="12">
            <v-text-field
              type="password"
              label="Password user"
              :rules="[v => !!v || 'Password is required']"
              v-model="password"
              hint="Minimum 8 character | At least one special character | At least one number"
              append-icon="lock_outline"
            ></v-text-field>
            <span v-if="isShowCheckPass" class="error-password-check text-caption"
              >The password is not eligible, please check again</span
            >
          </v-col>
        </v-row>
        <v-row no-gutters v-if="item" class="pa-2">
          <v-col cols="12">
            <v-img :src="item.avatar" aspect-ratio="1.7"></v-img>
          </v-col>
        </v-row>
        <v-row class="pa-2">
          <v-col cols="12">
            <UploadFileOnly @complete="getFileUpload" />
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-2">
          <v-col cols="12">
            <v-autocomplete
              :items="roles"
              v-model="role"
              item-text="text"
              :rules="[v => !!v || 'Role is required']"
              label="Role"
            >
              <template slot="selection" slot-scope="data">
                <GeneralChip :text="data.item.text" :xSmall="true" />
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn class="v-btn theme--light primary" @click="edit">{{
          changeButton
        }}</v-btn>
      </v-card-actions>
      <v-snackbar
        v-model="isShowCheckPass"
        :timeout="3000"
        :right="true"
        :bottom="true"
        >Create success</v-snackbar
      >
    </v-card>
  </v-dialog>
</template>
<script>
import GeneralChip from "../chips/GeneralChip";
import UploadFileOnly from "../inputs/UploadFileOnly";
export default {
  data() {
    return {
      valid: true,
      fullName: "",
      email: "",
      password: "",
      role: "",
      clearFile: null,
      checkLengthPassword: false,
      checkNumberPassword: false,
      checkUppercase: false,
      checkValidateFormNewPassworld: false,
      isShowCheckPass: false
    };
  },
  props: {
    isShow: Boolean,
    item: Object,
    roles: Array
  },
  components: {
    GeneralChip,
    UploadFileOnly
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    edit() {
      if (this.$refs.form.validate()) {
        if (this.checkValidateFormNewPassworld) {
          this.$emit("closeModal");
          if (this.item) {
            this.$emit("editUserAdmin", {
              id: this.item.id,
              fullName: this.fullName,
              role: this.role,
              email: this.email,
              password: this.password
            });
          } else {
            this.$emit("createUserAdmin", {
              fullName: this.fullName,
              role: this.role,
              email: this.email,
              password: this.password
            });
            this.clearFile();
          }
        } else {
          this.isShowCheckPass = true;
        }
      }
    },
    getFileUpload(data) {
      this.clearFile = data.remove;
    }
  },
  computed: {
    changeButton() {
      if (this.item) {
        return "Edit";
      } else {
        return "Add";
      }
    }
  },
  watch: {
    password(val) {
      this.checkLengthPassword = val.length >= 8;
      this.checkNumberPassword = /\d/.test(val);
      this.checkUppercase = /[A-Z]/.test(val);
      this.checkValidateFormNewPassworld =
        this.checkUppercase &&
        this.checkNumberPassword &&
        this.checkLengthPassword;
    },
    isShow(val) {
      if (val) {
        if (this.item) {
          this.fullName = this.item.fullName;
          this.email = this.item.email;
          this.password = this.item.password;
          this.role = this.item.role;
        }
      }
    }
  }
};
</script>
<style scoped>
.error-password-check {
  color: red !important;
}
</style>
