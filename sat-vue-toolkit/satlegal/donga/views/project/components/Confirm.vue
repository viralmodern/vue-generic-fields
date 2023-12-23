<template>
  <v-row no-gutters class="justify-center">
    <v-dialog v-model="openConfirm" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5 pb-0">Confirmation</v-card-title>
        <v-card-text class="pb-0">
          Do you want remove <strong>{{ title ? title : "this" }}</strong> ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click.stop="toggleDialog"
            >Cancel</v-btn
          >
          <v-btn color="green darken-1" @click.stop="confirmDialog"
            >Agree</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Confirm",
  props: {
    onConfirm: {
      type: Function,
      required: true
    },
    openConfirm: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      dialog: false,
      agree: false
    };
  },
  methods: {
    toggleDialog() {
      this.$emit("toggleConfirm");
    },
    confirmDialog() {
      this.$emit("toggleConfirm");
      this.onConfirm();
    }
  }
};
</script>

<style scoped></style>
