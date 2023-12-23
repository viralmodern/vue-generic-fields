<template>
  <div class="px-3">
    <SelectInline
      :item="findData"
      :items="items"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </div>
</template>
<script>
import SelectInline from "../../menus/SelectInline";
export default {
  components: {
    SelectInline
  },
  props: {
    value: [Number],
    items: Array
  },
  computed: {
    findData() {
      return (this.items || []).find(x => x.id === this.value) || {};
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
