<template>
  <div style="width: 100px">
    <v-row no-gutters class="align-center">
      <span v-if="color" :class="`${sizeText} mr-2`">
        {{ color }}
      </span>
      <span v-else :class="`${sizeText} mr-2`">
        (No color)
      </span>
      <ChooseColor
        :color="color"
        @updateColor="updateColor"
      />
    </v-row>
  </div>
</template>

<script>
import ChooseColor from "./ChooseColor";
export default {
  name: "ChooseColorPicker2",
  components: {
    ChooseColor
  },
  props: {
    color: String,
    sizeText: {
      type: String,
      default: () => "text-caption"
    }
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    updateColor(val) {
      this.$emit("update", val.substring(1))
    }
  },
};
</script>
<style lang="scss" scoped>
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
.fa-user-plus1,
.fa-map-marker,
.fa-cell-icon {
  color: #7a797e;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  transition: all 0.25s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: dashed 1px #c1c2c3;
  color: #dcdcdc;

  &:hover,
  &.active {
    background: rgba(17, 205, 239, 0.5);
    color: #fff;

    * {
      color: #fff !important;
    }
  }
}
.v-small-dialog__content {
  padding: 0px;
}
</style>
