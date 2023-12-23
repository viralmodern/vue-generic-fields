<template>
  <div>
    <SlickTable :items="dataPortalAddressbook" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
        />
      </template>
      <template v-slot:top>
        <AddAddressBook @add="createNewContact"/>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../ht_components/slick-table/SlickTable2";
import TaskName from "../../ht_components/portal-addressbook/cells/TaskName";
import TaskEmail from "../../ht_components/portal-addressbook/cells/TaskEmail";
import TaskPhone from "../../ht_components/portal-addressbook/cells/TaskPhone";
import TaskActions from "../../ht_components/portal-addressbook/cells/TaskActions";
import AddAddressBook from "../../ht_components/dialogs/AddAddressBook";

export default {
  components: {
    SlickTable,
    AddAddressBook,
    TaskName,
    TaskEmail,
    TaskPhone,
    TaskActions
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
  computed: {
    ...mapGetters("ht_store/clientPortal/addressbook", ["dataPortalAddressbook"])
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
    ...mapActions("ht_store/clientPortal/addressbook", [
      "getDataPortalAddressbook",
      "createNewContact"
    ])
  },
  mounted() {
    this.getDataPortalAddressbook();
  }
};
</script>
