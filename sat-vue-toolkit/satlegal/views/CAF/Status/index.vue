<template>
  <div>
    <v-toolbar class="custom" height="50">
      <!-- <v-toolbar-title class="text-body-1">Request name: {{ dataDepositionDetail.name }}</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <template v-for="item in listMenu">
          <v-btn
            v-if="item.typePath === 'single'"
            :key="item.id"
            text
            :to="item.to"
            small
            class="text-capitalize"
          >{{ item.name }}</v-btn>
          <v-menu v-if="item.typePath === 'multiple'" :key="item.id" open-on-hover bottom offset-y>
            <template v-slot:activator="{ on }">
              <v-btn small text class="text-capitalize" v-on="on">{{ item.name }}</v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(childMenu, index) in item.listPath.filter(x => x.type === deponentType)"
                :key="index"
                :to="childMenu.to"
                exact
              >
                <v-list-item-title style="font-size:13px">{{ childMenu.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listMenu: [
        {
          id: 1,
          name: "Request Set",
          typePath: "single",
          to: {
            name: "RequestSet"
          }
        },
        {
          id: 2,
          name: "Request Set Task",
          typePath: "single",
          to: {
            name: "RequestSetTask"
          }
        },
        {
          id: 3,
          name: "Request Set Expense",
          typePath: "single",
          to: {
            name: "HomeRequestSetExpense"
          }
        },
        {
          id: 5,
          name: "Request Set Time Tracking",
          typePath: "single",
          to: {
            name: "RequestSetTimeTracking"
          }
        },
        {
          id: 6,
          name: "Request Set Document",
          typePath: "single",
          to: {
            name: "RequestSetDocument"
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
.custom {
  -webkit-box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>
