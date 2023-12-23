<template>
  <div>
    <v-menu :close-on-content-click="false" offset-x left>
      <template v-slot:activator="{ on }">
        <v-btn icon color="primary">
          <v-icon>settings</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-row  no-gutters>
          <span class="hello">General</span>
          <DraggableColumn
            :columns="columns"
            :dragOptions="dragOptions"
            @turnOnOffColumn="turnOnOffColumn"
          />
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DraggableColumn from "../slick-table/DraggableColumn";
export default {
  components: {
    DraggableColumn
  },
  methods: {
    ...mapMutations("ht_store/slick", ["turnOnOffColumn", "initializeAllColumns"])
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
    }
  },
  mounted() {
    this.initializeAllColumns([
      {
        visible: true,
        title: "View",
        name: "view",
        priority: 1
      },
      {
        visible: true,
        title: "Standard practice",
        name: "name",
        priority: 2
      },
      {
        visible: true,
        title: "Provided by",
        name: "by",
        priority: 3
      },
      {
        visible: true,
        title: "Date Provided",
        name: "date",
        priority: 4
      },
      {
        visible: true,
        title: "Injury",
        name: "injury",
        priority: 5
      },
      {
        visible: true,
        title: "Injury Labels",
        name: "injuryLabel",
        priority: 6
      },
      {
        visible: true,
        title: "Tags",
        name: "tag",
        priority: 9
      },
      {
        visible: true,
        title: "Action",
        name: "action",
        priority: 10
      }
    ]);
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
.hello {
  position: absolute;
  left: 38%;
  top: 5%;
  font-size: 20px;
}
</style>
