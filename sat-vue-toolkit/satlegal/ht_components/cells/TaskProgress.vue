<template>
  <td>
    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"

      style="width: 130px"
    >
      <template v-slot:activator="{ on }">
         <v-row no-gutters class="align-center" style="width:100%" v-on="on">
          <span class="caption text--secondary">{{ dataRow.progress }}%</span>
          <v-progress-linear
            class="ma-0"
            :color="showColor(dataRow.progress)"
            :value="dataRow.progress"
          ></v-progress-linear>
        </v-row>
      </template>
      <v-card>
        <v-card-text>
          <v-slider
            @change="changeProgress"
            v-model="progress"
            :thumb-size="24"
            thumb-label="always"
          ></v-slider>
        </v-card-text>
      </v-card>
    </v-menu>
  </td>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      progress: "",
      menu: false
    };
  },
  methods: {
    ...mapActions("ht_store/task/list", ["updateTask"]),
    changeProgress(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.updateTask(data);
      this.menu = false;
    },
    showColor(e) {
      if (e <= 20) {
        return "red darken-1";
      } else if (e <= 40) {
        return "red accent-1";
      } else if (e <= 60) {
        return "orange darken-1";
      } else if (e <= 80) {
        return "amber darken-1";
      } else if (e <= 90) {
        return "green darken-1";
      } else {
        return "light-green darken-1";
      }
    }
  },
  mounted() {
    this.progress = this.dataRow.progress;
  }
};
</script>
