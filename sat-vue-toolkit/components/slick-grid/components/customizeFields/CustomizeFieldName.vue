<template>
  <v-text-field :label="label"
                :value="value"
                @input="data => $emit('input', {data, k: 'field_name'})"/>
</template>

<script>
  export default {
    name: "CustomizeFieldName",
    props: {
      value: {
        type: [String, Number],
        default: () => ''
      },
      label: {
        type: [String, Number],
        default: () => 'Field Name'
      },

    }
  }
</script>

<style scoped>

</style>
