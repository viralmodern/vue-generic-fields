<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        class="pa-0 ma-0"
        v-model="date"
        label="Date time"
        readonly
        hide-details
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <div class="flex-grow-1"></div>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'BuilderDateTime',
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false
  })
}
</script>

<style scoped></style>
