<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          label="Expense Name*"
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-select
          hide-details
          :items="['0-17', '18-29', '30-54', '54+']"
          label="Expense Category"
          required
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-select
          hide-details
          :items="['0-17', '18-29', '30-54', '54+']"
          label="Expense Code"
          required
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-select
          hide-details
          :items="['0-17', '18-29', '30-54', '54+']"
          label="Create By"
          required
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-autocomplete
          hide-details
          :items="['No Tax (0)', '5.00%  (5)', '10.00%  (10)', '18.00% (18)']"
          label="Tax 1"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-autocomplete
          hide-details
          :items="['No Tax (0)', '5.00% (5)', '10.00% (10)', '18.00% (18)']"
          label="Tax 2"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          hide-details
          label="Total Tax"
          readonly
          disabled
          value="10.00"
          hide-details
          type="number"
          prefix="$"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <v-text-field
          hide-details
          label="Expense Amount"
          hide-details
          type="number"
          prefix="$"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          hide-details
          label="Amount with tax"
          readonly
          disabled
          value="10.00"
          hide-details
          type="number"
          prefix="$"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-autocomplete
          hide-details
          :items="['No Tax (0)', '5.00% (5)', '10.00% (10)', '18.00% (18)']"
          label="Billable"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-autocomplete
          hide-details
          :items="['No Tax (0)', '5.00% (5)', '10.00% (10)', '18.00% (18)']"
          label="Activities Code"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-autocomplete
          hide-details
          :items="['No Tax (0)', '5.00% (5)', '10.00% (10)', '18.00% (18)']"
          label="Paid Status"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field hide-details label="Reference"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-file-input chips multiple label="Receipt"></v-file-input>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-textarea
          hide-details
          hide-details
          label="Expense Description"
          required
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="12" md="12" class="d-flex">
        <div class="flex-grow-1"></div>
        <v-btn color="primary">Submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LogsRowItemFormDetail'
}
</script>

<style scoped></style>
