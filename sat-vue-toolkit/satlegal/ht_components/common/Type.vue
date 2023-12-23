<template>
  <div>
    <SelectInline
      :item="getFactType"
      :items="factType"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </div>
</template>
<script>
import { factType } from "../../config";
import SelectInline from "../menus/SelectInline";
export default {
  data() {
    return {
      factType
    };
  },
  components: {
    SelectInline
  },
  props: {
    value: [Number]
  },
  computed: {
    getFactType() {
      return (
        (this.factType || []).find(x => x.id === (this.value || 0)) || {}
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
