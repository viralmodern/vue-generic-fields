<template>
  <v-row no-gutters class="justify-center">
    <v-dialog v-model="isOpenColor" persistent scrollable max-width="300px">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title class="white--text">Select Color</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <div class="column justify-center">
            <v-chip
              v-for="(item, index) in colors"
              :key="index"
              style="width: 100%"
              :color="'#' + item"
              text-color="white"
              :selected="selected === index"
              @click.stop="selected = index"
            >
              <v-avatar v-if="selected === index">
                <v-icon>mdi-check_circle</v-icon>
              </v-avatar>
            </v-chip>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" @click="closeModal">Cancel</v-btn>
          <v-btn color="primary darken-1" @click="saveColor">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { COLORS } from "./constant";

export default {
  name: "WorkFlowColors",
  props: {
    onSave: {
      type: Function,
      required: true
    },
    isOpenColor: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      colors: COLORS,
      selected: 0
    };
  },
  methods: {
    saveColor() {
      this.onSave(this.colors[this.selected]);
      this.$emit("toggleModalColors");
    },
    closeModal() {
      this.$emit("toggleModalColors");
    }
  }
};
</script>

<style scoped></style>
