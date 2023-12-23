<template>
  <v-dialog v-model="isModalCreate" max-width="300px" @input="closeModal">
    <template v-slot:activator="{ on }" v-if="issue === true">
      <v-btn icon v-on="on">
        <v-icon size="30">mdi-add_circle_outline</v-icon>
      </v-btn>
    </template>
    <template v-slot:activator="{ on }" v-else>
      <v-btn v-on="on">
        <v-icon size="30">mdi-add_circle_outline</v-icon>
        <span class="ml-2 text-none">Add label</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ labelTitle }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <ColorPicker
            :labelColor="labelColor"
            :color="defaultColor"
            @emitColorValue="reveiveEmitColorValue"
            v-model="defaultColor"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default darken-1" @click="isModalCreate = false"
          >Cancel</v-btn
        >
        <v-btn color="primary darken-1" @click="addLabelsColor">{{
          btnAdd
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import ColorPicker from "../inputs/ColorPicker";

export default {
  components: {
    ColorPicker
  },
  props: {
    issue: Boolean,
    btnAdd: String,
    labelTitle: String,
    labelColor: String
  },
  data() {
    return {
      isModalCreate: false,
      defaultColor: "#FF0000",
      colorValue: "",
      labelName: "",
      snackbar: false,
      messageSnackbar: ""
    };
  },
  methods: {
    ...mapActions("ht_store/project", ["createThemeColorRequest"]),
    ...mapMutations("ht_store/project", ["createThemeColorSuccess"]),
    addLabelsColor() {
      if (this.$refs.form.validate() && this.dataColorPicker) {
        this.isModalCreate = false;
        this.messageSnackbar = "Create Labels Success !";
        this.emitSnackbar(this.messageSnackbar);
        this.createThemeColorRequest(this.dataColorPicker);
        this.$emit("createColorLabel", this.dataColorPicker);
      }
    },
    setColor(color) {
      this.updateColors(color);
      this.colorValue = color;
    },
    reveiveEmitColorValue(dataColorPicker) {
      this.dataColorPicker = dataColorPicker;
    },
    emitSnackbar(objectMessage) {
      this.snackbar = true;
      this.$emit("snackbar", this.snackbar, objectMessage);
    },
    closeModal() {
      this.defaultColor = "#FF0000";
      this.$refs.form.reset();
    }
  }
};
</script>
