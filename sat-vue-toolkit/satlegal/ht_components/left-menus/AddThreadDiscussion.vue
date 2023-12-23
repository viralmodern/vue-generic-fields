<template>
  <v-list>
    <div>
      <v-list-item>
        <v-list-item-content>
          <v-menu
            v-model="showMenu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="primary" block>
                Add Thread
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
                          label="Thread name "
                          v-model="name"
                          :rules="[v => !!v || 'Thread name is required']"
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
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="item in menus"
        :key="item.id"
        style="cursor: pointer;"
      >
        <v-list-item-content>
          <v-list-item-title>
            <v-icon small>menu</v-icon>
            <span class="ml-2">{{ item.name }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      showMenu: false
    };
  },
  props: {
    menus: Array
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        this.$emit("createTheard", this.name);
        this.showMenu = false;
        this.name = "";
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>
