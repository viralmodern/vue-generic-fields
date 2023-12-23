<template>
  <v-menu
    v-model="isShow"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" outlined icon color="primary">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-col class="px-2">
          <v-form ref="form">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="relationName"
                  :label="label"
                  :rules="rules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  props: {
    items: Array,
    label: String,
    rules: Array
  },
  data() {
    return {
      relationName: "",
      isShow: ""
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        this.isShow = false;
        let data = {
          id: Math.random(),
          text: this.relationName
        };
        this.$emit("addRelation", data);
        this.name = "";
        this.closed();
      }
    },
    closed() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    }
  }
};
</script>
