<template>
  <v-row no-gutters>
    <v-list>
      <UserActivity
        v-for="(item, index) in activities"
        :key="index"
        :action="item.action"
        :executor="item.executor"
        :executedDate="item.executedDate"
        :destinationObject="item.destinationObject"
      />
    </v-list>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import UserActivity from "../cards/UserActivity";
export default {
  components: {
    UserActivity
  },
  computed: {
    ...mapGetters("ht_store/workspace/client/detail/overview", ["activities"])
  },
  methods: {
    ...mapActions("ht_store/workspace/client/detail/overview", ["getDataActivities"])
  },
  mounted() {
    this.getDataActivities(this.$route.params.id);
  }
};
</script>
