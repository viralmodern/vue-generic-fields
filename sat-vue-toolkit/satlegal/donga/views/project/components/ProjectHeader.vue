<template>
  <v-card-text dense color="white" class="py-0">
    <v-toolbar-title class="layout align-center justify-center py-0 pb-2">
      <span
        class="color_picker mr-0 translate-x"
        :style="'background: #' + getColor"
      ></span>
      <StageMenuControl icon="arrow_drop_down">
        <MenuColor @getColorStage="getColorProject" />
      </StageMenuControl>
      <div class="text-h5">{{ getTitle }}</div>
      <div class="px-2 font-weight-light">|</div>
      <MenuSetting />
    </v-toolbar-title>
  </v-card-text>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MenuSetting from "./MenuSetting";
import StageMenuControl from "./StageMenuControl";
import MenuColor from "./MenuColor";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  name: "ProjectHeader",
  components: { MenuColor, StageMenuControl, MenuSetting },
  methods: {
    ...mapActions("ht_store/projectDetail", ["updateProject"]),
    getColorProject(color) {
      this.$eventHub.$emit(this.$eventTypes.DeterminateProgress);
      this.updateProject({ color }).catch(err => {
        if (err.response) {
          try {
            let _mess = err.response.data["color"].toString();
            this.$eventHub.$emit(this.$eventTypes.snackNotify, _mess);
          } catch (e) {
            this.$eventHub.$emit(
              this.$eventTypes.snackNotify,
              "Project update failed"
            );
          }
        }
      });
    }
  },
  computed: {
    ...mapGetters("ht_store/projectDetail", ["projectDetail"]),
    getTitle() {
      try {
        return this.projectDetail.name;
      } catch (e) {
        return "";
      }
    },
    getColor() {
      try {
        return this.projectDetail.color;
      } catch (e) {
        return "000000";
      }
    }
  }
};
</script>

<style>
.translate-x {
  transform: translateX(10px);
}
</style>
