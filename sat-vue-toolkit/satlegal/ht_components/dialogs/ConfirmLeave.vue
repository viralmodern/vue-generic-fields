<template>
  <v-dialog :value="isShowPopup" width="500" @input="$emit('cancel')">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}e</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <span>{{ messageConfirm }}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('cancel')">Cancel</v-btn>
        <v-btn color="primary" @click="$emit('remove')">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isShowPopup: Boolean,
    messageConfirm: String,
    title: String
  }
};
</script>
