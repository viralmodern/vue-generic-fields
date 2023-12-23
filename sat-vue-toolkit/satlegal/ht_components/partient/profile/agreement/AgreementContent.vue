<template>
  <div>
    <NotebookEditor
      placeholder="Type your note here..."
      :item="content"
      @change="text = $event"
    />
    <v-row no-gutters class="justify-end">
      <v-btn class="ma-0 mt-2" color="primary" @click="$emit('change', text)"
        >Save</v-btn
      >
    </v-row>
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
      text: ""
    };
  }
};
</script>
