<template>
  <v-form ref="form" @submit.prevent="submit" v-model="valid" lazy-validation>
    <v-text-field v-model="name" label="Taskboard Name" required></v-text-field>
    <v-select
      multiple
      chips
      v-model="select"
      :items="items"
      :rules="[(v) => !!v || 'Item is required']"
      label="Members"
      required
    ></v-select>
    <ChooseColor @change-color="changeColor" />
    <div class="mt-4 d-flex">
      <div class="flex-grow-1"></div>
      <v-btn type="submit" color="primary">Create</v-btn>
    </div>
  </v-form>
</template>

<script>
import ChooseColor from '../../../../utils/ChooseColor'

export default {
  name: 'FormQuickAddTaskBoard',
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
    items: ['John', 'Vue'],
    checkbox: false
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
