<template>
  <div>
    <SelectInline
      :item="getDocketType"
      :items="docketType"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </div>
</template>
<script>
import { docketType } from "../../../config";
import SelectInline from "../../menus/SelectInline";
export default {
  data() {
    return {
      docketType
    };
  },
  components: {
    SelectInline
  },
  props: {
    value: [Number]
  },
  computed: {
    getDocketType() {
      return (
        (this.docketType || []).find(x => x.id === (this.value || 0)) || {}
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
