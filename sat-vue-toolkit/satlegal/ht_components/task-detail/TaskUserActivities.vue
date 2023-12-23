<template>
  <v-card>
    <v-row no-gutters>
      <v-col v-for="item in items" :key="item.id" class="mt-1">
        <UserActivity
          :executor="item.executor"
          :executedDate="item.executedDate"
          :destinationObject="item.destinationObject"
          :task="item.task"
          :action="item.action"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import UserActivity from "../cards/UserActivity";
export default {
  props: {
    items: Array
  },
  components: {
    UserActivity
  }
};
</script>
