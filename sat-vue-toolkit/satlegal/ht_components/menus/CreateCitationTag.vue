<template>
  <v-menu
    v-model="isShow"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon>
        <v-icon>mdi-add_circle_outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-col class="px-2">
          <v-form ref="form">
            <v-row no-gutters>
              <v-col cols="12">
                <v-combobox
                  v-model="name"
                  label="Tag name"
                  :search-input.sync="search"
                  :items="items"
                  :rules="[v => !!v || 'Please choose tag']"
                  small-chips
                >
                  <template slot="no-data">
                    <v-list-item class="custom">
                      <v-list-item-content>
                        <v-list-item-title>
                          Press
                          <kbd>enter</kbd> to create tag
                          <strong>{{ search }}</strong
                          >.
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-list>
      <v-card-actions class="mt-2">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      isShow: "",
      search: ""
    };
  },
  props: {
    items: Array
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        this.isShow = false;
        this.$emit("addTag", this.name);
        this.name = "";
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>

<style scoped>
.custom /deep/ .v-list__tile {
  height: 25px;
}
</style>
