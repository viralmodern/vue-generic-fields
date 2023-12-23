<template>
  <div>
    <SlickTable
      :items="items"
      :headers="headers.filter(x=> x.visible)"
      :disbledDragColumns="true"
      :idGroup="idGroup"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :idGroup="idGroup"
          :column="props.column"
          :dataRow="props.dataRow"
        />
      </template>
      <template v-slot:top>
        <AddInlineEnter
          class="pl-3 py-2"
          style="width:200px"
          requireName="Name task is required"
          label="Add new microscopic support"
          hint="Enter to add new microscopic support"
          prepend-inner-icon="mdi-plus"
          @add="addItemSupport"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import SlickTable from "@/sat-vue-toolkit/satlegal/ht_components/slick-table/SlickTable2";
import TdSupportName from "../cells/TdSupportName";
import TdSupportCharacter from "../cells/TdSupportCharacter";
import TdStrength from "../cells/TdStrength";
import TdAction from "../cells/TdAction";
import AddInlineEnter from "@/sat-vue-toolkit/satlegal/ht_components/inputs/AddInlineEnter";

export default {
  components: {
    SlickTable,
    TdSupportName,
    TdSupportCharacter,
    TdStrength,
    TdAction,
    AddInlineEnter
  },
  props: {
    idGroup: [String, Number],
    items: Array
  },
  data() {
    return {
      headers: [
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
          text: "Character",
          value: "character",
          name: "character"
        },
        {
          visible: true,
          sortable: false,
          text: "Strength",
          value: "strength",
          name: "strength"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ],
      isShow: false
    };
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["postSubFactsSupport"]),
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdSupportName;
      }
      if (columnName === "character") {
        return TdSupportCharacter;
      }
      if (columnName === "strength") {
        return TdStrength;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addItemSupport(name) {
      const { projectId, factId } = this.$route.params;
      const data = {
        matterId: projectId,
        factId,
        supportId: this.idGroup,
        body: {
          name,
          strength: 1
        }
      };
      this.postSubFactsSupport(data);
    }
  }
};
</script>
