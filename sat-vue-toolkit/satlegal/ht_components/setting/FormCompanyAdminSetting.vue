<template>
  <v-card>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :rules="[v => !!v || 'This field is required']"
              v-model="companyName"
              label="Company name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :rules="[v => !!v || 'This field is required']"
              v-model="companyTitle"
              label="Company title"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="System email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="copyrights"
              :rules="[v => !!v || 'This field is required']"
              label="Copyrights"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="currency"
              item-text="name"
              item-value="id"
              :items="currencies"
              label="Currency"
              return-object
              required
              :rules="[v => !!v || 'This field is required']"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="timeZone"
              item-text="name"
              :items="timezones"
              label="Timezone"
              return-object
              required
              :rules="[v => !!v || 'This field is required']"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-textarea
              rows="2"
              label="Title login"
              :rules="[v => !!v || 'This field is required']"
              v-model="titleLogin"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row no-gutters justify="end">
          <v-btn color="primary" @click="save">Save</v-btn>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <h3>Logo upload</h3>
            <span class="text-caption text--secondary"
              >Upload at exactly 200px by 130px the size of your standard
              logo</span
            >
            <v-img
              class="image-logo-company"
              :src="(item || {}).logoStandard"
            ></v-img>
            <FormUploadImageCompany />
          </v-col>
          <v-col cols="12" md="3">
            <h3>Favicon upload</h3>
            <span class="text-caption text--secondary"
              >Upload a 16px X 16px .png or gif image that will be your
              favicon</span
            >
            <v-img
              class=" lighten-2 image-logo-company"
              :src="item.logoFavicon"
            ></v-img>
            <FormUploadImageCompany />
          </v-col>
          <v-col cols="12" md="3">
            <h3>Mobile logo upload</h3>
            <span class="text-caption text--secondary"
              >Upload at exactly 150px by 30px the size of your Mobile
              logo</span
            >
            <v-img class="image-logo-company" :src="item.logoMobile"></v-img>
            <FormUploadImageCompany />
          </v-col>
          <v-col cols="12" md="3">
            <h3>Login page logo Upload</h3>
            <span class="text-caption text--secondary"
              >Upload at exactly 230px by 300px the size of your Login page
              logo</span
            >
            <v-img class="image-logo-company" :src="item.logoLogin"></v-img>
            <FormUploadImageCompany />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
import FormUploadImageCompany from "./FormUploadImageCompany";
export default {
  props: {
    item: Object,
    timezones: Array,
    currencies: Array
  },
  data() {
    return {
      valid: true,
      companyName: "",
      companyTitle: "",
      loginTitle: "",
      copyrights: "",
      email: "",
      titleLogin: "",
      currency: "",
      timeZone: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  components: {
    FormUploadImageCompany
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        const data = {
          companyName: this.companyName,
          companyTitle: this.companyTitle,
          loginTitle: this.loginTitle,
          copyrights: this.copyrights,
          email: this.email,
          titleLogin: this.titleLogin,
          currency: this.currency,
          timeZone: this.timeZone
        };
        this.$emit("updateCompanySetting", data);
      }
    }
  },
  watch: {
    item(val) {
      this.companyName = val.companyName;
      this.companyTitle = val.companyTitle;
      this.loginTitle = val.loginTitle;
      this.copyrights = val.copyrights;
      this.email = val.email;
      this.titleLogin = val.titleLogin;
      this.currency = val.currency;
      this.timeZone = val.timeZone;
    }
  }
};
</script>
<style scoped>
.image-logo-company {
  height: 250px !important;
}
</style>
