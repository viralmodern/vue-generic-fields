<template>
  <v-row no-gutters class="align-center">
    <v-col cols="10" class="ml-4">
      <v-text-field
        v-model="newCheckList"
        height="40"
        label="Add a job..."
      ></v-text-field>
    </v-col>
    <v-col>
      <v-btn @click="addItemCheckList" small icon class="mt-2">
        <v-icon color="primary">mdi-add_circle</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    idItem: Number
  },
  data() {
    return {
      newCheckList: null
    };
  },
  methods: {
    addItemCheckList() {
      const object = {
        idItem: this.idItem,
        newCheckList: this.newCheckList
      };
      this.$emit("emitAddCheckList", object);
    }
  }
};
</script>
