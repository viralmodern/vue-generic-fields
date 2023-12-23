<template>
  <div class="w-100 d-flex align-center fill-height">
    <div class="field-cell-content">
      <template v-if="showRowTextContent && getFieldTextContent">
        <component :is="getFieldTextContent.name"
                   v-bind="getFieldTextContent.props"></component>
      </template>
      <template v-else>
        <template v-if="pathLink">
          <template v-if="isMultiple">
            <template v-for="(p, index) in pathLink">
              <router-link :key="`${p.link}-${index}`" replace
                           :class="{'mt-2': index !== 0}"
                           class="caption text-decoration-unset block-with-text"
                           :title="`${p.text}`"
                           :to="`${p.link}`"
                           v-text="`${p.text}`"/>
            </template>
          </template>
          <template v-else>
            <router-link class="caption text-decoration-unset block-with-text" replace
                         :title="`${pathLink.text}`"
                         :to="pathLink.link"
                         v-text="`${pathLink.text}`"/>
          </template>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  export default {
    name: "TextLinkCell",
    data() {
      return {
        val: {}
      }
    },
    mixins: [mxAttributeItem],
    computed: {
      isMultiple() {
        let {pathLink} = this
        return Boolean(pathLink) && Array.isArray(pathLink)
      },
      pathLink() {
        try {
          const {pathLink, pathLinkValue, pathLinkText, name, multiple} = this.$$attribute
          const {row, val, uniqueId} = this
          if(!val) return false
          if(!pathLink) return {
            link: row[uniqueId],
            text: row[uniqueId]
          }
          if(multiple) {
            let pls = val.map(v => {
              let pl = pathLink.bind(row)
              let link = `${pl()}/${v[pathLinkValue]}`
              let text = `${v[pathLinkText]}`
              return {link, text}
            })
            return pls
            // return [...pls, ...pls, ...pls]
          }else {
            let pl = pathLink.bind(row)
            let link = pl()
            let text = ''
            if(pathLinkValue) {
              text = row[name][pathLinkText]
            }else {
              text = row[name]
            }
            text = text ? text : ''
            return {link, text}
            // return `${pl()}`
          }
          // return pathLink
        }catch (e) {
          console.error('TDN_ERROR', e.message)
          return false
        }
      },
    },
    watch: {
      value: {
        immediate: true,
        handler(v) {
          this.val = v
        }
      }
    },
    methods: {

    },

  }
</script>

<style scoped lang="scss">
  .field-cell-content {
    /*border: solid 1px red;*/
    .block-with-text {
      -webkit-line-clamp: 20;
    }
  }
  .app--compact {
    .field-cell-content {
      /*border: solid 1px red;*/
      .block-with-text {
        -webkit-line-clamp: 1;
      }
    }
  }
</style>
