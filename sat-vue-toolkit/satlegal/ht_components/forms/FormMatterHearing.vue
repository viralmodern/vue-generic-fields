<template>
  <v-form ref="form" v-model="valid">
    <v-row no-gutters class="px-3 py-1">
      <v-col cols="6">
        <v-text-field
          class="pr-2"
          label="Title"
          :rules="[v => !!v || 'This field is required']"
          hint="Enter title"
          :value="title"
          @input="onChange('title', $event)"
          append-icon="subtitles"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-autocomplete
          hint="Chose matter"
          class="pl-2"
          :items="dataMatter"
          :value="matter"
          @input="onChange('matter', $event)"
          item-text="title"
          label="Matter"
          :rules="[v => !!v || 'This field is required']"
          return-object
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row no-gutters class="px-3 py-1 justify-center">
      <v-col>
        <v-menu
          ref="menu"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="pr-2"
              v-on="on"
              :value="dateFormated"
              label="Date"
              append-icon="date_range"
              readonly
              :rules="[v => !!v || 'Please select a date']"
            ></v-text-field>
          </template>
          <v-date-picker
            :value="date"
            @input="onChange('date', $event)"
            no-title
            scrollable
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="pl-2"
              v-on="on"
              :value="time"
              label="Time"
              append-icon="access_time"
              readonly
              :rules="[v => !!v || 'Please select time']"
            ></v-text-field>
          </template>
          <v-time-picker
            format="24hr"
            :value="time"
            @input="onChange('time', $event)"
            color="blue darken-2"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row no-gutters class="px-3 py-1">
      <v-col cols="6">
        <v-text-field
          label="Apartment number"
          class="pr-2"
          :rules="[v => !!v || 'This field is required']"
          hint="Enter apartment number example: 123"
          :value="apartmentNumber"
          @input="onChange('apartmentNumber', $event)"
          append-icon="home"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Street Name"
          class="pl-2"
          :rules="[v => !!v || 'This field is required']"
          hint="Enter street name example: Linden Street"
          :value="streetName"
          @input="onChange('streetName', $event)"
          append-icon="drive_eta"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="City"
          class="pr-2"
          :rules="[v => !!v || 'This field is required']"
          hint="Enter city example: Oklahoma"
          :value="city"
          @input="onChange('city', $event)"
          append-icon="location_city"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Country"
          class="pl-2"
          :rules="[v => !!v || 'This field is required']"
          hint="Enter country example: Usa"
          :value="country"
          @input="onChange('country', $event)"
          append-icon="public"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters class="px-3 py-1">
      <v-autocomplete
        hint="Chose type"
        :items="types"
        :value="type"
        @input="onChange('type', $event)"
        :rules="[v => !!v || 'This field is required']"
        label="Type"
      ></v-autocomplete>
    </v-row>
    <v-row no-gutters class="px-3 py-1">
      <NotebookEditor
        placeholder="Type your note here..."
        :item="description"
        :editable="true"
        @change="onChange('description', $event)"
      />
    </v-row>
    <v-divider></v-divider>
    <v-row class="px-3 py-1" v-if="!disableAction">
      <v-spacer></v-spacer>
      <v-btn @click="$emit('cancel')">Cancel</v-btn>
      <v-btn class="v-btn theme--light primary" @click="add">{{
        submitName
      }}</v-btn>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

import NotebookEditor from "../editor/NotebookEditor";

export default {
  components: {
    NotebookEditor
  },
  props: {
    submitName: String,
    item: Object,
    disableAction: Boolean
  },
  data() {
    return {
      valid: true,
      dataForm: {},
      date: "",
      time: "",
      description: "",
      matter: "",
      title: "",
      apartmentNumber: "",
      streetName: "",
      city: "",
      country: "",
      type: "",
      types: [
        "Arraignment",
        "Bond Hearing",
        "Contested",
        "Ex Parte",
        "Jury Trial",
        "Mitigation",
        "Motion",
        "Non-Jury Trial",
        "Other Hearing",
        "Prelim Appearance",
        "Pretrial",
        "Review Hearing",
        "Sentencing",
        "Show Cause",
        "Stipulation"
      ]
    };
  },
  computed: {
    dateFormated() {
      return moment(this.date || new Date()).format("MM-DD-YYYY");
    },
    ...mapGetters("ht_store/matter", ["dataMatter"])
  },
  methods: {
    clearData() {
      this.$refs.form.resetValidation();
      this.matter = "";
      this.title = "";
      this.date = "";
      this.time = "";
      this.description = "";
      this.apartmentNumber = "";
      this.streetName = "";
      this.city = "";
      this.country = "";
      this.type = "";
    },
    onChange(name, value) {
      if (name !== "description") {
        this[name] = value;
      }
      this.dataForm = { ...this.dataForm, [name]: value };
      this.$emit("onChangeValue", this.dataForm);
    },
    add() {
      if (this.$refs.form.validate()) {
        this.$emit("submit", this.dataForm);
        this.clearData();
      }
    }
  },
  watch: {
    item(item) {
      if (item) {
        this.matter = item.matter;
        this.title = item.title;
        this.date = item.date;
        this.time = item.time;
        this.description = item.description || "";
        this.apartmentNumber = item.apartmentNumber;
        this.streetName = item.streetName;
        this.city = item.city;
        this.country = item.country;
        this.type = item.type;
      }
    }
  }
};
</script>
