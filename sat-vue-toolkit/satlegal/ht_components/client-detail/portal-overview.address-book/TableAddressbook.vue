<template>
  <div>
    <SlickTable :items="items" :headers="headers" @onEndDragRows="onEndDragRows">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
        />
      </template>
      <template v-slot:top>
        <AddAddressBook @add="$emit('add', $event)"/>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";

import TaskName from "./cells/TaskName";
import TaskEmail from "./cells/TaskEmail";
import TaskPhone from "./cells/TaskPhone";
import TaskActions from "./cells/TaskActions";
import AddAddressBook from "../../dialogs/AddAddressBook";

export default {
  components: {
    SlickTable,
    AddAddressBook,
    TaskName,
    TaskEmail,
    TaskPhone,
    TaskActions
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
          text: "Actions",
          value: "actions",
          name: "actions"
        }
      ]
    };
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TaskName;
      }
      if (columnName === "email") {
        return TaskEmail;
      }
      if (columnName === "phone") {
        return TaskPhone;
      }
      if (columnName === "actions") {
        return TaskActions;
      }
      return "td";
    },
    onEndDragRows(data) {
      this.moveRows({ id: this.item.id, moveResult: data });
    },
    ...mapMutations("ht_store/matter/hearing", ["moveRows"])
  }
};
</script>
