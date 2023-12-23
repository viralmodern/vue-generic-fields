<template>
  <div>
    <SlickTable :items="rates" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @onChange="updateSettingRateRequest($event)"
          @deleteRate="deleteRateRequest"
        />
      </template>
      <template v-slot:top>
        <v-btn color="primary" outlined @click="isShowRate = true">
          <v-icon class="mr-2">mdi-add_circle</v-icon>
          <span class="hidden-sm-and-down">Add new rate</span>
        </v-btn>
      </template>
    </SlickTable>
    <AddBillingRate
      :isShow="isShowRate"
      @closeModal="isShowRate = false"
      @addExpense="addRateRequest"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../slick-table/SlickTable2";
import TdName from "../setting-rate/TdName";
import TdRate from "../setting-rate/TdRate";
import TdAction from "../setting-rate/TdAction";
import AddBillingRate from "../dialogs/AddBillingRate"
export default {
  data() {
    return {
      isShowRate: false,
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Tax name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Rate",
          value: "rate",
          name: "rate"
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
    AddBillingRate
  },
  methods: {
    ...mapActions("ht_store/workspace/billing/setting/rate", [
      "updateSettingRateRequest",
      "deleteRateRequest",
      "addRateRequest"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "rate") {
        return TdRate;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/setting/rate", ["rates"])
  }
};
</script>
