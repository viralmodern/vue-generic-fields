<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.mdAndUp"
    fixed
    app
    right
    temporary
  >
    <div class="layout column justify-space-between fill-height">
      <v-app-bar>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title class="subheading"
          >Edit Stage Workflow</v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-card class="flex">
        <v-card-text class="pt-0">
          <v-subheader class="pl-0">Title:</v-subheader>
          <v-form @submit.prevent="onSave(wf)">
            <v-text-field
              solo
              label="title"
              append-icon="playlist_add_check"
              v-model="wf.title"
              :value="wf.title"
              hide-details
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-text class="pt-0">
          <v-subheader class="pl-0 pt-0">Color:</v-subheader>
          <v-btn
            v-for="(color, idx) in colors"
            :key="color.code"
            :color="color.code"
            fab
            dark
            small
            @click.stop="changeColor(idx)"
          >
            <v-icon v-if="color.code === wf.color" color="#fff">check</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card-actions class="px-3">
        <v-spacer></v-spacer>
        <v-btn color="default" @click="drawer = false">Cancel</v-btn>
        <v-btn
          :disabled="!wf.title || !wf.color"
          color="primary"
          @click.stop="onSave(wf)"
          >Save
        </v-btn>
      </v-card-actions>
    </div>
  </v-navigation-drawer>
</template>

<script>
import _ from "lodash";

export default {
  name: "EditSageWorkflow",
  props: {
    item: Object,
    onSave: {
      type: Function,
      required: true
    }
  },
  created() {},
  data() {
    return {
      drawer: false,
      wf: { title: "", color: "" },
      colors: [
        {
          title: "primary",
          code: "#6d42c7"
        },
        {
          title: "secondary",
          code: "#e57373"
        },
        {
          title: "success",
          code: "#24b314"
        },
        {
          title: "grey",
          code: "#757575"
        },
        {
          title: "grey",
          code: "#626fe6"
        }
      ]
    };
  },
  watch: {
    item: function(newVal, oldVal) {
      // watch it
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      if (!_.isEqual(newVal, oldVal)) {
        this.wf = { ...newVal };
      }
    }
  },
  methods: {
    toggleDialog() {
      this.drawer = !this.drawer;
    },
    changeColor(idx) {
      let color = this.colors[idx];
      this.wf["color"] = color["code"];
      // console.log(this.wf);
    }
  }
};
</script>

<style scoped></style>
