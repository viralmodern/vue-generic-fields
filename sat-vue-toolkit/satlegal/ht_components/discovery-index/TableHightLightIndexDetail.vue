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
          :expanId="expanId"
        />
      </template>
      <template v-slot:top>
        <AddInlineEnter
          class="pl-3 py-2"
          style="width:200px"
          requireName="Name task is required"
          label="Add an interpretation"
          hint="Enter to add new interpretation"
          prepend-inner-icon="mdi-plus"
          @add="addItemSupport"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import SlickTable from "../slick-table/SlickTable2";
import TdHightLightName from "./cells-document/TdHightLightName";
import TdProgress from "./cells-document/TdProgress";
import TdPercent from "./cells-document/TdPercent";
import TdHightLightCharacter from "./cells-document/TdHightLightCharacter";
import TdStrength from "./cells-document/TdStrength";
import TdHightLightAction from "./cells-document/TdHightLightAction";
import AddInlineEnter from "../inputs/AddInlineEnter";

export default {
  components: {
    SlickTable,
    TdHightLightName,
    TdProgress,
    TdPercent,
    TdHightLightCharacter,
    TdStrength,
    TdHightLightAction,
    AddInlineEnter
  },
  props: {
    idGroup: Number,
    items: Array,
    expanId: Number
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
          text: "Progress",
          value: "progress",
          name: "progress"
        },
        {
          visible: true,
          sortable: false,
          text: "Percent",
          value: "percent",
          name: "percent"
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
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdHightLightName;
      }
      if (columnName === "progress") {
        return TdProgress;
      }
      if (columnName === "percent") {
        return TdPercent;
      }
      if (columnName === "character") {
        return TdHightLightCharacter;
      }
      if (columnName === "strength") {
        return TdStrength;
      }
      if (columnName === "action") {
        return TdHightLightAction;
      }
      return "td";
    },
    addItemSupport(text) {
      const data = {
        idGroup: this.idGroup,
        expanId: this.expanId,
        data: {
          id: Math.floor(Math.random() * 1000 + 1),
          name: text,
          progress: 0,
          percent: 0,
          characters: [],
          strength: 3
        }
      };
      this.$emit("addSubItemInTabel", data);
    }
  }
};
</script>
