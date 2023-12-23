<template>
  <v-menu :close-on-content-click="false" offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn  icon color="primary" v-on="on">
        <v-icon>settings</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-row  no-gutters>
        <span class="hello">Facts table</span>
        <DraggableColumn
          :columns="columns.slice(0, 9)"
          :dragOptions="dragOptions"
          @turnOnOffColumn="turnOnOffColumn"
        />
        <DraggableColumn
          :columns="columns.slice(9, 18)"
          :dragOptions="dragOptions"
          @turnOnOffColumn="turnOnOffColumn"
        />
      </v-row>
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
      { title: "View", visible: true, name: "view", priority: 0 },
      { title: "Time", visible: true, name: "time", priority: 1 },
      { title: "Title", visible: true, name: "title", priority: 2 },
      {
        title: "Subject Matter",
        visible: true,
        name: "subjectMatter",
        priority: 3
      },
      { title: "Characters", visible: true, name: "characters", priority: 4 },
      {
        title: "Cause Of Action",
        visible: true,
        name: "causeOfAction",
        priority: 5
      },
      { title: "Location", visible: true, name: "location", priority: 6 },
      {
        title: "Type",
        visible: true,
        name: "type",
        priority: 7
      },
      { title: "Disputed", visible: true, name: "disputed", priority: 8 },
      {
        title: "Issue",
        visible: false,
        name: "issue",
        priority: 9
      },
      {
        title: "Linked Records",
        visible: false,
        name: "linkedRecords",
        priority: 10
      },
      {
        title: "Relief Sought",
        visible: false,
        name: "reliefSought",
        priority: 11
      },
      { title: "Favorable", visible: false, name: "favorable", priority: 12 },
      {
        title: "Important",
        visible: false,
        name: "valueImportant",
        priority: 13
      },
      { title: "Relevant", visible: false, name: "relevant", priority: 14 },
      { title: "Notes", visible: false, name: "note", priority: 15 },
      { title: "Attachment", visible: false, name: "attachment", priority: 16 },
      { title: "Labels", visible: false, name: "label", priority: 17 }
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
