<template>
  <v-card flat tile class="box_content_rake">
    <div class="rake_content_text" v-html="content"></div>
    <div
      class="rake_content_text_handle dynamic-content pa-2 show-all"
      v-html="textRakeContent"
      @click="handleClicks"
    ></div>
  </v-card>
</template>

<script>
import { $$darkRake } from '@/sat-vue-toolkit/functions'
import md5 from 'md5'
import mxDelegatingLinkDocument from './mixins/mxDelegatingLinkDocument'

const color = []
export default {
  name: 'RakeViewODT',
  props: {
    content: {
      default: () => '',
    },
    rakes: {
      type: Array,
      default: () => [],
    },
    colorsRake: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      textRakeContent: '',
      tempContents: [],
    }
  },
  mixins: [mxDelegatingLinkDocument],
  watch: {
    rakes: {
      immediate: true,
      handler: 'handelRakes',
    },
  },
  methods: {
    handelRakes() {
      try {
        let htmlContents = this.getHtmlRake()
        let rakes = [...this.rakes]

        for (let i = 0; i < rakes.length; i++) {
          let rakeItem = rakes[i]
          let phrase = rakeItem['phrase']
          let color = rakeItem['color']
          let isDark = $$darkRake(color)
          let className = isDark ? 'rake_rank rake_rank--dark' : 'rake_rank'

          // let strPt = new RegExp(phrase, 'gi');
          phrase = phrase
            .replace(/\[/gi, '\\[')
            .replace(/]/gi, '\\]')
            .replace(/\^/gi, '\\^')
            .replace(/\$/gi, '\\$')
            .replace(/\|/gi, '\\|')
            .replace(/\?/gi, '\\?')
            .replace(/\*/gi, '\\*')
            .replace(/\+/gi, '\\+')
            .replace(/\)/gi, '\\)')
            .replace(/\(/gi, '\\(')
            .replace(/\./gi, '\\.')
            .replace(/,/gi, '\\,')
            .replace(/\\/gi, '\/\\') // /
            .replace(/ /gi, '[\\s<>iabrpdvh]*?')
          // .replace('\\s\\S', '\\s')
          if (phrase.split(' ') <= 1) {
            phrase = '\\s' + phrase
          }
          /*console.error({
            i,
            phrase,
            rakeItem: rakeItem['phrase'],
            htmlContents,
          })*/
          let strPt = new RegExp(phrase, 'mig')
          let id = md5(rakeItem['phrase'])
          let execContent = strPt.exec(htmlContents)

          let contentReplace = (execContent && execContent[0]) || ''
          // let contentReplace = rakeItem['phrase']
          htmlContents = htmlContents.replace(
            strPt,
            `<span id="${id}"
            class="${className}"
            style="background-color: ${color}">${contentReplace}</span>`
          )
          // this.tempContents.push(htmlContents)
          if (i === rakes.length - 1) {
            this.textRakeContent = htmlContents
          }
        }
      } catch (e) {
        console.error('RGX', e.message)
      }
    },
    getHtmlRake() {
      try {
        return document.querySelector('.rake_content_text').innerHTML
      } catch (e) {
        return ''
      }
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400&display=swap');
pre {
  word-break: break-all;
  white-space: pre-wrap;
}
.rake_rank {
  /*border: solid 1px red;*/
  color: rgba(0, 0, 0, 0.87);
  white-space: pre-wrap;
  &--dark {
    color: #ffffff;
    outline: none;
  }
}
.theme--dark {
  .rake_content_text_handle {
    &:not(.show-all) {
      .rake_rank {
        color: #ffffff;
        &:not(.rake_rank--active) {
          color: #ffffff;
        }
      }
    }
  }
}

.rake_content_text_handle {
  font-family: 'Roboto Slab', serif;
  * {
    font-family: 'Roboto Slab', serif;
  }
  border: solid 1px rgba(0, 0, 0, 0.05);
  pre {
    white-space: break-spaces;
  }
  .inline {
    display: inline;
  }
  &:not(.show-all) {
    .rake_rank {
      &:not(.rake_rank--active) {
        background: transparent !important;
        color: rgba(0, 0, 0, 0.87);
      }
    }
  }
}

.temp-test {
  /*border: solid 1px blue;*/
  display: flex;
  flex-wrap: wrap;
  &--item {
    border: solid 1px blue;
    width: 50%;
    pre {
      white-space: pre-wrap !important;
    }
    * {
      white-space: pre-wrap !important;
    }
  }
}
</style>
<style scoped lang="scss">
.box_content_rake {
  position: relative;
  .rake_content_text {
    border: solid 1px red;
    top: 0;
    left: 0;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    display: none;
  }
  .rake_content_text_handle {
    border: solid 1px rgba(0, 0, 0, 0.05);
    font-size: 12px;
  }
}
</style>
