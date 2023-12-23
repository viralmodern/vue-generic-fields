<template>
  <div class="w-100 d-flex align-center fill-height">
    <div class="documents-items-cell py-2">
      <template v-for="(document, index) in val">
          <div :key="`drv-${document.pk}`"
               class="documents-items-cell--item"
               :class="{'mt-2': index !== 0}">
            <DocumentItemCell :options="reduceOptionsAttribute"
              :path="`${pathLink}`"
              :detail="document"
            />
          </div>
      </template>
    </div>
  </div>
</template>
<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  import DocumentItemCell from "@/sat-vue-toolkit/components/DocumentItemCell"
  export default {
    name: "DocumentsCell",
    components: { DocumentItemCell },
    data() {
      return {
        val: {}
      }
    },
    mixins: [mxAttributeItem],
    watch: {
      value: {
        immediate: true,
        handler(v) {
          this.val = v
        }
      }
    },
    computed: {
      pathLink() {
        try {
          const {pathLink} = this.$$attribute
          const {row} = this
          if(typeof pathLink === "function") {
            let pl = pathLink.bind(row)
            return `${pl()}`
          }
          return pathLink
        }catch (e) {
          return ''
        }
      },
    },

  }
</script>

<style scoped lang="scss">
  .app--compact {
    .documents-items-cell {
      /*border: solid 1px blue;*/
      display: flex;
      overflow: hidden;
      position: relative;
      .documents-items-cell--item {
        margin-top: 0px !important;
      }
    }
  }
</style>
