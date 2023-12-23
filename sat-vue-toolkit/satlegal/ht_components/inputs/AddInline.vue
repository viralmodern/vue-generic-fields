<template>
  <v-form ref="form" @submit.prevent="save">
    <v-row v-model="valid" no-gutters lazy-validation>
      <v-text-field
        @click.native.stop
        autofocus
        class="ma-0 pa-0"
        v-model="text"
        :rules="[v => !!v || 'This field is required']"
        v-on:blur="() => $refs.form.resetValidation()"
        :hint="hint"
      />
      <v-btn @click.native.stop="save" class="ma-0 custom" icon color="primary">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn @click.native.stop="cancel" class="ma-0 custom" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>
  </v-form>
</template>
<script>
export default {
  props: {
    hint: String
  },
  data() {
    return {
      text: "",
      valid: true
    };
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.$emit("add", this.text);
        this.cancel();
      }
    },
    cancel() {
      this.text = "";
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.custom /deep/ .v-icon {
  padding: 0px;
}
</style>
