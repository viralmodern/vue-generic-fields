<template>
  <v-menu :close-on-content-click="false" offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">
        <v-icon>mdi-settings</v-icon>Configuration
      </v-btn>
    </template>
    <v-card>
      <v-row no-gutters>
        <DraggableColumn
          title="General"
          :columns="columns.slice(0, 13)"
          :dragOptions="dragOptions"
          @turnOnOffColumn="postTurnOnOffColumn"
        />

        <v-row no-gutters>
          <DraggableColumn
            title="Byzantine"
            :columns="columns.slice(13, 24)"
            :dragOptions="dragOptions"
            @turnOnOffColumn="postTurnOnOffColumn"
          />
          <DraggableColumn
            title="Type"
            :columns="columns.slice(49, 52)"
            :dragOptions="dragOptions"
            @turnOnOffColumn="postTurnOnOffColumn"
          />
        </v-row>

        <v-row no-gutters>
          <DraggableColumn
            title="Date and Time"
            :columns="columns.slice(43, 49)"
            :dragOptions="dragOptions"
            @turnOnOffColumn="postTurnOnOffColumn"
          />
          <DraggableColumn
            title="Strategy"
            :columns="columns.slice(52, 54)"
            :dragOptions="dragOptions"
            @turnOnOffColumn="postTurnOnOffColumn"
          />
        </v-row>

        <v-row no-gutters>
          <DraggableColumn
            title="Log"
            :columns="columns.slice(34, 38)"
            :dragOptions="dragOptions"
            @turnOnOffColumn="postTurnOnOffColumn"
          />
          <DraggableColumn
            title="Toolbox"
            :columns="columns.slice(38, 43)"
            :dragOptions="dragOptions"
            @turnOnOffColumn="postTurnOnOffColumn"
          />
        </v-row>

        <DraggableColumn
          title="Linked"
          :columns="columns.slice(24, 34)"
          :dragOptions="dragOptions"
          @turnOnOffColumn="postTurnOnOffColumn"
        />
      </v-row>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DraggableColumn from "./DraggableColumn";
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
    },
    finishDrag(event) {
      if (!event || !event.moved || !event.moved.element) return;
      this.moveColumn({
        name: event.moved.element.name,
        priority: event.moved.newIndex,
        isMoveUp: event.moved.newIndex - event.moved.oldIndex < 0
      });
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
