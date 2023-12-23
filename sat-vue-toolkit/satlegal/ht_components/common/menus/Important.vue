<template>
  <div class="px-3">
    <SelectInline
      :item="getFavorable"
      :items="level"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </div>
</template>
<script>
import { level } from "../../../config";
import SelectInline from "../../menus/SelectInline";
export default {
  data() {
    return {
      level
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
      return (
        (this.level || []).find(x => x.id === this.value) || {}
      );
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
