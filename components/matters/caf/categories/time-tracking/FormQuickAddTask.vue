<template>
  <v-form ref="form" @submit.prevent="submit" v-model="valid" lazy-validation>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="name"
          :rules="[(v) => !!v || 'Name is required']"
          label="Taskboard Name"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          small-chips
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Board is required']"
          label="Select Board"
          required
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <ChooseColor @change-color="changeColor" />
      </v-col>
      <v-col cols="12" sm="6"></v-col>
      <v-col cols="12" sm="6"></v-col>
      <v-col cols="12" sm="6"></v-col>
    </v-row>

    <div class="mt-4 d-flex">
      <div class="flex-grow-1"></div>
      <v-btn type="submit" color="primary">Create</v-btn>
    </div>
  </v-form>
</template>

<script>
import ChooseColor from '../../../../utils/ChooseColor'

export default {
  name: 'FormQuickAddTask',
  components: { ChooseColor },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: ['DONG A', 'HT'],
    checkbox: false,
    date: '',
    time: ''
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    changeColor({ color }) {
      console.log('color', color)
    },
    submit() {
      return false
    }
  }
}
</script>

<style scoped></style>
