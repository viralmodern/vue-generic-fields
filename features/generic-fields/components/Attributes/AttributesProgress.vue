<template>
  <div>
    <v-text-field dense clearable type="number" outlined label="Min" />
    <v-text-field dense clearable type="number" outlined label="max" />
    <v-text-field
      dense
      clearable
      type="number"
      outlined
      hide-details
      label="Increment"
    />
  </div>
</template>

<script>
export default {
  name: 'AttributesProgress'
}
</script>

<style scoped></style>
