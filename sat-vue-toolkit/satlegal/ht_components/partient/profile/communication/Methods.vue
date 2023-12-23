<template>
  <v-select
    :value="option"
    :items="methodsOption"
    item-text="name"
    item-value="id"
    label="Select option methods"
    persistent-hint
    return-object
    class="select"
    @change="change"
  ></v-select>
</template>
<script>
import { methodsOption } from "../../../../config";
export default {
  props: {
    itemMethods: Number
  },
  data() {
    return {
      methodsOption,
      menu: false
    };
  },
  computed: {
    option() {
      return this.methodsOption.find(x => x.id === this.itemMethods);
    }
  },
  methods: {
    change(e) {
      this.$emit("updateDetailCommunication", e.id);
      this.menu = false;
    }
  }
};
</script>
