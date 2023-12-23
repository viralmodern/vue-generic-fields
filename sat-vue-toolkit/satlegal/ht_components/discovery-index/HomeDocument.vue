<template>
  <v-row no-gutters>
    <v-col cols="12">
      <IndexDocument :dataIndexDocument="dataIndexDocument" />
    </v-col>
    <v-col cols="12">
      <v-row no-gutters class="justify-end">
        <v-btn color="primary" @click="toggleExpansion">
          <v-icon class="mr-1">clear_all</v-icon>
          Toggle {{ isShowPanel === false ? "On" : "Off" }} All
        </v-btn>
      </v-row>
      <IndexDocumentPanel :items="dataHightLight" :panel="panel" />
    </v-col>
  </v-row>
</template>
<script>
import IndexDocument from "../tables/IndexDocument";
import IndexDocumentPanel from "../panels/IndexDocumentPanel";
export default {
  components: {
    IndexDocument,
    IndexDocumentPanel
  },
  props: {
    dataIndexDocument: Array,
    dataHightLight: Array
  },
  data() {
    return {
      panel: [],
      isShowPanel: false
    };
  },
  methods: {
    toggleExpansion() {
      this.isShowPanel = !this.isShowPanel;
      this.panel = this.dataHightLight.map(x => {
        if (x) {
          return this.isShowPanel === true ? true : false;
        }
      });
    }
  },
  mounted() {
    this.panel = this.dataHightLight.map(x => x.panel);
  }
};
</script>
