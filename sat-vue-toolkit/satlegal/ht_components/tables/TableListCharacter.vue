<template>
  <SlickTable class="mt-2" :items="items" :headers="headers">
    <template slot="cell" slot-scope="props">
      <component
        :is="getDisplayComponent(props.column.name)"
        :column="props.column"
        :dataRow="props.dataRow"
        @onChange="$emit('update', {id:props.dataRow.id,[props.column.name]:$event})"
      />
    </template>
    <template v-slot:top></template>
  </SlickTable>
</template>

<script>
import SlickTable from "../slick-table/SlickTable2";
import TdName from "../research/characters/cells/TdName";
import TdEmail from "../research/characters/cells/TdEmail";
import TdPhone from "../research/characters/cells/TdPhone";
import TdType from "../research/characters/cells/TdType";
import TdAction from "../research/characters/cells/TdAction";
import TdView from "../research/characters/cells/TdView";

export default {
  components: {
    SlickTable,
    TdName,
    TdEmail,
    TdPhone,
    TdType,
    TdAction
  },
  props: {
    items: Array
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "View",
          value: "view",
          name: "view"
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
          text: "Email",
          value: "email",
          name: "email"
        },
        {
          visible: true,
          sortable: false,
          text: "Phone",
          value: "phone",
          name: "phone"
        },
        {
          visible: true,
          sortable: false,
          text: "Type",
          value: "type",
          name: "type"
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
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "view") {
        return TdView;
      }
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "email") {
        return TdEmail;
      }
      if (columnName === "phone") {
        return TdPhone;
      }
      if (columnName === "type") {
        return TdType;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    }
  }
};
</script>
