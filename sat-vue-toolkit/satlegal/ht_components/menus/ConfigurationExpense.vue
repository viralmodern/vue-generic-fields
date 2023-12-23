<template>
  <v-menu :close-on-content-click="false" offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn icon color="primary" v-on="on">
        <v-icon>settings</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-row  no-gutters>
        <span class="hello">Expense</span>
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
        title: "Name",
        name: "name",
        priority: 1
      },
      {
        visible: true,
        title: "Created by",
        name: "createBy",
        priority: 2
      },
      {
        visible: false,
        title: "Receipt",
        name: "receipt",
        priority: 3
      },
      {
        visible: false,
        title: "Amount",
        name: "amount",
        priority: 5
      },
      {
        visible: true,
        title: "Billed by",
        name: "billedBy",
        priority: 7
      },
      {
        visible: false,
        title: "Created Date",
        name: "createdDate",
        priority: 8
      },
      {
        visible: false,
        title: "Created Time",
        name: "createdTime",
        priority: 9
      },
      {
        visible: true,
        title: "Status",
        name: "status",
        priority: 10
      },
      {
        visible: true,
        title: "Action",
        name: "action",
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
