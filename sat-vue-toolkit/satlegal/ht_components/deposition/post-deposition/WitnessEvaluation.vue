<template>
  <NotebookEditor
    class="px-2"
    :item="item"
    placeholder="Type your text..."
    @change="text = $event"
  />
</template>

<script>
import NotebookEditor from "../../editor/NotebookEditor";

export default {
  components: {
    NotebookEditor
  },
  data() {
    return {
      item: "Lorem isum!!!"
    };
  }
};
</script>
