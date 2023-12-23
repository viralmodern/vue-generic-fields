<template>
  <div class="row">
    <div class="col-sm-12">
      <v-row no-gutters class="align-center">
        <v-col cols="12" sm="10" v-if="!isShowDialogColor">
          <v-text-field
            autofocus
            v-model="labelName"
            label="Label name"
            required
          ></v-text-field>
        </v-col>
        <!-- <label v-else>Select meeting color</label> -->
        <v-col cols="12" sm="2" class="pl-1">
          <v-btn
            icon
            @click="togglePicker"
            :style="'background-color: ' + colorValue"
          >
            <v-icon size="25" color="white">mdi-color_lens</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-dialog v-if="isShowDialogColor" v-model="displayPicker" width="225px">
        <ChromePicker
          right
          :value="colors"
          @input="updateFromPicker"
          v-if="displayPicker"
        />
      </v-dialog>
      <div v-else>
        <ChromePicker
          right
          :value="colors"
          @input="updateFromPicker"
          v-if="displayPicker"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Chrome } from "vue-color";
export default {
  components: {
    ChromePicker: Chrome
  },
  props: {
    text: String,
    color: String,
    isShowDialogColor: Boolean
  },
  data() {
    return {
      isModalCreate: false,
      contains: null,
      colors: {
        hex: "#9A9494"
      },
      labelName: "",
      colorValue: "",
      displayPicker: false
    };
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
      const dataColorPicker = {
        colorValue: this.colorValue,
        labelName: this.labelName
      };
      this.updateColors(this.colorValue);
      this.$emit("emitColorValue", dataColorPicker);
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
      if (el !== target) {
        this.hidePicker();
      }
    }
  },
  mounted() {
    this.setColor(this.color || "#9A9494");
    this.labelName = this.text || "";
  },
  watch: {
    colorValue(val) {
      if (val) {
        const dataColorPicker = {
          colorValue: val,
          labelName: this.labelName
        };
        this.updateColors(val);
        this.$emit("emitColorValue", dataColorPicker);
      }
    },
    labelName(val) {
      if (val) {
        this.labelName = val;
        const dataColorPicker = {
          colorValue: this.colorValue,
          labelName: val
        };
        this.$emit("emitColorValue", dataColorPicker);
      }
    }
  }
};
</script>
