<template>
  <div>
    <v-text-field
      dense
      clearable
      outlined
      :rules="emailRules"
      label="Default email"
    />
  </div>
</template>

<script>
import mx_emailRules from '../../../../mixins/mx_emailRules'

export default {
  name: 'AttributesEmail',
  mixins: [mx_emailRules]
}
</script>

<style scoped></style>
