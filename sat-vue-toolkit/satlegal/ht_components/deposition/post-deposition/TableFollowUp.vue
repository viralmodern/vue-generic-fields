<template>
  <div>
    <PostDepositionTable :item="item" :index="index" :panel="panel"/>
  </div>
</template>

<script>
import PostDepositionTable from "./PostDepositionTable";

export default {
  components: {
    PostDepositionTable
  },
  props: {
    index: [Number, String],
    panel: [Number, String]
  },
  data() {
    return {
      list: [
        {
          id: 1,
          field: "follow_up",
          name: "Follow Up",
          list: [{ value: true, name: "Follow Up On" }]
        }
      ],
    }
  },
  created() {
    this.item = this.list[0];
  },
};
</script>
