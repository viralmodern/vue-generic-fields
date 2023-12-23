<template>
  <v-menu
    v-model="isShow"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-add_circle_outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-col class="px-2">
          <v-form ref="form">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Group name"
                  :rules="[v => !!v || 'Group name is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-combobox
                  v-model="tags"
                  label="Select tag"
                  :search-input.sync="search"
                  multiple
                  :items="items"
                  :rules="[v => !!v || 'Please choose tag']"
                  small-chips
                >
                  <template slot="no-data">
                    <v-list-item>
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
    items: Array
  },
  data() {
    return {
      name: "",
      isShow: "",
      tags: "",
      search: ""
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        this.isShow = false;
        let data = {
          name: this.name,
          tags: [...this.tags]
        };
        this.$emit("addGroupTag", data);
        this.tags = [];
        this.name = "";
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>
