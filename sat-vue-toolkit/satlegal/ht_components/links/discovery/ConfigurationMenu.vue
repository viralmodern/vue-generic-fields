<template>
  <v-menu :close-on-content-click="false" offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn icon color="primary" v-on="on">
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-row  no-gutters>
        <DraggableColumn
          title="General"
          :columns="sliceGerenal"
          :dragOptions="dragOptions"
          @turnOnOffColumn="turnOnOffColumn"
        />
        <DraggableColumn
          title="Linked Records"
          :columns="sliceLinedRecords"
          :dragOptions="dragOptions"
          @turnOnOffColumn="turnOnOffColumn"
        />
      </v-row>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DraggableColumn from "../../slick-table/DraggableColumn";
export default {
  components: {
    DraggableColumn
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
    dataMenuComlum() {
      return this.$route.params.groupType === "hearsay-grid"
        ? this.columHearsay
        : this.$route.params.groupType === "evidences-grid"
        ? this.columnEvidences
        : this.$route.params.groupType === "testimony-grid"
        ? this.columnTestimony
        : [];
    },
    sliceGerenal() {
      return this.$route.params.groupType === "hearsay-grid"
        ? this.columns.slice(0, 9)
        : this.$route.params.groupType === "evidences-grid"
        ? this.columns.slice(0, 8)
        : this.$route.params.groupType === "testimony-grid"
        ? this.columns.slice(0, 5)
        : [];
    },
    sliceLinedRecords() {
      return this.$route.params.groupType === "hearsay-grid"
        ? this.columns.slice(9, 19)
        : this.$route.params.groupType === "evidences-grid"
        ? this.columns.slice(8, 17)
        : this.$route.params.groupType === "testimony-grid"
        ? this.columns.slice(5, 11)
        : [];
    }
  },
  methods: {
    ...mapMutations("ht_store/slick", ["turnOnOffColumn", "initializeAllColumns"])
  },
  mounted() {
    this.initializeAllColumns(this.dataMenuComlum);
  },
  data() {
    return {
      columHearsay: [
        {
          title: "View",
          visible: true,
          name: "viewDetail",
          priority: 0
        },
        {
          title: "Name",
          visible: true,
          name: "name",
          priority: 1
        },
        {
          title: "Original Date",
          visible: false,
          name: "originalDate",
          priority: 3
        },
        {
          title: "Exception",
          visible: true,
          name: "exception",
          priority: 7
        },
        {
          title: "Declarant Available",
          visible: true,
          name: "declarantAvailable",
          priority: 8
        },
        {
          title: "Exception Type",
          visible: true,
          name: "exceptionType",
          priority: 9
        },
        {
          title: "Authored By",
          visible: false,
          name: "authoredBy",
          priority: 10
        },
        {
          title: "Provided By",
          visible: true,
          name: "providedBy",
          priority: 11
        },
        {
          title: "Favorable",
          visible: false,
          name: "favorable",
          priority: 12
        },
        {
          title: "Tags",
          visible: true,
          name: "tags",
          priority: 16
        },
        {
          title: "Linked Records",
          visible: false,
          name: "linkedrecords",
          priority: 17
        }
      ],
      columnTestimony: [
        {
          title: "View",
          visible: true,
          name: "viewDetail",
          priority: 0
        },
        {
          title: "Name",
          visible: true,
          name: "name",
          priority: 1
        },
        {
          title: "Created By",
          visible: true,
          name: "createby",
          priority: 2
        },
        {
          title: "Original Date",
          visible: false,
          name: "originalDate",
          priority: 3
        },
        {
          title: "Under Oath",
          visible: true,
          name: "underOath",
          priority: 4
        },
        {
          title: "Provided By",
          visible: true,
          name: "providedBy",
          priority: 5
        },
        {
          title: "Authored By",
          visible: false,
          name: "authoredBy",
          priority: 6
        },
        {
          title: "Favorable",
          visible: true,
          name: "favorable",
          priority: 7
        },
        {
          title: "Tags",
          visible: true,
          name: "tags",
          priority: 8
        },
        {
          title: "Linked Records",
          visible: false,
          name: "linkedrecords",
          priority: 9
        },
        {
          title: "Attachment",
          visible: true,
          name: "attachment",
          priority: 10
        }
      ],
      columnEvidences: [
        {
          title: "View",
          visible: true,
          name: "viewDetail",
          priority: 0
        },
        {
          title: "Name",
          visible: true,
          name: "name",
          priority: 1
        },
        {
          title: "Created By",
          visible: true,
          name: "createby",
          priority: 2
        },
        {
          title: "Original Date",
          visible: true,
          name: "originalDate",
          priority: 3
        },
        {
          title: "Disputed",
          visible: true,
          name: "disputed",
          priority: 4
        },
        {
          title: "Materiality",
          visible: true,
          name: "materiality",
          priority: 5
        },
        {
          title: "Relevance",
          visible: true,
          name: "relevance",
          priority: 6
        },
        {
          title: "Admissbility",
          visible: true,
          name: "admissbility",
          priority: 7
        },
        {
          title: "Provided By",
          visible: false,
          name: "providedBy",
          priority: 8
        },
        {
          title: "Authored By",
          visible: false,
          name: "authoredBy",
          priority: 9
        },
        {
          title: "Favorable",
          visible: false,
          name: "favorable",
          priority: 10
        },
        {
          title: "Material Level",
          visible: false,
          name: "materialLevel",
          priority: 11
        },
        {
          title: "Admissibility Level",
          visible: false,
          name: "admissibilityLevel",
          priority: 12
        },
        {
          title: "Relevance Level",
          visible: false,
          name: "relevanceLevel",
          priority: 13
        },
        {
          title: "Tags",
          visible: true,
          name: "tags",
          priority: 14
        },
        {
          title: "Linked Records",
          visible: false,
          name: "linkedrecords",
          priority: 15
        },
        {
          title: "Attachment",
          visible: false,
          name: "attachment",
          priority: 16
        }
      ]
    };
  },
  watch: {
    $route(val) {
      this.initializeAllColumns(this.dataMenuComlum);
      return val;
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
