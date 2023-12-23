<template>
  <v-dialog :value="isShow" @input="closeDialog" :width="width">
    <v-card>
      <v-stepper v-model="formStep">
        <v-stepper-header>
          <v-stepper-step :complete="formStep > 1" step="1">Select time range</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="formStep > 2" step="2">Tax</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="formStep > 3" step="3">Preview</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <FormCreateDateBriefcaseInvoice ref="step1" @submit="submitStep1"/>
          </v-stepper-content>
          <v-stepper-content step="2">
            <BriefcaseListTax ref="step2" @submit="submitStep2" @back="formStep = 1"/>
          </v-stepper-content>
          <v-stepper-content step="3" class="px-0 py-1">
            <div style="max-height: 500px;overflow: auto;">
              <InvoiceBuilderCard/>
            </div>
            <v-divider></v-divider>
            <div class="pa-2">
              <v-btn color="primary" @click="add">Add</v-btn>
              <v-btn class="my-0" @click="formStep = 2; width = 600">Back</v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>
<script>
import FormCreateDateBriefcaseInvoice from "../forms/FormCreateDateBriefcaseInvoice";
import BriefcaseListTax from "../list/BriefcaseListTax";
import InvoiceBuilderCard from "./InvoiceBuilderCard";

export default {
  components: {
    FormCreateDateBriefcaseInvoice,
    BriefcaseListTax,
    InvoiceBuilderCard
  },
  props: {
    isShow: Boolean,
    header: String,
    disabledFieldClient: Boolean
  },
  data() {
    return {
      formStep: 1,
      step1: {},
      step2: {},
      width: 600
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    submitStep1(data) {
      this.step1 = data;
      this.formStep = 2;
    },
    submitStep2(taxes) {
      this.step2 = taxes;
      this.formStep = 3;
      this.width = 1200;
    },
    add() {
      const data = {
        step1: this.step1,
        step2: this.step2
      };
      this.clear();
      this.$emit("submit", data);
    },
    clear() {
      this.step1 = {};
      this.step2 = {};
      this.formStep = 1;
      this.width = 600;
      this.$refs.step1.clear();
      this.$refs.step2.clear();
    }
  }
};
</script>
