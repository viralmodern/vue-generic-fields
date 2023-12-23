<template>
  <v-menu :close-on-content-click="false" offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn icon color="primary" v-on="on">
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-row no-gutters>
        <span class="hello">Citations</span>
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
import DraggableColumn from "../../ht_components/slick-table/DraggableColumn";
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
        title: "View detail",
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
        title: "By",
        name: "createby",
        priority: 3
      },
      {
        visible: true,
        title: "Vulnerablity",
        name: "vulnerablity",
        priority: 4
      },
      {
        visible: true,
        title: "Limitation",
        name: "limitation",
        priority: 5
      },
      {
        visible: true,
        title: "Favorable",
        name: "favorable",
        priority: 6
      },
      {
        visible: true,
        title: "Treatment",
        name: "tremeant",
        priority: 7
      },
      {
        visible: true,
        title: "Issue",
        name: "issue",
        priority: 8
      },
      {
        visible: true,
        title: "Last time used",
        name: "lastTimeUser",
        priority: 9
      }
    ]);
  }
};
</script>

<style scoped>
.hello {
  position: absolute;
  left: 38%;
  top: 5%;
  font-size: 20px;
}
</style>
