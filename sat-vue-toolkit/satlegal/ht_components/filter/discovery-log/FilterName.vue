<template>
  <div>
    <v-text-field
      placeholder="Name discovery log"
      v-model="name"
      label="Name"
      @input="changeType"
      prepend-icon="mdi-magnify"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    changeType() {
      const data = {
        type: "name",
        value: this.name
      };
      this.$emit("filterLog", data);
    }
  }
};
</script>
