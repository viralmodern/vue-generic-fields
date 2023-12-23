<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-text-field
            :rules="[v => !!v || 'This field is required']"
            v-model="firstName"
            label="First name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :rules="[v => !!v || 'This field is required']"
            v-model="lastName"
            label="Last name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            hint="This contact will be shown to orthers publicly, so choose it carefully"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <span class="text-caption  text--secondary"
            >Marking your frofile public means that anyone on the Dashkit
            network will be able to find you</span
          >
          <v-row no-gutters justify-center align-center>
            <v-col xs2>
              <v-switch
                color="primary"
                v-model="status"
                :label="statusAction"
              ></v-switch>
            </v-col>
            <v-col cols="7" class="mb-1 ml-5">{{ contentStatus }}</v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <v-text-field
            mask="(###) ### - ####"
            v-model="phone"
            label="Phone number"
            placeholder="(___) ___ - ____"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="birthday"
                label="Birthday date"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="birthday"
              :max="new Date().toISOString().substr(0, 10)"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row no-gutters class="justify-end">
        <v-btn color="primary" @click="save">Save</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      firstName: "",
      lastName: "",
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      status: false,
      phone: "",
      birthday: "",
      menu: false
    };
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        alert("update success");
      }
    }
  },
  computed: {
    contentStatus() {
      const text1 = "You are in public";
      const text2 = "You are in private";
      return this.status ? text1 : text2;
    },
    statusAction() {
      return this.status ? "Public" : "Private";
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  }
};
</script>
