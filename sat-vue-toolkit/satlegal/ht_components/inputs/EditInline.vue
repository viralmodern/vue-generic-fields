<template>
  <v-form ref="form">
    <v-row no-gutters>
      <v-textarea
        @click.prevent.stop
        autofocus
        rows="1"
        auto-grow
        hide-details
        class="ma-0 pa-0"
        v-model="text"
        :rules="[v => !!v || 'This field is required']"
      />
      <v-btn @click.prevent.stop="save" class="ma-0 pa-0" icon color="primary">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn @click.prevent.stop="cancel" class="ma-0 pa-0" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>
  </v-form>
</template>
<script>
export default {
  props: {
    valueText: String
  },
  data() {
    return {
      text: ""
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
  },
  mounted() {
    this.text = this.valueText;
  },
  watch: {
    valueText(value) {
      this.text = value;
    }
  }
};
</script>
