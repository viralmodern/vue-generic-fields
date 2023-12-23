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
      <v-col>
        <v-text-field
          label="Address"
          :rules="[v => !!v || 'This field is required']"
          v-model="address"
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
      address: "",
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
          name: this.name,
          address: this.address
        };
        this.$emit("addNewLocation", data);
      }
    },
    edit() {
      const data = {
        id: this.item.id,
        name: this.name,
        address: this.address
      };
      this.$emit("editLocation", data);
    }
  },
  mounted() {
    this.name = this.item.name || "";
    this.address = this.item.address || "";
  }
};
</script>
