<template>
  <v-menu v-model="menu" offset-x>
    <template v-slot:activator="{ on }">
      <v-list-item-title v-on="on" @click.prevent
        >Include a Link</v-list-item-title
      >
    </template>
    <v-list>
      <v-form ref="form">
        <v-row  no-gutters>
          <span class="text-body-2 text-xs-center">Add a Link</span>
          <v-text-field
            :rules="[v => !!v || 'Title is required']"
            label="Title"
            v-model="title"
            class="pa-1"
            @click.native.stop
          ></v-text-field>
          <v-text-field
            :rules="rulesRequire"
            label="Link"
            v-model="link"
            class="pa-1"
            @click.native.stop
          ></v-text-field>
          <v-btn class="success" @click.native.stop="add">Add</v-btn>
        </v-row>
      </v-form>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      link: "",
      menu: false,
      rulesRequire: [
        v => !!v || "URL is required",
        v =>
          /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\\/]))?/.test(
            v
          ) || "URL must be valid"
      ]
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          nameFile: this.title,
          link: this.link,
          type: 2
        };
        this.$emit("addLink", data);
        this.$refs.form.reset();
        this.menu = false;
      }
    }
  }
};
</script>
