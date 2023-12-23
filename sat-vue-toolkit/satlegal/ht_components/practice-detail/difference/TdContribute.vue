<template>
  <td>
    <v-menu top offset-x>
      <template v-slot:activator="{ on }">
        <v-progress-circular
          v-on="on"
          :size="45"
          :rotate="-90"
          :value="dataRow.contribute"
          :width="5"
          color="primary"
          @onChange="change"
        >
          <span class="text-caption">{{ dataRow.contribute }}%</span>
        </v-progress-circular>
      </template>
      <v-list class="div-slider">
        <v-slider
          @click.native.stop
          @change="change($event)"
          :value="dataRow.contribute"
          thumb-label="always"
          class="pa-3"
          color="primary"
        ></v-slider>
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
    change(value) {
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: value
      };
      this.$emit("onChange", data);
    }
  }
};
</script>
