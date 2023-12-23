<template>
  <div>
    <v-select
      :items="items"
      outlined
      clearable
      hide-details
      dense
      label="Unit"
    />
    <v-switch label="Allow negative numbers" />
    <v-text-field
      dense
      clearable
      hide-details
      outlined
      type="number"
      label="Default Value"
    />
  </div>
</template>

<script>
export default {
  name: 'AttributesCurrency',
  data() {
    return {
      items: [
        {
          text: 'Dollars ($100)',
          value: 0
        },
        {
          text: 'Euros (€100)',
          value: 1
        },
        {
          text: 'Pounds (£100)',
          value: 2
        }
      ]
    }
  }
}
</script>

<style scoped></style>
