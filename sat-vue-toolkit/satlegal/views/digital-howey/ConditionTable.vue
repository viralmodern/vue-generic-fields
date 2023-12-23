<template>
  <div class="px-2">
    <SlickTable :items="dataCondition.items" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @onChange="updateConditionRequest"
          @remove="removeConditionRequest"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../ht_components/slick-table/SlickTable2";
import TdName from "../../ht_components/condition/TdName";
import TdDate from "../../ht_components/condition/TdDate";
import TdCharacter from "../../ht_components/condition/TdCharacter";
import TdDescription from "../../ht_components/condition/TdDescription";
import TdLinked from "../../ht_components/condition/TdLinked";
import TdAction from "../../ht_components/condition/TdAction";

export default {
  components: {
    SlickTable
  },
  data() {
    return {
      headers: [
        {
          sortable: false,
          text: "Activity name",
          value: "name",
          name: "name"
        },
        {
          sortable: false,
          text: "By Character",
          value: "character",
          name: "character"
        },
        {
          sortable: false,
          text: "Date",
          value: "date",
          name: "date"
        },
        {
          sortable: false,
          text: "Description",
          value: "description",
          name: "description"
        },
        {
          sortable: false,
          text: "Linked record",
          value: "linked",
          name: "linked"
        },
        {
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHowey/condition", ["dataCondition"])
  },
  methods: {
    ...mapActions("ht_store/matter/digitalHowey/condition", [
      "updateConditionRequest",
      "removeConditionRequest"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "character") {
        return TdCharacter;
      }
      if (columnName === "date") {
        return TdDate;
      }
      if (columnName === "description") {
        return TdDescription;
      }
      if (columnName === "action") {
        return TdAction;
      }
      if (columnName === "linked") {
        return TdLinked;
      }
      return "td";
    }
  }
};
</script>
