<template>
  <div>
    <slot :url="urlFavicon">
      <div class="favicon_avatar">
        <template v-if="urlFavicon">
          <img :src="urlFavicon" alt=""/>
        </template>
      </div>
    </slot>
  </div>
</template>

<script>
  import { find } from "linkifyjs"

  export default {
    name: "FaviconThumbnail",
    props: {
      baseFavicon: {
        type: String,
        default: () => `https://www.google.com/s2/favicons?domain_url`
      },
      attribute: {
        type: Object,
        default: () => ({})
      },
      row: {},
      domainUrl: {
        type: String,
        default: () => ``
      }
    },
    computed: {
      urlFavicon () {
        let { row, baseFavicon, domainUrl } = this
        // single case
        if(Boolean(domainUrl)) {
          return `${baseFavicon}=${domainUrl}`
        }
        // else
        let { faviconLink } = this.attribute
        if (Boolean(faviconLink) && Boolean(row)) {
          if (typeof faviconLink === "function") {
            let fl = faviconLink.bind(row), hostname
            let urls = find(fl())
            let url = urls[0]
            if (url) {
              let _url = new URL(url.value)
              hostname = _url.hostname
              return `${baseFavicon}=${hostname}`
            }
            return false
          } else if (typeof faviconLink === "string") {
            return faviconLink
          }
          return false
        }
        return false
      }
    }
  }
</script>


<style scoped lang="scss">
  .favicon_avatar {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0px 5px 10px;
    background: #E8EAF6;
    overflow: hidden;
    border-radius: 100%;
    img {
      display: block;
      width: 75%;
    }
  }
</style>

<style lang="scss">
  .row_column_item, .row_list_item {
    .favicon_avatar {
      margin-left: 0px;
      margin-right: 10px;
    }
  }
  .theme--dark {
    .favicon_avatar {
      background: transparent;
    }
  }
</style>
