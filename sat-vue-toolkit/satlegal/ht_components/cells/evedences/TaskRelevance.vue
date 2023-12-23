<template>
  <td>
    <div class="text-xs-center">
      <v-menu top offset-x>
        <template v-slot:activator="{ on }">
          <v-progress-circular
            v-on="on"
            :size="45"
            :rotate="-90"
            :value="dataRow.relevance"
            :width="5"
            color="primary"
          >
            <span class="text-caption">{{ dataRow.relevance }}%</span>
          </v-progress-circular>
        </template>
        <v-list class="div-slider">
          <v-slider
            @click.native.stop
            @change="changeSlider"
            :value="dataRow.relevance"
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
    ...mapActions("ht_store/matter/discovery/evidences", ["updateTask"]),
    changeSlider(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        groupType: this.$route.params.groupType
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
