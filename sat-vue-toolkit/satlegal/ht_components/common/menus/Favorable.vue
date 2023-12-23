<template>
  <div>
    <SelectInline
      :item="getFavorable"
      :items="favorableFact"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </div>
</template>
<script>
import { favorableFact, NA } from "../../../config";
import SelectInline from "../../menus/SelectInline";
export default {
  data() {
    return {
      favorableFact: [NA, ...favorableFact]
    };
  },
  components: {
    SelectInline
  },
  props: {
    value: [Number]
  },
  computed: {
    getFavorable() {
      return (this.favorableFact || []).find(x => x.id === this.value) || {};
    }
  },
  methods: {
    select(data) {
      if (this.value !== (this.data || {}).id) {
        this.$emit("update", data.id);
      }
    }
  }
};
</script>
