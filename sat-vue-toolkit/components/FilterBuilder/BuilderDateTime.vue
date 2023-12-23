<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="value.valueBefore"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field v-bind="vBind"
                    :value="value.valueBefore"
                    v-on="on">
      </v-text-field>
    </template>
    <v-date-picker :value="value.valueBefore"
                   @input="(valueBefore) => $emit('input', {valueBefore})"
                   no-title scrollable>
      <div class="flex-grow-1"></div>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(value.valueBefore)">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
  import { vBindField } from "./configs"
  import builderProps from "./builderProps"
  export default {
    name: "BuilderDateTime",
    props: {
      vBind: {
        ...vBindField,
      },
      ...builderProps
    },
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false
    })
  }
</script>

<style scoped></style>
