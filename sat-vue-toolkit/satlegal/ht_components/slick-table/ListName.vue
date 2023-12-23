<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <span v-on="on">{{ item.name }}</span>
    </template>
    <v-card>
      <v-card-text class="py-0">
        <v-form ref="form">
          <v-row no-gutters class="align-center">
            <v-text-field
              ref="inputField"
              v-model="newValue"
              :rules="[v => !!v || 'List name is required']"
              required
              @focus="fieldFocus"
            ></v-text-field>
            <v-btn
              class="ma-0"
              :disabled="newValue === item.name"
              color="primary"
              icon
              @click="updateListName"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      newValue: "",
      menu: false
    };
  },
  methods: {
    updateListName() {
      if (this.$refs.form.validate()) {
        let data = {
          id: this.item.id,
          value: this.newValue
        };
        this.$emit("editListName", data);
        this.menu = false;
      }
    },
    fieldFocus(e) {
      e.srcElement.select();
    }
  },
  mounted() {
    this.newValue = this.item.name;
  }
};
</script>
