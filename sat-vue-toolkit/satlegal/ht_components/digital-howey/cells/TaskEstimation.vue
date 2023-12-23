<template>
  <td>
    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-y
      left
      :close-on-content-click="false"
      style="width: 130px"
    >
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <span v-if="!dataRow.estimation">(No estimation)</span>
          <span v-else>{{ dataRow.estimation }}h</span>
        </div>
      </template>

      <v-card>
        <v-card-text class="py-0">
          <v-form ref="form">
            <v-row no-gutters class="align-center">
              <v-text-field
                ref="inputField"
                mask="####"
                v-model="newValue"
                required
                @focus="fieldFocus"
              >
                <template slot="append">hr(s)</template>
              </v-text-field>
              <v-btn
                class="ma-0"
                :disabled="newValue === dataRow.estimation"
                color="primary"
                icon
                @click="updateEstimation"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-menu>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      newValue: "",
      menu: false
    };
  },
  methods: {
    updateEstimation() {
      if (this.$refs.form.validate()) {
        this.$emit("update", this.newValue);
        this.menu = false;
      }
    },
    fieldFocus(e) {
      e.srcElement.select();
    }
  },
  mounted() {
    this.newValue = this.dataRow.estimation;
  },
  watch: {
    menu(v) {
      this.$refs.form.resetValidation();
      if (v) {
        this.newValue = this.dataRow.estimation;
        setTimeout(() => {
          this.$refs.inputField.focus();
        }, 100);
      }
    }
  }
};
</script>
