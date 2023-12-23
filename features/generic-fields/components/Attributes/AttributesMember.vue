<template>
  <div>
    <v-switch
      :ripple="false"
      hide-details
      label="Allow adding multiple collaborators"
    />
    <v-switch :ripple="false" label="Notify users when they are added" />
  </div>
</template>

<script>
export default {
  name: 'AttributesMember'
}
</script>

<style scoped></style>
