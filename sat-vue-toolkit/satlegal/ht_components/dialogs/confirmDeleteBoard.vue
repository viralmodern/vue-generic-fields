<template>
  <v-row no-gutters class="justify-center">
    <v-btn color="primary" small icon @click.prevent="openDialogConfirm">
      <v-icon small>delete</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5">Confirm deleting card</v-card-title>
        <v-divider></v-divider>
        <v-card-text>Are you sure to delete this card?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="$emit('removeItems')">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    openDialogConfirm() {
      this.dialog = true;
    }
  }
};
</script>
