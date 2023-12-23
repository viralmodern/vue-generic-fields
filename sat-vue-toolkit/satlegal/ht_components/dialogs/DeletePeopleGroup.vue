<template>
  <v-dialog
    :value="dialogDelete"
    @input="$emit('closeDialogDelete')"
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h5">Confirm delete</v-card-title>
      <v-divider></v-divider>
      <v-card-text>Are you sure you want to delete this group?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('closeDialogDelete')">Cancel</v-btn>
        <v-btn color="primary" @click="$emit('deleteCardGroup')">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialogDelete: Boolean
  }
};
</script>
