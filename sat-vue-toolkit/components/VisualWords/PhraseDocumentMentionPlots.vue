<template>
    <div>
      <div class="text-content-plots" ref="text-content-plots" v-html="textContent"></div>
      <v-card flat tile>
        <v-card-subtitle class="text-sm-right px-0 pt-0">
          Mention Passages: <strong>{{sentences.length}}</strong>
        </v-card-subtitle>
        <v-card-text class="px-0">
          <template v-for="(st, index) in sentences">
            <div :key="index"
                 style="border: solid 1px rgba(0,0,0,0.05)"
                 :class="{'mt-4': index !== 0}"
                 class="pa-2">
              <p class="ma-0 caption" v-html="st.sentences"/>
            </div>
          </template>

        </v-card-text>
      </v-card>
    </div>
</template>

<script>
  const colors = ['rgb(255, 111, 0)', 'rgb(255, 143, 0)', 'rgb(255, 179, 0)']
  // const regexExtractSentences = (keyword) => "[A-Z][^\\\\.;]*("+keyword+")[^\\\\.;]*"
  const regexExtractSentences = (keyword) => "[^A-Z][^\\\\.;]*("+keyword+")[^\\\\.;]*"

  const getResults = (str = '', keyWord, total, flags = 'gim') => {
    const regex = new RegExp(keyWord, flags)
    let m,
      position = []
    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      let temp = {}
      // console.log(m)
      total = total || m['index']
      temp['index'] = m['index']
      temp['keyword'] = m[0]
      temp['groups'] = m['groups']
      let percent = (m['index'] / total) * 100
      percent = Math.round(percent * 10 + Number.EPSILON) / 10
      temp['percent'] = percent
      temp['total'] = total
      temp['color'] = colors[Math.floor(Math.random() * 3)]
      position.push(temp)
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }
    }
    return position
  }
  const getHighlightText = (str, phrase) => {
    let regx = new RegExp(phrase, 'gmi')
    let textHover = str.replace(regx, `<mark class="hl-text">${phrase}</mark>`)
    return textHover
  }
  export default {
    name: "PhraseDocumentMentionPlots",
    props: {
      textContent: {
        type: String,
        default: () => ''
      },
      phrase: {
        type: String,
        default: () => ''
      },

    },
    data() {
      return {
        position: [],
        sentences: [],
        textHover: '',
      }
    },
    mounted() {
      this.testRegx()
    },
    watch: {

    },
    methods: {
      testRegx(v) {
        let modeWords = true
         modeWords = false
        let position = [],
          phrase = v || this.phrase
        let totalPhrase = phrase.length
        if (!totalPhrase) {
          return
        }
        let words = phrase.split(' ')
        // const str = this.textContent
        // let textContent = document.querySelector('.text-content-plots').textContent
        let textContent = this.$refs['text-content-plots'].textContent
        let str = textContent.replace(/(?:\r\n|\r|\n)/gmi, ' ').replace(/ +(?= )/g,'');
        str = str.trim()
        if(modeWords) {
          // todo get all words
          words.forEach((word) => {
            let results = getResults(str, word, str.length)
            position = [...position, ...results]
          })
        }else {
          // todo get phrase
          let results = getResults(str, phrase, str.length)
          position = [...position, ...results]
        }
        // todo get extract sentences
        let sentences = getResults(str, regexExtractSentences(phrase), str.length, 'gmi')
        console.log({rgx: regexExtractSentences(phrase), str, getResults})
        sentences = sentences.map(st => {
          let temp = {...st}
          temp['sentences'] = getHighlightText(st.keyword, phrase)
          return temp
        })
        this.sentences = sentences
        let textHover = getHighlightText(str, phrase)
        this.position = position
        this.textHover = textHover
      },
      onmouseover(evt, pos, index) {
        let textHoverElm = document.querySelector('.text-transform-hover')
        // textHoverElm.style.transform = `translateX(${-percent}%)`
        let marks = textHoverElm.querySelectorAll('.text-transform-hover .hl-text')
        marks = Array.from(marks)
        try {
          marks[index].scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
        }catch (e) {

        }
      },
    },
  }
</script>

<style lang="scss">
  .hl-text {
    /*border: solid 1px red;*/
    /*background: rgb(255, 111, 0);*/
  }
  .box_plots {
    .box_plots_hover {
      .text-transform-hover {
        *, pre {
          white-space: nowrap;
        }
      }
    }
  }
</style>
<style scoped lang="scss">
  .text-content-plots {
    font-size: 0px;
    overflow: hidden;
    width: 0px;
    height: 0px;
  }
  .box_plots {
    width: 400px;
    width: 100%;
    .box_plots_content {
      height: 100px;
      width: 100%;
      border: solid 1px rgba(0, 0, 0, 0.05);
      position: relative;
      .item_plot {
        position: absolute;
        width: 5px;
        height: 100%;
        cursor: pointer;
        border-right: solid 1px white;
        font-size: 0px;
      }
    }
    .box_plots_hover {
      width: 100%;
      /*border: solid 1px blue;*/
      overflow: hidden;
      .text-transform-hover {
        /*border: solid 1px red;*/
        white-space: nowrap;
        transition: all 0.25s linear;
        overflow-x: auto;
        *, pre {
          white-space: nowrap;
        }
      }
    }
  }
</style>

