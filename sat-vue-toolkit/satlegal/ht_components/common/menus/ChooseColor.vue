<template>
  <div class="d-flex align-center no-gutters">
    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-x
      top
      nudge-width="250"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          class="current-color"
          icon
          :style="'background-color: ' + color"
          small
        >
          <v-icon size="15" color="white">mdi-color_lens</v-icon>
        </v-btn>
      </template>
      <div>
        <v-card>
          <v-card-title class="py-2">
            <span class="title">Choose Color</span>
            <v-spacer></v-spacer>
            <v-btn @click="menu = false" class="ma-0" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pb-2">
          <ChromePicker :value="colors" @input="updateFromPicker" />
          <v-row no-gutters class="py-3 justify-space-between">
            <v-btn @click="closeAdd" class="mx-0" small>Close</v-btn>
            <v-btn @click="add" small class="mx-0 primary" >Save</v-btn>
          </v-row>
        </v-card-text>
        </v-card>
      </div>
    </v-menu>
  </div>
</template>

<script>
import { Chrome } from "vue-color";

export default {
  components: {
    ChromePicker: Chrome
  },
  props: {
    color: String,
    title: String,
  },
  data() {
    return {
      menu: false,
      colors: {
        hex: "#000000"
      },
      contains: null,
      colorValue: "",
    };
  },
  mounted() {
    this.setColor(this.color || "#000000");
  },
  methods: {
    add() {
      this.$emit('updateColor', this.colorValue);
      this.menu = false
    },
    closeAdd() {
      this.menu = false
    },
    setColor(color) {
      this.updateColors(color);
      this.colorValue = color;
    },
    updateColors(color) {
      if (color.slice(0, 1) == "#") {
        this.colors = {
          hex: color
        };
      } else if (color.slice(0, 4) == "rgba") {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(","),
          hex =
            "#" +
            (
              (1 << 24) +
              (parseInt(rgba[0]) << 16) +
              (parseInt(rgba[1]) << 8) +
              parseInt(rgba[2])
            )
              .toString(16)
              .slice(1);
        this.colors = {
          hex: hex,
          a: rgba[3]
        };
      }
    },
    updateFromPicker(color) {
      this.colors = color;
      if (color.rgba.a == 1) {
        this.colorValue = color.hex;
      } else {
        this.colorValue =
          "rgba(" +
          color.rgba.r +
          ", " +
          color.rgba.g +
          ", " +
          color.rgba.b +
          ", " +
          color.rgba.a +
          ")";
      }
    },
  },
};
</script>

<style scoped>
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
