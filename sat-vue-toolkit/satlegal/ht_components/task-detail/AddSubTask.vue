<template>
  <v-row no-gutters>
    <v-menu
      v-model="showMenu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="primary" block
          >Add SubTask
          <v-icon class="ml-1">mdi-add_circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-col class="px-2">
            <v-form ref="form">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    label="Name "
                    v-model="name"
                    :rules="[v => !!v || 'Name is required']"
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
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false,
      name: ""
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          code: 45348,
          name: this.name
        };
        this.$emit("addSubTask", data);
        this.name = "";
        this.showMenu = false;
      }
    }
  }
};
</script>
