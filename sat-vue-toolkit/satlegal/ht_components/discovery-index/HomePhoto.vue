<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row no-gutters class="justify-end">
        <v-btn color="primary" @click="toggleExpansion">
          <v-icon class="mr-1">clear_all</v-icon>
          Toggle {{ isShowPanel === false ? "On" : "Off" }} All
        </v-btn>
      </v-row>
      <IndexPhotoPanel :items="dataHappened" :panel="panel" />
    </v-col>
  </v-row>
</template>
<script>
import IndexPhotoPanel from "../panels/IndexPhotoPanel";
export default {
  components: {
    IndexPhotoPanel
  },
  props: {
    dataHappened: Array
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
      this.panel = this.dataHappened.map(x => {
        if (x) {
          return this.isShowPanel === true ? true : false;
        }
      });
    }
  },
  mounted() {
    this.panel = this.dataHappened.map(x => x.panel);
  }
};
</script>
