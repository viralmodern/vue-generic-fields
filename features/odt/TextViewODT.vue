<template>
  <div>
    <div
      ref="boxContent"
      class="box_content_text pa-2 dynamic-content"
      @click="clickContent"
    >
      <div v-html="content"></div>
    </div>
    <v-menu
      max-width="450px"
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
      :close-on-content-click="false"
    >
      <div>
        <SearchKeyWordOpinions
          v-if="modeTextSelection"
          :key-word="textSelection"
          disabled-input-search
          height="65vh"
        />
        <OpinionAuthorityCitedByThumbNail
          v-if="modeTabSelection"
          :opinion="opinionSelection"
        />
      </div>
    </v-menu>
  </div>
</template>

<script>
import mxDelegatingLinkDocument from './mixins/mxDelegatingLinkDocument'
import SearchKeyWordOpinions from '~/features/odt/SearchKeyWordOpinions'
import debounce from 'lodash/debounce'
import OpinionAuthorityCitedByThumbNail from '~/features/odt/OpinionAuthorityCitedByThumbNail'

export default {
  name: 'TextViewODT',
  props: {
    content: {
      default: () => '',
    },
    disabledDialog: {
      type: Boolean,
      default: () => false,
    },
  },

  components: {
    OpinionAuthorityCitedByThumbNail,
    SearchKeyWordOpinions,
  },
  data() {
    return {
      showMenu: false,
      x: 0,
      y: 0,
      textSelection: '',
      opinionSelection: null,
      modeTextSelection: false,
      modeTabSelection: false,
    }
  },
  mixins: [mxDelegatingLinkDocument],
  mounted() {
    this.initHoverAnchorLink()
  },
  methods: {
    clickContent(e) {
      this.handleClicks(e)
      let text = document.getSelection().toString()
      this.textSelection = text
      if (!text.length) {
        return
      }
      this.modeTabSelection = false
      this.modeTextSelection = true
      this.$emit('selection', text)
      this.show(e)
    },
    initHoverAnchorLink() {
      document.querySelectorAll('.box_content_text a').forEach((node) => {
        if (node.href) {
          node.setAttribute('data-hover', node.textContent)
        }
      })
      document
        .querySelectorAll('.box_content_text .citation')
        .forEach((node) => {
          node.onmouseover = this.mouseoverAnchorLink
        })
    },
    mouseoverAnchorLink: debounce(function (evt) {
      evt.preventDefault()
      let { target } = evt
      console.log('CITATION', target, target.setAttribute, evt, target.href)
      if (!target.href) {
        return
      }
      let href = target.href
      let url = new URL(href)
      let pathName = url.pathname
      let opinionSelection = pathName
        .replace('/odt/opinions/', '')
        .replace('/', '')
      if (!opinionSelection) {
        return
      }
      this.opinionSelection = opinionSelection
      this.modeTabSelection = true
      this.modeTextSelection = false
      this.show(evt)
      evt.stopPropagation()
      return false
    }, 1000),

    show(e) {
      e.preventDefault()
      if (this.disabledDialog) return false
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
.box_content_text {
  /*font-family: 'Merriweather';*/
  border: solid 1px rgba(0, 0, 0, 0.05);
  font-size: 12px;
}
</style>
<style lang="scss">
.box_content_text {
  * {
    /*font-family: 'Merriweather';*/
  }
  pre {
    white-space: break-spaces;
  }
  .inline {
    display: inline;
  }
  a[data-hover] {
    white-space: nowrap;
    transition: all 0.25s ease-in-out;

    * {
      pointer-events: none;
    }

    position: relative;
    overflow: hidden;
    /*border: solid 1px red;*/
    text-decoration: unset;

    text {
      border: solid 1px red;
    }

    &:before {
      content: attr(data-hover);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      display: block;
      text-transform: uppercase;
      opacity: 0;
      transform: translate(-100%, 0);
      transition: all 0.25s ease-in-out;
      white-space: nowrap;
      background: rgba(0, 0, 0, 1);
      color: #ffffff;
    }

    &:hover {
      &:before {
        opacity: 1;
        transform: translate(0, 0);
      }

      text {
        opacity: 0;
        transform: translate(100%, 0);
      }
    }
  }
}

.theme--dark {
  .box_content_text {
    a[data-hover] {
      &:before {
        background: #ffa000;
        color: rgba(0, 0, 0, 0.87);
      }
    }
  }
}
</style>
