<template>
  <v-hover v-slot:default="{ hover }">
    <div class="d-flex align-center">
      <div v-if="!editable" @click="clickText" class="cusor--pointer">
        {{ text }}
      </div>
      <v-text-field
        v-if="editable"
        :flat="editable"
        single-line
        :readonly="!editable"
        dense
        class="ma-0 text_input_list cusor--pointer"
        :placeholder="t_placeholder"
        :disabled="disabled"
        aria-autocomplete="none"
        :autofocus="editable"
        style="border-radius: 0px; overflow: hidden"
        hide-details
        :solo="editable"
        @blur="blurInput"
        @keyup.enter="handleInput($event)"
        v-model="text"
      >
      </v-text-field>
      <div
        class="transition-linear-out-slow-in px-2"
        :style="{ opacity: hover && !editable ? '1' : '0' }"
      >
        <v-btn
          title="Rename"
          icon
          small
          :class="{ btn_active: !!hover }"
          @click="editable = true"
        >
          <v-icon x-small style="transform: translateY(1px)"
            >mdi-border-color
          </v-icon>
        </v-btn>
        <v-btn title="Open matter" icon small :to="link" v-if="link">
          <v-icon small>mdi-link</v-icon>
        </v-btn>
      </div>
    </div>
  </v-hover>
</template>

<script>
export default {
  name: "TextInput",
  data() {
    return {
      text: this.value || "",
      editable: false
    };
  },
  props: ["value", "disabled", "autofocus", "placeholder", "link"],
  computed: {
    t_placeholder() {
      return this.placeholder || "Matter name";
    }
  },
  methods: {
    handleInput(event) {
      // eslint-disable-next-line
      console.log(
        "handleInput",
        event.target.value,
        this.value,
        event.target.value.localeCompare(this.value)
      );
      if (event.target.value.localeCompare(this.value) === 0) {
        return (this.editable = false);
      }
      this.$emit("change", event.target.value);
      this.text = event.target.value || this.value;
      this.editable = false;
    },
    blurInput() {
      if (this.text === "") {
        this.text = this.value;
      }
      this.editable = false;
    },

    clickText() {
      if (this.editable) return;
      this.$emit("click-text");
    }
  },
  watch: {
    value(val) {
      this.text = val;
    }
  }
};
</script>

<style scoped>
.text_input_list /deep/ > .v-input__control > .v-input__slot {
  cursor: pointer !important;
  font-size: 12px;
}

.btn_active {
  /*border: solid 1px red !important;*/
  opacity: 1;
}

.text_input_list
  /deep/
  > .v-input__control
  > .v-input__slot
  .v-text-field__slot
  input {
  padding: 0px;
}

.text_input_list /deep/ > .v-input__control > .v-input__slot:before {
  border-color: transparent !important;
  background-image: unset !important;
}

.text_input_list /deep/ .v-input input:focus,
.v-input input:active {
  border-color: transparent !important;
  background-image: unset !important;
}

.text_input_list.v-text-field.v-input--is-readonly
  /deep/
  > .v-input__control
  > .v-input__slot:after,
.text_input_list.v-text-field.v-input--is-readonly
  /deep/
  > .v-input__control
  > .v-input__slot:before,
.text_input_list.v-text-field.v-input--is-disabled
  /deep/
  > .v-input__control
  > .v-input__slot:before {
  border-color: transparent !important;
  border-image: unset !important;
  background-image: unset !important;
}
</style>
