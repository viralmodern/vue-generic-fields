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
          <v-select
            :items="listGender"
            v-model="gender"
            :rules="[v => !!v || 'Gender is required']"
            label="Gender"
          ></v-select>
          <v-menu
            ref="menu"
            v-model="menu"
            transition="scale-transition"
            :close-on-content-click="false"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                v-model="birthday"
                label="Birthday"
                readonly
                :rules="[v => !!v || 'Please select a date']"
                append-icon="mdi-calendar"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="birthday"
              no-title
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
          <v-autocomplete
            :items="listLocations"
            multiple
            v-model="locations"
            :rules="[v => !!v.length || 'Localtion is required']"
            label="Location"
          ></v-autocomplete>
          <v-textarea rows="9" v-model="aboutMe" label="About me"></v-textarea>
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
export default {
  props: {
    isShow: Boolean,
    title: String,
    itemEdit: Object
  },
  data() {
    return {
      valid: true,
      menu: false,
      listGender: ["Female", "Male"],
      gender: "",
      listLocations: ["London, UK", "New York, UK"],
      locations: [],
      birthday: "",
      aboutMe: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("closeModal");
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    edit() {
      if (this.$refs.form.validate()) {
        const data = {
          gender: this.gender,
          locations: this.locations,
          birthday: this.birthday,
          aboutMe: this.aboutMe
        };
        this.$emit("edit", data);
        this.cancel();
      }
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        const { gender, birthday, locations, aboutMe } = this.itemEdit;
        this.gender = gender;
        this.birthday = birthday;
        this.locations = locations;
        this.aboutMe = aboutMe;
      }
    }
  }
};
</script>
