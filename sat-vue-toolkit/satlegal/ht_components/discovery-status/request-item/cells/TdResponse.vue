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
        <div class="des" v-html="subMessager(dataRow.response)" v-on="on"></div>
      </template>
      <v-list>
        <NotebookEditor
          placeholder="Type your note here..."
          :item="dataRow.response"
          @change="response = $event"
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
      response: ""
    };
  },
  methods: {
    closeMenu(status) {
      if (!status && this.response !== this.dataRow.response) {
        this.$emit("update", this.response);
      }
    },
    subMessager(html) {
      return (html || "").replace(/(<\w*>)|(<\/\w*>)/, "");
    }
  },
  mounted() {
    this.response = this.dataRow.response;
  }
};
</script>
<style scoped>
.des {
  max-width: 200px;
  min-width: 100px;
  max-height: 100px;
  min-height: 25px;
  overflow: hidden;
}
</style>
