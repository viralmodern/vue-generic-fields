<template>
  <v-row no-gutters class="caption align-center">
    <v-spacer>
      <v-row class="justify-center align-center" no-gutters>
        <span class="mr-2" :style="fontStyle">{{ countLength }}</span>
        <v-text-field
          hide-details
          :value="items.name"
          @input="$emit('updateItem', { name: $event, id: items.id })"
          class="ma-0 pa-0 custom-text-field"
          :style="fontStyle"
        ></v-text-field>
      </v-row>
    </v-spacer>
    <v-btn icon class="ma-0" @click="$emit('removeItem', items.id)">
      <v-icon color="grey">delete_outline</v-icon>
    </v-btn>
  </v-row>
</template>
<script>
export default {
  props: {
    items: Object,
    fontStyle: String,
    countLength: String
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
