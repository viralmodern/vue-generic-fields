<template>
  <v-form ref="form" @submit.prevent="save">
    <div>
      <v-row no-gutters>
        <v-text-field
          :rules="[
            v => !!v || 'This field is required',
            v => v.length === 4 || 'wrong format'
          ]"
          v-model="startTime"
          class="pa-2"
          label="Time from"
          mask="##:##"
        ></v-text-field>
        <v-text-field
          :rules="[
            v => !!v || 'This field is required',
            v => v.length === 4 || 'wrong format'
          ]"
          v-model="endTime"
          class="pa-2"
          label="Time to"
          mask="##:##"
        ></v-text-field>
      </v-row>
    </div>
    <div>
      <v-row v-model="valid" no-gutters lazy-validation>
        <v-textarea
          @click.native.stop
          autofocus
          class="ma-0 pa-0 mt-1 custom-text-field input-size"
          v-model="text"
          name="input-7-1"
          rows="3"
          :rules="[v => !!v || 'This field is required']"
          v-on:blur="() => $refs.form.resetValidation()"
          :placeholder="placeholder"
        />
        <v-btn
          @click.native.stop="save"
          class="ma-0 custom"
          icon
          color="primary"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn @click.native.stop="cancel" class="ma-0 custom" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
    </div>
  </v-form>
</template>
<script>
export default {
  props: {
    placeholder: String
  },
  data() {
    return {
      text: "",
      valid: true,
      startTime: "",
      endTime: ""
    };
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        const data = {
          text: this.text,
          startTime: this.timeCalStart,
          endTime: this.timeCalEnd
        };
        this.$emit("add", data);
        this.cancel();
      }
    },
    cancel() {
      this.text = "";
      this.$emit("close");
    }
  },
  computed: {
    timeCalStart() {
      var output = "";
      for (var i = this.startTime.length; i > 0; i -= 2) {
        var ii = i - 1;
        if (output) {
          output =
            this.startTime.charAt(ii - 1) +
            this.startTime.charAt(ii) +
            ":" +
            output;
        } else {
          output = this.startTime.charAt(ii - 1) + this.startTime.charAt(ii);
        }
      }
      return output;
    },
    timeCalEnd() {
      var output = "";
      for (var i = this.endTime.length; i > 0; i -= 2) {
        var ii = i - 1;
        if (output) {
          output =
            this.endTime.charAt(ii - 1) +
            this.endTime.charAt(ii) +
            ":" +
            output;
        } else {
          output = this.endTime.charAt(ii - 1) + this.endTime.charAt(ii);
        }
      }
      return output;
    }
  }
};
</script>

<style scoped>
.custom /deep/ .v-icon {
  padding: 0px;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.input-size {
  width: 100%;
  font-size: 13px;
}
</style>
