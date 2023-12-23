<template>
  <v-row no-gutters class="my-3 pa-2">
    <v-form ref="form" v-model="valid">
      <v-col>
        <v-text-field
          label="Name"
          :rules="[v => !!v || 'This field is required']"
          v-model="name"
        ></v-text-field>
      </v-col>
      <v-col class="text-xs-right">
        <v-btn class="default" @click="$emit('closeAdd')">Close</v-btn>
        <v-btn class="primary" v-if="item" @click="edit">Edit</v-btn>
        <v-btn class="primary" v-else @click="add">Add</v-btn>
      </v-col>
    </v-form>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      valid: false
    };
  },
  props: {
    item: Object
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          name: this.name
        };
        this.$emit("addNewSubject", data);
      }
    },
    edit() {
      const data = {
        id: this.item.id,
        name: this.name
      };
      this.$emit("editSubject", data);
    }
  },
  mounted() {
    this.name = this.item ? this.item.name : "";
  }
};
</script>
