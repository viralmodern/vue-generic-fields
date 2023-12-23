<template>
  <v-container>
    <div>
      <v-text-field label="Key Word" v-model.trim="text" />
      <v-textarea label="Text Content" v-model.trim="textContent" />
      <v-card class="box_plots">
        <v-card-subtitle
          class="text-sm-right caption"
          v-html="`Concordance Plots Total: ${position.length}`"
        ></v-card-subtitle>
        <v-card-text>
          <div class="box_plots_content">
            <template v-for="(pos, index) in position">
              <div
                :key="index"
                class="item_plot"
                :title="pos.keyword"
                @mouseover="onmouseover($event, pos, index)"
                :style="{ left: `${pos.percent}%`, background: `${pos.color}` }"
              >
                {{ pos.keyword }}
              </div>
            </template>
          </div>
          <div class="box_plots_hover mt-2">
            <p class="ma-0 caption text-transform-hover" v-html="textHover"></p>
          </div>
        </v-card-text>
      </v-card>
      <div class="mb-4"></div>
      <v-card>
        <v-card-subtitle class="text-sm-right"
          >Mention Passages:
          <strong>{{ sentences.length }}</strong></v-card-subtitle
        >
        <v-card-text>
          <template v-for="(st, index) in sentences">
            <div
              :key="index"
              style="border: solid 1px rgba(0, 0, 0, 0.05);"
              :class="{ 'mt-4': index !== 0 }"
              class="pa-2"
            >
              <p class="ma-0" v-html="st.sentences" />
            </div>
          </template>
        </v-card-text>
      </v-card>
      <div class="mb-4"></div>
      <v-card>
        <v-card-subtitle class="text-sm-right"
          >Results highlight</v-card-subtitle
        >
        <v-card-text>
          <p class="ma-0" v-html="textHover"></p>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
const colors = ['rgb(255, 111, 0)', 'rgb(255, 143, 0)', 'rgb(255, 179, 0)']
// const regexExtractSentences = (keyword) => "[A-Z][^\\\\.;]*("+keyword+")[^\\\\.;]*"
const regexExtractSentences = (keyword) =>
  '[^A-Z][^\\\\.;]*(' + keyword + ')[^\\\\.;]*'
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
  data() {
    return {
      textContent: 'lorem',
      position: [],
      sentences: [],
      phrase: 'hare',
      textHover: '',
    }
  },
  mounted() {
    this.testRegx()
  },
  computed: {
    text: {
      get() {
        return this.phrase
      },
      set(v) {
        this.phrase = v
        this.testRegx(v)
      },
    },
  },
  methods: {
    testRegx(v) {
      let modeWords = true
      modeWords = false
      let position = [],
        phrase = v || this.text
      let totalPhrase = phrase.length
      if (!totalPhrase) {
        return
      }
      let words = phrase.split(' ')
      const str = this.textContent
      if (modeWords) {
        // todo get all words
        words.forEach((word) => {
          let results = getResults(str, word, str.length)
          position = [...position, ...results]
        })
      } else {
        // todo get phrase
        let results = getResults(str, phrase, str.length)
        position = [...position, ...results]
      }
      // todo get extract sentences
      let sentences = getResults(
        str,
        regexExtractSentences(phrase),
        str.length,
        'gmi'
      )
      sentences = sentences.map((st) => {
        let temp = { ...st }
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
      let marks = textHoverElm.querySelectorAll(
        '.text-transform-hover .hl-text'
      )
      marks = Array.from(marks)
      try {
        marks[index].scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'center',
        })
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss">
.hl-text {
}
.text-transform-hover::-webkit-scrollbar {
  height: 1px;
  width: 1px;
  opacity: 0;
}
</style>
<style scoped lang="scss">
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
    overflow: hidden;
    .text-transform-hover {
      white-space: nowrap;
      /*display: inline-block;*/
      /*overflow-x: auto;*/
      transition: all 0.25s linear;
    }
  }
}
</style>
