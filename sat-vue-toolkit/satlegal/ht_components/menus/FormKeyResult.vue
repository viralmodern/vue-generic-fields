<template>
  <v-menu
    v-model="menu"
    :nudge-width="250"
    transition="scale-transition"
    offset-x
    right
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">
        <v-icon class="mr-2">mdi-add_circle_outline</v-icon>Add Key Result
      </v-btn>
    </template>
    <v-list class="pa-4">
      <v-form ref="form">
        <v-row no-gutters>
          <v-col>
            <v-text-field
              class="ma-0 pa-0"
              v-model="result"
              label="Result"
              :rules="[v => !!v || 'This field is required']"
            />
          </v-col>
          <v-col class="mt-4">
            <v-slider
              v-model="progress"
              :rules="[v => !!v || 'This field is required']"
              :thumb-size="20"
              thumb-label="always"
            ></v-slider>
          </v-col>
          <v-row no-gutters class="justify-end">
            <v-btn @click="save()" class="ma-0 custom" color="primary"
              >Add</v-btn
            >
          </v-row>
        </v-row>
      </v-form>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      result: "",
      progress: "",
      menu: false
    };
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        const data = {
          parentId: this.item.id,
          dataPush: {
            id: Math.random(),
            result: this.result,
            progress: this.progress
          }
        };
        this.$emit("addKeyResult", data);
        this.menu = false;
        this.result = "";
        this.progress = "";
      }
    }
  }
};
</script>
