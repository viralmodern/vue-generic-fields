<template>
  <div class="d-block w-100 fill-height">
    <div @click="change"
         class="d-flex justify-center cursor--pointer fill-height"
         :title="val.length | $$linkCountLabel">
      <div class="flex-grow-1 fill-height">
        <div class="text-left" v-if="val.length">
          <a v-for="url in val"
             target="_blank"
             :href="url" v-html="url" class="caption url_cell_item"/>
        </div>
        <div class="text-center fill-height d-flex align-center justify-center" v-else>
          -
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mx_validate from "@/sat-vue-toolkit/mixins/mxValidate";
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  import { $$linkCountLabel } from "@/sat-vue-toolkit/functions"
  export default {
    name: "UrlsCell",
    mixins: [mx_validate, mxAttributeItem],
    data() {
      return {
        text: '',
        val: []
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(v) {
          this.val = v || []
        }
      }
    },
    methods: {
      change(e) {
        this.$$openDropDownSource(e, {items: this.val})
      },
    },
    filters: {
      $$linkCountLabel,
    }
  }
</script>

<style scoped>
  .url_cell_item {
    word-break: break-all;
  }
</style>
