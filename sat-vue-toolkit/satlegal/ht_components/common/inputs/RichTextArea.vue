<template>
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
        v-html="subMessager(value)"
      ></div>
    </template>
    <v-list>
      <Editor
        placeholder="Type your note here..."
        :item="value"
        @change="text = $event"
      />
    </v-list>
  </v-menu>
</template>

<script>
import Editor from "../editor/Editor";
export default {
  components: {
    Editor
  },
  props: {
    value: String,
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    closeMenu(status) {
      if (!status && this.text !== this.value) {
        this.$emit("update", this.text);
      }
    },
    subMessager(html) {
      return (html || "").replace(/(<\w*>)|(<\/\w*>)/, "");
    }
  },
  mounted() {
    this.text = this.value;
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
  cursor: pointer;
}
</style>
