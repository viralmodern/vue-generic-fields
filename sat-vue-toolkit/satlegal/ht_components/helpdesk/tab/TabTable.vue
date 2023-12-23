<template>
  <v-tabs>
    <v-tab
      v-for="tab in tabs"
      :key="tab.id"
      @change="$emit('getTickets', {type: tab.type, value: tab.value})"
    >{{tab.name}}</v-tab>
    <v-tab-item v-for="item in tabs" :key="item.id">
      <TableCommon
        :keyName="item.type"
        :keyGroup="keyGroup(item.name)"
        :name="item.name"
        :itemsTickets="(itemsTickets[item.type] || {}).results"
        :totals="(itemsTickets[item.type] || {}).totals"
        :isLoading="isLoading"
        @updateTickets="evt => $emit('updateTickets', evt)"
        @removeTickets="evt => $emit('removeTickets', evt)"
      />
    </v-tab-item>
  </v-tabs>
</template>
<script>
import TableCommon from "./TableCommon";

export default {
  components: {
    TableCommon
  },
  props: {
    itemsTickets: Object,
    isLoading: Boolean
  },
  data() {
    return {
      tabs: [
        { id: 1, name: "All Tickets", type: "all_tickets", value: "" },
        { id: 2, name: "My Tickets", type: "assigneeByMe", value: true },
        { id: 3, name: "Open", type: "status", value: 1 },
        { id: 4, name: "In Progress", type: "status", value: 2 },
        { id: 5, name: "Closed", type: "status", value: 3 },
        { id: 6, name: "Trash", type: "status", value: 3 }
      ]
    };
  },
  methods: {
    keyGroup(val) {
      if (val === "Open" || val === "In Progress" || val === "In Closed") {
        return 2;
      }
    }
  }
};
</script>
