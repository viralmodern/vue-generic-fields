<template>
  <td>
    <v-row no-wrap no-gutters class="align-center">
      <v-text-field
        hide-details
        :value="dataRow[column.name]"
        @change="$emit('update', $event)"
        class="ma-0 pa-0 custom-text-field"
      ></v-text-field>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" small @click="$emit('openEmoji')" icon>
          <v-icon>mdi-add</v-icon>
        </v-btn>
      </template>
    </v-row>
  </td>
</template>
<script>
export default {
  props: {
    column: Object,
    dataRow: Object
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
