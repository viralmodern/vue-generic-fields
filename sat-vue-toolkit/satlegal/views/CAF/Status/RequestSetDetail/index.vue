<template>
  <div class="py-2">
    <v-row no-gutters justify="end" class="mr-3">
      <v-tooltip bottom v-for="item in items" :key="item.id">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            :color="$route.name === item.to.name ? 'primary' : ''"
            v-on="on"
            :to="item.to"
          >
            <v-icon>{{item.icon}}</v-icon>
          </v-btn>
        </template>
        <span>{{item.text}}</span>
      </v-tooltip>
    </v-row>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          text: "Request items",
          to: {
            name: "RequestSetItems"
          },
          icon: "table_chart"
        },
        {
          id: 2,
          text: "Request Set Definition",
          to: {
            name: "RequestSetDefinition"
          },
          icon: "offline_bolt"
        },
        {
          id: 3,
          text: "Request Set Task",
          to: {
            name: "RequestSetTaskDetail"
          },
          icon: " mdi-book-open"
        },
        {
          id: 4,
          text: "Request Set Expense",
          to: {
            name: "RequestSetExpenseDetail"
          },
          icon: "mdi-currency-eur"
        },
        {
          id: 5,
          text: "Request Set Item Element",
          to: {
            name: "RequestSetItemElement"
          },
          icon: "mdi-relative-scale"
        },
        {
          id: 6,
          text: "Request Set Document",
          to: {
            name: "RequestSetDocument"
          },
          icon: "mdi-file-document"
        },
      ]
    };
  }
};
</script>
