<template>
  <div>
    <Worklog
      v-for="item in item.worklog"
      :key="item.id"
      :user="item.user"
      :createdDate="item.createdDate"
      :comment="item.comment"
      :timeSpent="item.timeSpent"
    />
  </div>
</template>

<script>
import Worklog from "../../cards/Worklog";
export default {
  components: {
    Worklog
  },
  props: {
      item: Object
  }
};
</script>