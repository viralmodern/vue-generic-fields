<template>
  <div>
    <SelectInline
      :item="getDocketType"
      :items="fieldByDocket"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </div>
</template>
<script>
import { fieldByDocket } from "../../../config";
import SelectInline from "../../menus/SelectInline";
export default {
  data() {
    return {
      fieldByDocket
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
        (this.fieldByDocket || []).find(x => x.id === (this.value || 0)) || {}
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
