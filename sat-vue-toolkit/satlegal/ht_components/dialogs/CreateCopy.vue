<template>
  <v-dialog :value="isShowPopup" width="500" @input="$emit('cancel')">
    <v-card>
      <v-card-title>
        <span class="text-h5">Copy board</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>Are you sure to copy this board?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('cancel')">Cancel</v-btn>
        <v-btn color="primary" @click="$emit('cancel')">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isShowPopup: Boolean
  }
};
</script>
