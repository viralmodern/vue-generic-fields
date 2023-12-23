<template>
<div style="width: 200px">
  <v-row no-gutters class="align-center">
    <span v-if="colorValue" :class="`${sizeText} mr-2`">
      {{ colorValue }}
    </span>
    <span v-else :class="`${sizeText} mr-2`">
      (No color)
    </span>
    <v-btn
      class="current-color"
      icon
      @click="togglePicker()"
      :style="'background-color: ' + colorValue"
    >
      <v-icon size="15" color="white">mdi-color_lens</v-icon>
    </v-btn>
    <ChromePicker
      :value="colors"
      @input="updateFromPicker"
      v-if="displayPicker"
    />
  </v-row>
</div>
</template>

<script>
import { Chrome } from "vue-color";

export default {
  name: "ChooseColorPicker",
  components: {
    ChromePicker: Chrome
  },
  props: {
    color: String,
    sizeText: {
      type: String,
      default: () => "text-caption"
    },
  },
  data() {
    return {
      colors: {
        hex: "#000000"
      },
      colorValue: "",
      displayPicker: false
    };
  },
  mounted() {
    this.setColor(this.color || "#000000");
  },
  methods: {
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
    showPicker() {
      document.addEventListener("click", this.documentClick);
      this.displayPicker = true;
    },
    hidePicker() {
      document.removeEventListener("click", this.documentClick);
      this.displayPicker = false;
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker();
    },
    updateFromInput() {
      this.updateColors(this.colorValue);
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
    documentClick(e) {
      var el = this.$refs.colorpicker,
        target = e.target;
      if (el !== target && !el.contains(target)) {
        this.hidePicker();
      }
    }
  },
  watch: {
    colorValue(val) {
      if (val) {
        this.updateColors(val);
        this.$emit("input", val);
        //document.body.style.background = val;
      }
    }
  }
};
</script>
<style scoped>
/* .input-group-color-picker {
  display: flex;
} */
.current-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #000;
  cursor: pointer;
}

.vue-color__chrome {
  position: absolute;
  left: 0;
  top: calc(100% + 10px);
  z-index: 100;
}
</style>
