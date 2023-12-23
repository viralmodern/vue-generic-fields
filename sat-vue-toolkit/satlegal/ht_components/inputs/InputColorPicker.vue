<template>
  <div>
    <v-row no-gutters class="align-center">
      <v-col cols="12" sm="10">
        <v-text-field
          :value="name"
          @change="change('name', $event)"
          label="Label name"
          :rules="[v => !!v || 'This is required!']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" class="text-sm-center">
        <v-btn
          icon
          @click="isShowColorPicker = true"
          :style="'background-color: ' + color"
        >
          <v-icon size="25" color="white">color_lens</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog
      :value="isShowColorPicker"
      @input="isShowColorPicker = false"
      width="225px"
    >
      <ChromePicker right value="#FFF" @input="change('color', $event.hex)" />
    </v-dialog>
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
    name: String
  },
  data() {
    return {
      isShowColorPicker: false
    };
  },
  methods: {
    change(name, value) {
      this.$emit("change", { [name]: value });
    }
  }
};
</script>
