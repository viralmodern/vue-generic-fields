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
        <div class="des" v-on="on" v-html="subMessager(dataRow.description)"></div>
      </template>
      <v-list>
        <NotebookEditor
          placeholder="Type your description here..."
          :item="dataRow.description"
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
      if (!status && this.description !== this.dataRow.description) {
        this.$emit("update", this.description);
      }
    },
    subMessager(html) {
      return (html || "").replace(/(<\w*>)|(<\/\w*>)/, "");
    }
  },
  mounted() {
    this.description = this.dataRow.description;
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
