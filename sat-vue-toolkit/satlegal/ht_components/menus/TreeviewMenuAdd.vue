<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="100"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" block color="primary">
        {{ nameBtn }}
        <v-icon right>mdi-add_circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-col class="px-2">
          <v-form ref="form">
            <v-row  no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  :rules="[v => (v || '').length > 0 || requireName]"
                  :label="label"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" v-if="isSelect === true">
                <v-select
                  :items="stages"
                  label="Select topic"
                  item-text="name"
                  item-value="id"
                  :value="objectSelect"
                  @change="changeTopic"
                  return-object
                  :rules="[v => !!v || 'Select topic is required']"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-list>
      <v-card-actions class="mt-2">
        <v-spacer></v-spacer>
        <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  props: {
    nameBtn: String,
    label: String,
    requireName: String,
    isSelect: Boolean,
    stages: Array,
    topic: Object
  },
  data() {
    return {
      name: "",
      menu: false,
      objectSelect: null
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          itemSelect: this.objectSelect
        };
        this.$emit("add", data);
        this.menu = false;
        this.resetForm();
      }
    },
    closeMenu() {
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    changeTopic(object) {
      this.objectSelect = object;
    },
    getTopic(val) {
      if (val) {
        this.objectSelect = val;
      }
    }
  },
  mounted() {
    this.getTopic(this.topic);
  },
  watch: {
    menu(val) {
      if (!val) {
        this.closeMenu();
      }
    },
    topic(val) {
      this.getTopic(val);
    }
  }
};
</script>
