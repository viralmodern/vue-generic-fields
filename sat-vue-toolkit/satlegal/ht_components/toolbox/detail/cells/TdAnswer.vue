<template>
  <td>
    <v-menu
      @input="closeMenu"
      transition="slide-x-transition"
      :close-on-content-click="false"
      left
      nudge-width="100px"
    >
      <template v-slot:activator="{ on }">
         <div v-on="on" class="des" v-html="subMessager(dataRow.answer)"></div>
      </template>
      <v-list>
        <NotebookEditor
          placeholder="Type your note here..."
          :item="dataRow.answer"
          @change="description = $event"
        />
      </v-list>
    </v-menu>
  </td>
</template>

<script>
import NotebookEditor from "../../../editor/NotebookEditor";
export default {
  components: {
    NotebookEditor
  },
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      description: ""
    };
  },
  methods: {
    closeMenu(status) {
      if (!status && this.description !== this.dataRow.answer) {
        this.$emit("update", this.description);
      }
    },
    subMessager(html) {
      return html.replace(/(<\w*>)|(<\/\w*>)/, "");
    }
  },
  mounted() {
    this.description = this.dataRow.answer;
  }
};
</script>
<style scoped>
.des {
  max-width: 200px;
  max-height: 100px;
  overflow: hidden;
}
</style>
