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
        <div
          v-on="on"
          class="des"
          v-html="subMessager(dataRow.objection)"
        ></div>
      </template>
      <v-list>
        <NotebookEditor
          placeholder="Type your note here..."
          :item="dataRow.objection"
          @change="objection = $event"
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
      objection: ""
    };
  },
  methods: {
    closeMenu(status) {
      if (!status && this.objection !== this.dataRow.objection) {
        this.$emit("update", this.objection);
      }
    },
    subMessager(html) {
      return (html || "").replace(/(<\w*>)|(<\/\w*>)/, "");
    }
  },
  mounted() {
    this.objection = this.dataRow.objection;
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
