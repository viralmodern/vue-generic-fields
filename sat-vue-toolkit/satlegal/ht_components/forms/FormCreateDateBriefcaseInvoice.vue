<template>
  <v-form ref="form" v-model="valid">
    <v-row class="py-2" no-gutters>
      <v-col cols="12" class="px-1 subheading"
        >Billable recorded timesheet</v-col
      >
      <v-col cols="6" class="px-1">
        <DateMonthPicker
          :rules="[v => !!v || 'This field is required']"
          label="Start date"
          :min="minStartDate"
          :max="billabledRange.endDate"
          :value="billabledRange.startDate"
          @change="billabledRange.startDate = $event"
        />
      </v-col>
      <v-col cols="6" class="px-1">
        <DateMonthPicker
          :disabled="!billabledRange.startDate"
          :rules="[v => !!v || 'This field is required']"
          label="End date"
          :min="billabledRange.startDate"
          :value="billabledRange.endDate"
          @change="billabledRange.endDate = $event"
        />
      </v-col>
      <v-col cols="12" class="px-1 subheading">Expense billable</v-col>
      <v-col cols="6" class="px-1">
        <DateMonthPicker
          :rules="[v => !!v || 'This field is required']"
          label="Start date"
          :min="minStartDate"
          :max="expenseRange.endDate"
          :value="expenseRange.startDate"
          @change="expenseRange.startDate = $event"
        />
      </v-col>
      <v-col cols="6" class="px-1">
        <DateMonthPicker
          :disabled="!expenseRange.startDate"
          :rules="[v => !!v || 'This field is required']"
          label="End date"
          :min="expenseRange.startDate"
          :value="expenseRange.endDate"
          @change="expenseRange.endDate = $event"
        />
      </v-col>
    </v-row>
    <v-btn color="primary" class="ma-0" @click="submit">Continue</v-btn>
  </v-form>
</template>

<script>
import DateMonthPicker from "../menus/DateMonthPicker";
export default {
  components: {
    DateMonthPicker
  },
  data() {
    return {
      valid: false,
      billabledRange: {
        startDate: "",
        endDate: ""
      },
      expenseRange: {
        startDate: "",
        endDate: ""
      }
    };
  },
  computed: {
    minStartDate() {
      const d = new Date();
      return new Date(d.setDate(d.getDate() - 1)).toISOString();
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const data = {
          billabledRange: this.billabledRange,
          expenseRange: this.expenseRange
        };
        this.$emit("submit", data);
      }
    },
    clear() {
      this.billabledRange = {
        startDate: "",
        endDate: ""
      };
      this.expenseRange = {
        startDate: "",
        endDate: ""
      };
      this.$refs.form.resetValidation();
    }
  }
};
</script>
