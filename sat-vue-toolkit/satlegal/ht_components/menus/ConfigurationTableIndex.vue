<template>
  <v-menu :close-on-content-click="false" offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon color="primary">
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
        name: "viewDetail",
        priority: 1
      },
      {
        visible: true,
        title: "Name",
        name: "name",
        priority: 2
      },
      {
        visible: true,
        title: "Create By",
        name: "createby",
        priority: 3
      },
      {
        visible: true,
        title: "Provided By",
        name: "providedBy",
        priority: 4
      },
      {
        visible: true,
        title: "Authored By",
        name: "authoredBy",
        priority: 5
      },
      {
        visible: true,
        title: "Type",
        name: "type",
        priority: 6
      },
      {
        visible: true,
        title: "Added Date",
        name: "addeddate",
        priority: 7
      },
      {
        visible: false,
        title: "Favorable",
        name: "favorable",
        priority: 8
      },
      {
        visible: false,
        title: "Attachment",
        name: "attachment",
        priority: 9
      },
      {
        visible: false,
        title: "Tags",
        name: "tags",
        priority: 10
      },
      {
        visible: false,
        title: "Linked Records",
        name: "linkedrecords",
        priority: 11
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
