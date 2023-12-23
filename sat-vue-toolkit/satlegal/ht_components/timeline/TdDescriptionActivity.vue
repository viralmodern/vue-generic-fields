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
        <div class="des" v-html="subMessager(dataRow.desc)" v-on="on"></div>
      </template>
      <v-list>
        <NotebookEditor
          placeholder="Type your note here..."
          :item="dataRow.desc"
          @change="desc = $event"
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
      desc: ""
    };
  },
  methods: {
    closeMenu(status) {
      if (!status && this.desc !== this.dataRow.desc) {
        this.$emit("updateDataActivities", this.desc);
      }
    },
    subMessager(html) {
      return html.replace(/(<\w*>)|(<\/\w*>)/, "");
    }
  },
  mounted() {
    this.desc = this.dataRow.desc;
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
