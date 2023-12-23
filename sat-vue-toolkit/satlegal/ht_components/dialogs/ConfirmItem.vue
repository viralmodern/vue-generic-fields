<template>
  <v-dialog :value="isShowPopup" width="500" @input="$emit('cancel')">
    <v-card>
      <v-card-title>
        <span class="text-h5">Confirm Delete</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div style="margin-top:20px;color:red;font-size:15px">{{ messageConfirm }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('cancel')">Cancel</v-btn>
        <v-btn color="error" @click="$emit('remove')" :loading="isLoading">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isShowPopup: Boolean,
    messageConfirm: String,
    isLoading: Boolean,
  }
};
</script>
