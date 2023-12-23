<template>
  <v-menu :close-on-content-click="false" offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">
        <v-icon>mdi-settings</v-icon>Configuration
      </v-btn>
    </template>
    <v-card>
      <DraggableColumn
        title="General"
        :columns="columns"
        :dragOptions="dragOptions"
        @turnOnOffColumn="postTurnOnOffColumn"
      />
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DraggableColumn from "../slick-table/DraggableColumn";
export default {
  components: {
    DraggableColumn
  },
  methods: {
    ...mapMutations("ht_store/slick", [
      "turnOnOffColumn",
      "updateArrColumn",
      "moveColumn"
    ]),
    postTurnOnOffColumn(column) {
      this.turnOnOffColumn(column);
      const columnsAdditional = [
        {
          title: "Date Happened",
          visible: true,
          name: "datehappened",
          priority: 16
        },
        { title: "GapTime", visible: true, name: "gaptime", priority: 18 },
        { title: "Count Down", visible: true, name: "countdown", priority: 19 }
      ];
      this.updateArrColumn({ column, columnsAdditional });
    }
  },
  computed: {
    ...mapGetters("ht_store/slick", ["columns"]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    sortModel() {
      return this.columns.slice();
    }
  }
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
