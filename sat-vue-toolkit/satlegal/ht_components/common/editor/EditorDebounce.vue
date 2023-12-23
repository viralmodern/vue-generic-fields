<template>
  <NotebookEditor :placeholder="placeholder" :item="item" @change="change" />
</template>

<script>
import NotebookEditor from "./NotebookEditor";

export default {
  props: {
    debonce: Number,
    placeholder: String,
    item: String
  },
  data() {
    return {
      timeOut: null
    };
  },
  components: {
    NotebookEditor
  },
  methods: {
    change(value) {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.$emit("change", value);
      }, this.debonce);
    }
  }
};
</script>
