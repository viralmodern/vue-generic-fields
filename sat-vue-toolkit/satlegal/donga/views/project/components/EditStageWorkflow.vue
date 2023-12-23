<template>
  <div class="layout column justify-space-between fill-height">
    <v-app-bar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="subheading">Edit Stage Workflow</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-card class="flex">
      <v-card-text class="pt-0">
        <v-subheader class="pl-0">Title:</v-subheader>
        <v-form @submit.prevent="updateStageInfo">
          <v-text-field
            solo
            label="title"
            append-icon="playlist_add_check"
            v-model="wf.stage_name"
            :value="wf.stage_name"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-text class="pt-0">
        <v-subheader class="pl-0 pt-0">Color:</v-subheader>
        <v-btn
          v-for="color in colors"
          :key="color"
          :color="'#' + color"
          fab
          dark
          small
          @click.stop="changeColor(color)"
          style="width: 20px; height: 20px;"
        >
          <v-icon v-if="color === wf.color" color="#fff">check</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <v-card-actions class="px-3">
      <v-spacer></v-spacer>
      <v-btn color="default" @click="closeDrawer()">Cancel</v-btn>
      <v-btn
        :disabled="!wf.stage_name || !wf.color"
        color="primary"
        :loading="submitting"
        @click.stop="updateStageInfo"
        >Save
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { COLORS } from "./constant";

export default {
  name: "EditStageWorkflow",
  props: {
    stage: Object,

    onSave: {
      type: Function,
      required: true
    },
    closeDrawer: {
      type: Function,
      required: true
    }
  },
  created() {},
  data() {
    return {
      wf: { ...this.stage },
      colors: COLORS,
      submitting: false,
      valid: false
    };
  },
  watch: {
    stage: function(newVal, oldVal) {
      // watch it
      if (!this.$underscore.isEqual(newVal, oldVal)) {
        this.wf = { ...newVal };
      }
    }
  },
  methods: {
    changeColor(color) {
      this.wf["color"] = color;
    },
    updateStageInfo() {
      if (!this.wf.stage_name || this.$underscore.isEqual(this.wf, this.stage))
        return false;
      let workflowId = this.stage["workflow"];
      let data = { color: this.wf.color };
      if (this.wf.stage_name !== this.stage.stage_name) {
        data["stage_name"] = this.wf.stage_name;
      }
      this.$http
        .patch(
          "/api/workflows/" + workflowId + "/stages/" + this.stage.pk + "/",
          data
        )
        .then(rs => {
          this.onSave(rs.data);
        })
        .catch(err => {
          if (err.response) {
            if (err.response.data["stage_name"]) {
              let _mess = err.response.data["stage_name"].toString();
              this.$eventHub.$emit(this.$eventTypes.snackNotify, _mess);
            }
          }
        })
        .finally(() => {});
    }
  }
};
</script>

<style scoped></style>
