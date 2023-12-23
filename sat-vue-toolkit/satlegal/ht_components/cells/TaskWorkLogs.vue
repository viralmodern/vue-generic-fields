<template>
  <td>
    <v-menu
      v-model="menu"
      left
      transition="scale-transition"
      offset-x
      :close-on-content-click="false"
      style="width: 130px"
    >
      <template v-slot:activator="{ on }">
        <a v-on="on" href="#" @click="showDialog=true">{{ timeSpent }}</a>
      </template>
      <v-card>
        <v-card-text>
          <Worklog
            v-for="item in dataRow.worklogs"
            :key="item.id"
            :user="item.user"
            :createdDate="item.createdDate"
            :comment="item.comment"
            :timeSpent="item.timeSpent"
          />
        </v-card-text>
      </v-card>
    </v-menu>
  </td>
</template>
<script>
import Worklog from "../cards/Worklog";
export default {
  data() {
    return {
      showDialog: false,
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  components: {
    Worklog
  },
  computed: {
    timeSpent() {
      const total = this.dataRow.worklogs.reduce(
        (total, x) => (total += x.timeSpent),
        0
      );
      const hr = Math.floor(total / 60);
      const mins = total % 60;
      return `${hr}h${mins ? ` ${mins}m` : ``}`;
    }
  }
};
</script>
