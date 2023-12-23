<template>
  <v-list class="list">
    <div class="pa-3 font-weight-bold text-body-2">HelpDesk</div>
    <v-list>
      <div v-for="(item, index) in helpDesk" :key="index">
        <v-list-item>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>

    <div class="ml-3 font-weight-bold text-body-2">Ticket Status</div>
    <div class="ma-3" v-for="(item, index) in statusTickets" :key="index">
      <v-row no-gutters class="justify-space-between">
        <span>{{ item.name }}</span>
        <span>{{ item.value }}%</span>
      </v-row>
      <v-progress-linear
        :color="item.color"
        :value="item.value"
      ></v-progress-linear>
    </div>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      helpDesk: [
        { id: 1, name: "All Tickets", icon: "line_weight" },
        { id: 2, name: "My Tickets", icon: "contacts" },
        { id: 3, name: "Open", icon: "open_in_new" },
        { id: 4, name: "In Progress", icon: "turned_in_not" },
        { id: 5, name: "Close", icon: "cancel" }
      ]
    };
  },
  computed: {
    statusTickets() {
      return [
        { name: "Partnership", value: 57, color: "primary" },
        {
          name: "Securities Litigation and Enforcement",
          value: 31,
          color: "success"
        },
        { name: "General Civil", value: 76, color: "error" }
      ];
    }
  }
};
</script>
<style scoped>
.list-all {
  align-items: center;
  display: flex;
  cursor: pointer;
  padding: 5px;
}
.list {
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: #c1c1c1;
}
</style>
