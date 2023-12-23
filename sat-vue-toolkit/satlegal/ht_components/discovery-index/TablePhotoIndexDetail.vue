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
          @updateTaskPhoto="update"
        />
      </template>
      <template v-slot:top>
        <AddInlineEnter
          class="pl-3 py-2"
          style="width:200px"
          requireName="Name task is required"
          label="Add an happened"
          hint="Enter to add new happened"
          prepend-inner-icon="mdi-plus"
          @add="addItemSupport"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import SlickTable from "../slick-table/SlickTable2";
import TdHightLightName from "./cells-photo/TdHightLightName";
import TdProgress from "./cells-photo/TdProgress";
import TdPercent from "./cells-photo/TdPercent";
import TdHightLightCharacter from "./cells-photo/TdHightLightCharacter";
import TdStrength from "./cells-photo/TdStrength";
import TdHightLightAction from "./cells-photo/TdHightLightAction";
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
    ...mapActions("ht_store/matter/discovery/index/detailIndex", ["updateTaskPhoto"]),
    update(data) {
      if (this.$route.params.indexId) {
        this.updateTaskPhoto(data);
      } else {
        this.$emit("updateTableSupport", data);
      }
    },
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
      this.$emit("addSubPhotoInTabel", data);
    }
  }
};
</script>
