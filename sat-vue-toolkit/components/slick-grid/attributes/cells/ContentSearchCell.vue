<template>
  <div class="w-100 d-flex align-center fill-height">
    <div class="py-2">
      <strong>{{value.length}}</strong>
      <div class="item-result">
        <p class="d-flex flex-wrap">
          <router-link :to="pathLink" v-html="getLinkText"/>
          <span class="ml-2" v-if="getBadgeLabel" v-html="getBadgeLabel"></span>
        </p>
        <div v-html="val.headline"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  export default {
    name: "ContentSearchCell",
    data() {
      return {
        val: {}
      }
    },
    mixins: [mxAttributeItem],
    components: {
    },
    computed: {
      pathLink() {
        try {
          const {pathLink} = this.attribute
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
      getLinkText() {
        try {
          return this.val.name === null ? '' : this.val.name
        }catch (e) {
          return ''
        }
      },
      getContent() {
        try {
          return this.val.text_content === null ? '' : this.val.text_content
        }catch (e) {
          return ''
        }
      },
      getBadgeLabel() {
        try {
          let count = this.val.page_count || 0
          count = count ? Number(count) >= 2 ? `${count} pages` : `${count} page` : ``
          return count ? `(<strong>${count}</strong>)` : ``
        }catch (e) {
          return false
        }
      },
      getKeyWord() {
        try {
          return this.val.key_word === null ? '' : this.val.key_word.toLowerCase()
        }catch (e) {
          return ''
        }
      }

    },
    watch: {
      value: {
        immediate: true,
        handler(v) {
          if(v) {
            this.val = v[0]
          }
        }
      }
    },
    methods: {

    },

  }
</script>

<style scoped>

</style>
