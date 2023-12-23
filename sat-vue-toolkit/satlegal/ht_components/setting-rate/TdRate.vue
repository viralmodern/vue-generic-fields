<template>
  <td class="py-2">
    <v-menu top offset-y>
      <template v-slot:activator="{ on }">
        <span v-on="on">
          {{dataRow.rate}}%
        </span>
      </template>
      <v-list class="pa-3">
        <v-slider :value="dataRow.rate" @change="onChange" :thumb-size="24" thumb-label="always"></v-slider>
      </v-list>
    </v-menu>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    onChange(value) {
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: value
      };
      this.$emit('onChange', data)
    }
  }
};
</script>
