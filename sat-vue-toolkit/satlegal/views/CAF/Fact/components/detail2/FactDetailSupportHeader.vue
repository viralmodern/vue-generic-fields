<template>
  <v-row no-gutters class="align-center">
    <v-col cols="5" style="word-break: break-all;">
      <v-textarea
        hide-details
        auto-grow
        :value="name"
        class="ma-0 pa-0 custom-text-field"
        rows="1"
        @change="$emit('changeNameSupport', $event)"
      ></v-textarea>
    </v-col>
    <v-col cols="4"></v-col>
    <v-col cols="3">
      <v-row no-gutters class="align-center justify-end">
        <v-badge class="badge ml-1" overlap color="purple">
          <template v-slot:badge>
            <span>{{ message }}</span>
          </template>
          <v-icon color="grey">mdi-supervisor_account</v-icon>
        </v-badge>
        <v-btn icon @click="$emit('removeSupport')">
          <v-icon>mdi-delete_outline</v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    name: String,
    message: Number
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
