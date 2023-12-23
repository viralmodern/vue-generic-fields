<template>
  <v-dialog :value="isShow" max-width="300px" @input="closeModal" persistent>
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">
            {{ labelTitle }}
          </div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeModal">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <ColorPicker
            :color="defaultColor"
            :labelColor="labelColor"
            @emitColorValue="color"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default darken-1" @click="closeModal">Cancel</v-btn>
        <v-btn color="primary darken-1" @click="submit">{{ btnAdd }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import ColorPicker from "../inputs/ColorPicker";

export default {
  components: {
    ColorPicker
  },
  props: {
    isShow: Boolean,
    btnAdd: String,
    labelTitle: String,
    labelColor: String
  },
  data() {
    return {
      valid: true,
      defaultColor: "#FF0000",
      colorValue: null
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit("submit", this.colorValue);
        this.closeModal();
      }
    },
    color(color) {
      this.colorValue = color;
    },
    closeModal() {
      this.defaultColor = "#FF0000";
      this.colorValue = null;
      this.$refs.form.reset();
      this.$emit("closeModal");
    }
  }
};
</script>
