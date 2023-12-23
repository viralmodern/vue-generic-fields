<template>
  <v-row no-gutters class="align-center">
    <LabelColor
      width="220px"
      :color="color"
      :text="text"
      :check="check"
      @choseLabel="$emit('choseLabel')"
    />
  </v-row>
</template>

<script>
import LabelColor from "../chips/LabelColor2";

export default {
  components: {
    LabelColor
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  props: {
    color: String,
    text: String,
    check: Boolean
  },
  methods: {
    remove() {
      this.$emit("removeLabel");
      this.isShowPopup = false;
    }
  }
};
</script>