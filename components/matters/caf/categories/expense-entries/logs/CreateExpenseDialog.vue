<template>
  <DialogPicker
    :dialog="dialog"
    :max-width="600"
    @agree="submit"
    text-agree="save"
    text-disagree="cancel"
    title="Create New Expense"
    @disagree="$emit('close')"
  >
    <div>
      Create New Expense chỉ cần field Expense Amount, Expense Code hoặc Expense
      Category
      <v-form @submit.prevent="submit" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-text-field
              hide-details
              required
              v-model="expense_name"
              label="Expense Name"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Expense Amount"
              hide-details
              value="10.00"
              v-model="expense_amount"
              prefix="$"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              v-model="expense_code"
              item-value="code"
              :items="expenses_code"
              label="Expense Code"
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </DialogPicker>
</template>

<script>
import DialogPicker from '../../../../../utils/DialogPicker'
import { EXPENSES_CODE } from '../../../../../../mock/fields'

export default {
  name: 'CreateExpenseDialog',
  components: { DialogPicker },
  data() {
    return {
      expenses_code: EXPENSES_CODE,
      expense_name: '',
      expense_amount: '10.00',
      expense_code: ''
    }
  },
  props: {
    dialog: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    submit() {
      let data = {
        expense_name: this.expense_name,
        expense_amount: this.expense_amount,
        expense_code: this.expense_code
      }
      this.$eventHub.$emit('add-expense-log', data)
      this.$emit('close')
    }
  }
}
</script>

<style scoped></style>
