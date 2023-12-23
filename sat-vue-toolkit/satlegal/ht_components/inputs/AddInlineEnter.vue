<template>
  <v-form ref="form" v-model="valid" @submit.prevent="add" lazy-validation>
    <v-text-field
      v-model="text"
      :rules="[v => (v || '').length > 0 || requireName]"
      v-on:blur="() => $refs.form.resetValidation()"
      :label="label"
      :hint="hint"
      :prepend-inner-icon="prependInnerIcon"
      required
    ></v-text-field>
  </v-form>
</template>
<script>
export default {
  props: {
    requireName: String,
    label: String,
    hint: String,
    prependInnerIcon: String
  },
  data() {
    return {
      valid: true,
      text: ""
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        this.$emit("add", this.text);
        this.$refs.form.reset();
      }
    }
  }
};
</script>