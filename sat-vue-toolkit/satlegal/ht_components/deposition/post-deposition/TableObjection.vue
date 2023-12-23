<template>
  <div>
    <PostDepositionTable :item="item" :index="index" :panel="panel" />
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
          field: "objection",
          name: "Objection",
          list: [{ value: true, name: "Objection On" }]
        }
      ]
    };
  },
  created() {
    this.item = this.list[0];
  }
};
</script>
