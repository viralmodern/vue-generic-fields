<template>
  <div>
    <ColorPicker
      class="ma-0 mb-2"
      :color="color"
      :text="text"
      @emitColorValue="change"
    />
    <v-row no-gutters class="justify-space-between">
      <v-btn
        v-if="button === 'Save'"
        class="ma-0 secondary"
        small
        @click="isShowPopup = true"
        >Delete</v-btn
      >
      <v-btn class="ma-0 primary" small @click="submit">{{ button }}</v-btn>
    </v-row>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="$emit('remove')"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this item?"
    />
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker";
import ConfirmItem from "../dialogs/ConfirmItem";

export default {
  components: {
    ColorPicker,
    ConfirmItem
  },
  props: {
    text: String,
    color: String,
    button: String
  },
  data() {
    return {
      label: {},
      isShowPopup: false
    };
  },
  methods: {
    change(label) {
      this.label = label;
    },
    submit() {
      this.$emit("submit", this.label);
    }
  }
};
</script>
