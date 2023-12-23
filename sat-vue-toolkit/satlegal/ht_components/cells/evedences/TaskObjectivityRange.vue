<template>
  <td>
    <div class="text-xs-center">
      <v-menu top offset-x>
        <template v-slot:activator="{ on }">
          <v-progress-circular
            v-on="on"
            :size="45"
            :rotate="-90"
            :value="dataRow.objectivity"
            :width="5"
            color="green"
          >
            <span class="text-caption">{{ dataRow.objectivity }}%</span>
          </v-progress-circular>
        </template>
        <v-list class="div-slider">
          <v-slider
            @click.native.stop
            @change="changeSlider"
            :value="dataRow.objectivity"
            thumb-label="always"
            class="pt-3"
            color="green"
          ></v-slider>
        </v-list>
      </v-menu>
    </div>
  </td>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/evidences", ["updateTask"]),
    changeSlider(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.updateTask(data);
    }
  }
};
</script>
<style scoped>
.div-slider {
  padding: 10px;
  width: 250px;
}
</style>
