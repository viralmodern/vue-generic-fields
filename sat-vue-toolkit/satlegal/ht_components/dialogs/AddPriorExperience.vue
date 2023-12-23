<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="clear" scrollable persistent width="500">
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Add new prior experience
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="clear">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="title"
              label="Title"
              required
              :rules="[v => !!v || 'This field is required']"
              append-icon="format_align_left"
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-select
              label="From"
              v-model="from"
              :items="listYears"
              menu-props="auto"
            ></v-select>
          </v-row>
          <v-row no-gutters>
            <v-select
              label="to"
              v-model="to"
              :items="listYears"
              menu-props="auto"
            ></v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="employer_name"
              label="Employer name"
              required
              append-icon="format_align_left"
            ></v-text-field>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="address"
              label="Address"
              required
              append-icon="place"
            ></v-text-field>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-textarea
              label="Description"
              v-model="description"
              class="ma-0 custom-text-field fieldDes"
              rows="3"
            ></v-textarea>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="clear">Cancel</v-btn>
          <v-btn color="primary" @click="add" :loading="isLoadingAdd">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    isShow: Boolean,
    dataInvoice: Array,
    isLoadingAdd: Boolean,
  },
  data() {
    return {
      valid: true,
      menuDateFrom: false,
      menuTo: false,
      from: "",
      to: "",
      title: "",
      employer_name: "",
      address: "",
      description: "",
      listYears: []
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          from: this.from,
          to: this.to,
          title: this.title,
          employer_name: this.employer_name,
          address: this.address,
          description: this.description,
        };
        this.$emit("addExpense", data);
      }
    },
    clear() {
      this.from = "";
      this.to = "";
      this.title = "";
      this.employer_name = "";
      this.address = "";
      this.description = "";
      this.$refs.form.resetValidation();
      this.$emit("closeModal");
    }
  },
  created() {
    let year = 1920;
    [...new Array(200)].forEach(() => this.listYears.push(year++));
  }
};
</script>
