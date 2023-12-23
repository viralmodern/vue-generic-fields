<template>
  <v-dialog :value="isShowPopup" width="500" @input="$emit('cancel')">
    <v-card>
      <v-card-title>
        <span class="text-h5">Confirm delete board</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row no-gutters>
          <span>Are you sure you want to delete the board?</span>
          <v-row no-gutters class="mt-3">
            <span class="font-weight-bold">Note:</span>
            <span class="ml-2"
              >Deleting board will delete all tasks under it.</span
            >
          </v-row>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('cancel')">Cancel</v-btn>
        <v-btn color="primary" @click="deleteBoard">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isShowPopup: Boolean
  },
  methods: {
    deleteBoard() {
      this.$emit("deleteBoard");
      this.$emit("cancel");
    }
  }
};
</script>
