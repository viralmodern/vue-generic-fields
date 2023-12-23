<template>
  <td style="text-align:center">
    <v-menu
      @input="closeMenu"
      transition="slide-x-transition"
      :close-on-content-click="false"
      left
      nudge-width="100px"
    >
      <template v-slot:activator="{ on }">
        <div v-on="on" class="des" v-html="subMessager(dataRow.description)"></div>
      </template>
      <v-list>
        <NotebookEditor
          placeholder="Type your note here..."
          :item="dataRow.description"
          @change="change($event)"
        />
      </v-list>
    </v-menu>
  </td>
</template>

<script>
import NotebookEditor from "../editor/NotebookEditor";
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
        this.$emit("updateDataActivities", this.description);
      }
    },
    change(value) {
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: value
      };
      this.$emit("onChange", data);
    },
    subMessager(html) {
      return html.replace(/(<\w*>)|(<\/\w*>)/, "");
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
  max-height: 100px;
  overflow: hidden;
}
</style>
