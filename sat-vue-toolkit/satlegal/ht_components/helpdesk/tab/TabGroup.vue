<template>
  <v-row>
    <v-tabs right v-if="$route.params.type !== 'table'">
      <v-tab v-for="tab in tabs" :key="tab.id" @change="keyGroup = tab.id">{{tab.name}}</v-tab>
        <v-tab-item v-for="item in tabs" :key="item.id">
          <slot name="group" :dataGroup="dataGroup(item.type)" :keyGroup="keyGroup" />
        </v-tab-item>
    </v-tabs>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import { itemStatus, evidencesLevel } from "../../../config";
export default {
  props: {
    itemsTickets: Object
  },
  data() {
    return {
      tabs: [
        { id: 1, name: "By Matter", type: "matter" },
        { id: 2, name: "By Status", type: "status" },
        { id: 3, name: "By Category", type: "category" },
        { id: 4, name: "By Priority", type: "priority" },
        { id: 5, name: "By Urgency", type: "urgency" }
      ],
      itemStatus,
      evidencesLevel,
      keyGroup: 1
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/helpDesk/category", ["category"])
  },
  methods: {
    dataGroup(type) {
      var data = (this.itemsTickets.all_tickets || {}).results;
      var keyObject = this.handleType(type);
      var group = {};
      (keyObject || []).forEach(x => {
        const tasks = (data || []).filter(f => f[type] === x.id);
        const findTask = keyObject.find(rootItems => rootItems.id === x.id);
        group[x.name] = {
          id: findTask.id,
          tasks,
          totals: tasks.length,
          name: findTask.name
        };
      });
      return Object.keys(group).map(key => group[key]);
    },
    handleType(type) {
      if (type === "status") {
        return this.itemStatus;
      } else if (type === "category") {
        return this.category;
      } else if (type === "priority") {
        return this.evidencesLevel;
      } else if (type === "urgency") {
        return this.evidencesLevel;
      }
    }
  }
};
</script>
