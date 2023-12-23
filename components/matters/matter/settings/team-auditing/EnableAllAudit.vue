<template>
  <v-alert v-model="alert"
           color="primary"
           border="left"
           elevation="2"
           colored-border>
    <v-list-item three-line dense>
      <v-list-item-action>
        <v-switch ripple hint="Enable auditing for all events" persistent-hint
                  color="primary"
                  value="red"
        ></v-switch>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          All Events
        </v-list-item-title>
        <v-list-item-subtitle>Enable auditing for all events
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-alert>
</template>

<script>
export default {
  name: "EnableAllAudit",
  data() {
    return {
      alert: true,
    }
  },
}
</script>

<style scoped>

</style>
