<template>
  <div>
    <NotebookEditor placeholder="Type your note here..." :item="content" @change="change"/>
  </div>
</template>

<script>
import NotebookEditor from "../../../editor/NotebookEditor";

export default {
  components: {
    NotebookEditor
  },
  props: {
    content: String
  },
  data() {
    return {
      timeOut: null
    };
  },
  methods: {
    change(text) {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.$emit("update", text);
      }, 1000);
    }
  }
};
</script>
