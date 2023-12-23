<template>
  <v-btn
    @click="$emit('click', $event)"
    small
    depressed
    :input-value="true"
    block
    active-class="primary--text"
    class="text-capitalize caption"
  >
    {{ label }}
    <!--    <v-icon small>mdi-plus</v-icon>-->
  </v-btn>
</template>

<script>
export default {
  name: 'LinkAddPageGeneric',
  props: {
    label: {
      type: String,
      default: () => `Add Page`,
    },
  },
}
</script>

<style scoped></style>
