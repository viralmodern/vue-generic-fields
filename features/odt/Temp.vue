<template>
  <div @click="change" class="tr d-flex">
    <div class="td fill-height" v-html="`#${item.pk}`"></div>
    <div class="td fill-height" v-html="item.description"></div>
  </div>
</template>

<script>
export default {
  props: {
    item: {},
  },
  data: () => ({
    items: [],
    loading: false,
  }),
  mounted() {},
  methods: {
    change() {
      console.log(1)
    },
  },
}
</script>

<style scoped lang="scss">
.row-item {
  overflow: hidden;
}
</style>
