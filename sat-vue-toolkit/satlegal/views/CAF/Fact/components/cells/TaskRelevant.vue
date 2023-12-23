<template>
  <td>
    <div class="text-xs-center">
      <v-menu top offset-x>
        <v-progress-circular
          v-slot:activator="{ on }"
          :size="45"
          :rotate="-90"
          :value="dataRow.relevant"
          :width="5"
          color="primary"
        >
          <span v-on="on" class="caption">{{ dataRow.relevant }}%</span>
        </v-progress-circular>
        <v-list class="div-slider">
          <v-slider
            @click.native.stop
            @change="changeSlider"
            :value="dataRow.relevant"
            thumb-label="always"
            class="pt-3"
            color="primary"
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
    ...mapActions("ht_store/project/research/facts", ["updateTask"]),
    changeSlider(e) {
      const data = {
        taskId: this.dataRow.id,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        body: {
          relevant: e
        }
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
