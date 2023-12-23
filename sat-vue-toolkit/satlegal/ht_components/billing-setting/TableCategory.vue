<template>
  <div>
    <SlickTable :items="categories" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @onChange="updateSettingCategoryRequest($event)"
          @deleteCategory="deleteCategoryRequest"
        />
      </template>
      <template v-slot:top>
        <v-btn color="primary" outlined @click="isShowCategory = true">
          <v-icon class="mr-2">mdi-add_circle</v-icon>
          <span class="hidden-sm-and-down">Add new category</span>
        </v-btn>
      </template>
    </SlickTable>
    <AddBillingCategory
      :isShow="isShowCategory"
      @closeModal="isShowCategory = false"
      @addExpense="addCategoryRequest"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../slick-table/SlickTable2";
import TdName from "../setting-categories/TdName";
import TdCode from "../setting-categories/TdCode";
import TdAction from "../setting-categories/TdAction";
import AddBillingCategory from "../dialogs/AddBillingCategory"
export default {
  data() {
    return {
      isShowCategory: false,
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Category name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Category code",
          value: "code",
          name: "code"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ]
    };
  },
  components: {
    SlickTable,
    AddBillingCategory
  },
  methods: {
    ...mapActions("ht_store/workspace/billing/setting/category", [
      "updateSettingCategoryRequest",
      "deleteCategoryRequest",
      "addCategoryRequest"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "code") {
        return TdCode;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/setting/category", ["categories"])
  }
};
</script>
