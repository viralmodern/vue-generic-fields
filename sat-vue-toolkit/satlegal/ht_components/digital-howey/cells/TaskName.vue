<template>
  <td>
    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
      style="width: 130px"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on" class="card-name">{{ dataRow.cardName }}</span>
      </template>
      <v-card>
        <v-card-text class="py-0">
          <v-form ref="form">
            <v-row no-gutters class="align-center">
              <v-text-field
                ref="inputField"
                v-model="newValue"
                :rules="[v => !!v || 'Card name is required']"
                required
                @focus="fieldFocus"
              ></v-text-field>
              <v-btn
                class="ma-0"
                :disabled="newValue === dataRow.cardName"
                color="primary"
                icon
                @click="updateTaskName"
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
import { mapActions } from "vuex";
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
    ...mapActions("ht_store/task/list", ["updateTask"]),
    updateTaskName() {
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
    this.newValue = this.dataRow.cardName;
  },
  watch: {
    menu(v) {
      this.$refs.form.resetValidation();
      if (v) {
        this.newValue = this.dataRow.cardName;
        setTimeout(() => {
          this.$refs.inputField.focus();
        }, 100);
      }
    }
  }
};
</script>
<style scoped>
.card-name {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
