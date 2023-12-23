<template>
  <input
    class="search-box"
    type="text"
    placeholder="🔍"
    :value="filterObject.cardName"
    @change="change"
  >
</template>

<script>
export default {
  props: {
    filterObject: Object,
    column: Object,
    changeFilter: Function
  },
  methods: {
    change(v) {
      this.changeFilter({ ...this.filterObject, cardName: v.target.value });
    }
  }
};
</script>
<style scoped>
.search-box {
  padding: 0 6px;
  width: none;
  height: 27px;
  box-sizing: border-box;
  border: 1px solid silver;
  border-radius: 4px;
  margin-bottom: 6px;
  display: block;
  width: 100%;
  font-family: "Segoe UI Symbol";
}
</style>


