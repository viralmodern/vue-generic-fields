<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="$emit('cancel')" width="750" persistent>
      <div class="primary">
        <v-row no-gutters class="pa-3 justify-center align-center">
          <div class="title font-weight-regular white--text">Category List</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="$emit('cancel')">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-card>
        <SlickTable
          @update:pagination="updatePagination"
          :totals="totals"
          :items="category"
          :headers="headers"
          :loading="isLoading"
        >
          <template slot="cell" slot-scope="props">
            <component
              :is="getDisplayComponent(props.column.name)"
              :column="props.column"
              :dataRow="props.dataRow"
              @remove="
                removeCategory({
                  id: $event,
                  matterId:$route.params.matter || $route.params.projectId
                })
              "
              @update="update(props.column.name, props.dataRow.id, $event)"
            />
          </template>
          <template v-slot:top>
            <v-row justify="end" no-gutters class="mx-2">
              <v-btn outlined color="primary" @click="dialogColor = true">
                <span>Add new</span>
                <v-icon class="pl-1">add</v-icon>
              </v-btn>
            </v-row>
          </template>
        </SlickTable>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$emit('cancel')">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <AddCategory :dialogColor="dialogColor" @cancel="dialogColor = false" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../slick-table/SlickTable2";
import CtActions from "../helpdesk/cells/CtActions";
import CtColor from "../helpdesk/cells/CtColor";
import CtDesc from "../helpdesk/cells/CtDesc";
import CtName from "../helpdesk/cells/CtName";
import AddCategory from "./AddCategory";

export default {
  components: {
    SlickTable,
    CtActions,
    CtColor,
    CtDesc,
    CtName,
    AddCategory
  },
  props: {
    isShow: Boolean
  },
  data() {
    return {
      dialogColor: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/helpDesk/category", [
      "totals",
      "category",
      "isLoading"
    ]),
    headers() {
      return [
        {
          visible: true,
          sortable: false,
          text: "Actions",
          value: "actions",
          name: "actions"
        },
        {
          visible: true,
          sortable: false,
          text: "Name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Color",
          value: "color",
          name: "color"
        },
        {
          visible: true,
          sortable: false,
          text: "Desc",
          value: "desc",
          name: "desc"
        }
      ];
    }
  },
  methods: {
    ...mapActions("ht_store/matter/helpDesk/category", [
      "removeCategory",
      "updateCategory"
    ]),
    updatePagination({ page }) {
      return page;
    },
    update(columnName, rowId, newValue) {
      const dataRequest = {
        columnName,
        rowId,
        newValue,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        bodyRequest: {
          [columnName]: newValue
        }
      };
      this.updateCategory(dataRequest);
    },
    getDisplayComponent(columnName) {
      if (columnName === "actions") {
        return CtActions;
      }
      if (columnName === "color") {
        return CtColor;
      }
      if (columnName === "name") {
        return CtName;
      }
      if (columnName === "desc") {
        return CtDesc;
      }
      return "td";
    }
  }
};
</script>
