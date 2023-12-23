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
        <a v-on="on" href="#" @click="showDialog = true"
          >{{ dataRow[column.name] }}h</a
        >
      </template>
      <v-card>
        <v-card-text>
          <Worklog
            v-for="item in dataWorkLog"
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
import { mapActions, mapGetters } from "vuex";
import Worklog from "../../cards/Worklog";

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
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task/worklog", ["dataWorkLog"])
  },
  methods: {
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task/worklog", [
      "getDataWorkLogRequest"
    ])
  },
  watch: {
    menu(isOpen) {
      if (isOpen) {
        this.getDataWorkLogRequest();
      }
    }
  }
};
</script>
