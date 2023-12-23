<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="time"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        class="custom-text-field ma-0 pa-0"
        v-on="on"
        hide-details
        :value="value"
        readonly
      ></v-text-field>
    </template>
    <v-time-picker v-if="modal" v-model="time">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="cancel">Cancel</v-btn>
      <v-btn color="primary" @click="submit">OK</v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      modal: false,
      time: null
    };
  },
  methods: {
    cancel() {
      this.time = null;
      this.modal = false;
    },
    submit() {
      this.$emit("submit", this.time);
      this.cancel();
    }
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
