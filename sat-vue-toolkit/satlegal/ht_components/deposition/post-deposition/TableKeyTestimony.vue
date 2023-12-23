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
          field: "key_testimony",
          name: "Key Testimony",
          list: [{ value: true, name: "Key Testimony On" }]
        }
      ]
    };
  },
  created() {
    this.item = this.list[0];
  }
};
</script>
