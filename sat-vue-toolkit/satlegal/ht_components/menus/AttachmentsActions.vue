<template>
  <v-menu offset-y right>
    <template v-slot:activator="{ on }">
      <v-btn small class="ma-0 custom" v-on="on" icon :disabled="isDisabled">
        <v-icon small class="text--secondary">more_vert</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item style="min-height:35px" class="mb-1" @click="$emit('updateAttachment')">
        <v-list-item-title class="caption">Update</v-list-item-title>
      </v-list-item>
      <v-list-item style="min-height:35px" class="mb-1" @click="$emit('removeAttachment')">
        <v-list-item-title class="caption">Remove</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>
