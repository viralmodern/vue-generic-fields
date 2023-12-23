<template>
  <v-card>
    <template v-if="enableSetting">
      <v-card-text>
        <div class="demo-rangy-content">
          <div class="form-handler">
            <h3>Highlighter</h3>
            <p>
              Make a selection in the document and use the buttons below to
              highlight and unhighlight.
            </p>
            <div class="d-flex flex-wrap">
              <v-btn
                @click="highlightSelectedText"
                small
                depressed
                class="caption text-capitalize mb-1"
                v-text="'Highlight selection'"
              />
              <div class="mx-1"></div>
              <v-btn
                @click="noteSelectedText"
                small
                depressed
                class="caption text-capitalize mb-1"
                v-text="`Add note to selection`"
              />
              <div class="mx-1"></div>
              <v-btn
                @click="removeHighlightFromSelectedText"
                small
                depressed
                class="caption text-capitalize mb-1"
                v-text="`Remove highlights from selection`"
              />
            </div>
            <div>
              <v-btn
                @click="highlightScopedSelectedTextLegal"
                small
                depressed
                class="caption text-capitalize mb-1"
                v-text="`Highlight within outlined paragraph Legal`"
              />
              <div class="mx-1"></div>
              <v-btn
                @click="noteScopedSelectedTextLegal"
                small
                depressed
                class="caption text-capitalize mb-1"
                v-text="`Annotate selection within outlined paragraph Legal`"
              />
            </div>
            <div class="mb-4"></div>
            <v-form @submit.prevent="reloadPage">
              <h3>
                <p>Preserving highlights between page requests</p>
              </h3>
              <p>
                Highlights can be preserved between page requests. Press the
                following button to reload the page with the highlights
                preserved:
              </p>
              <input
                type="hidden"
                name="serializedHighlights"
                :value="highlighterSerialize"
              />
              <v-btn
                type="submit"
                v-text="`Save`"
                small
                depressed
                class="caption text-capitalize"
              />
            </v-form>
          </div>
        </div>
      </v-card-text>
      <v-card-text>
        <code>{{ highlighterSerialize }}</code>
      </v-card-text>
    </template>
    <v-card-text>
      <!--      <div @click="removeAllHighlights">remove All Highlights</div>-->
      <v-btn @click="restoreSelection">Restore Selection</v-btn>
      <template v-if="textContent">
        <div
          :id="sessionId"
          ref="textContent"
          class="content-editor"
          v-html="textContent"
          @click="openOptions"
        ></div>
      </template>
    </v-card-text>
    <MenuOptionsAbsolute absolute offset-y v-model="activatorId">
      <v-card>
        <v-list dense>
          <template v-for="(action, index) in reduceActionsHighlighter">
            <v-list-item
              dense
              @click="changeAction(action, $event)"
              :key="action.NAME"
            >
              <v-list-item-icon>
                <v-icon>{{ action.ICON }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ action.LABEL }}
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </MenuOptionsAbsolute>
  </v-card>
</template>

<script>
import MenuOptionsAbsolute from '@/sat-vue-toolkit/components/MenuOptionsAbsolute.vue'
import { getSESSION, setSESSION } from '~/utils'

const $$path = `/js/rangy`
const scripts = {
  RANGY_CORE: `${$$path}/rangy-core.min.js`,
  // RANGY_CORE: "https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-core.min.js",
  RANGY_CLASS_APPLIER: `${$$path}/rangy-classapplier.js`,
  // RANGY_CLASS_APPLIER: "https://rawgit.com/timdown/rangy/master/lib/rangy-classapplier.js",
  RANGY_HIGHLIGHTER: `${$$path}/rangy-highlighter.js`,
  // RANGY_HIGHLIGHTER: "https://rawgit.com/timdown/rangy/master/lib/rangy-highlighter.js",
  RANGY_SELECTION_SAVE_RESTORE: `${$$path}/rangy-selectionsaverestore.min.js`,
  // RANGY_HIGHLIGHTER: "https://rawgit.com/timdown/rangy/master/lib/rangy-highlighter.js",
}
const saveSelection = function () {
  const selection = window.getSelection()
  return selection.rangeCount === 0 ? null : selection.getRangeAt(0)
}

// Restore the selection
// `range` is a `Range` object
const restoreSelection = function (range) {
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}

export default {
  components: { MenuOptionsAbsolute },
  props: {
    textContent: {
      type: String,
      default: () => ``,
    },
    sessionId: {
      type: String,
      default: () => `serialize`,
    },
    sessionSuffix: {
      type: String,
      default: () => ``,
    },
    enableSetting: {
      type: Boolean,
      default: () => false,
    },
    actionsHighlighter: {
      type: Array,
      default: () => [],
    },
  },
  name: 'TextRangy',
  data() {
    return {
      highlighter: null,
      activatorId: null,
      textSelection: null,
      rangeSelection: null,
      savedSelection: null,
      allHighlights: null,
    }
  },
  async mounted() {
    await this.loadScripts()
    await this.rangyHandler()
    this.$watch('sessionSuffix', this.reInitRangy)
  },
  watch: {
    highlights: {
      immediate: true,
      handler(highlights) {
        if (Boolean(highlights)) {
          let hls = [...highlights]
          this.$emit('input', hls)
        }
      },
    },
  },
  computed: {
    highlighterSerialize() {
      try {
        return this.highlighter.serialize()
      } catch (e) {
        return false
      }
    },
    highlights() {
      try {
        return this.highlighter.highlights
      } catch {
        return false
      }
    },
    reduceActionsHighlighter() {
      return [...this.actionsHighlighter]
    },
    sessionIdReduce() {
      let { sessionId, sessionSuffix } = this
      let isSessionSuffix = Boolean(sessionSuffix)
      let suffix = isSessionSuffix ? `-${sessionSuffix}` : ``
      return `${sessionId}${suffix}`
    },
    sessionEntries() {
      let { sessionIdReduce } = this
      return `${sessionIdReduce}-entries`
    },
  },
  events: {
    $pinEntity(evt, { response } = {}) {
      this.restoreSelection()
      this.noteScopedSelectedTextLegal()
      this.handleSaveEntry(response)
    },
  },
  methods: {
    async loadScripts() {
      // As an instance method inside a component
      await this.$loadScript(scripts.RANGY_CORE)
      await this.$loadScript(scripts.RANGY_CLASS_APPLIER)
      await this.$loadScript(scripts.RANGY_HIGHLIGHTER)
      await this.$loadScript(scripts.RANGY_SELECTION_SAVE_RESTORE)
      return Promise.resolve(1)
    },

    openOptions(e) {
      e.preventDefault()
      let text = document.getSelection().toString()
      text = text.trim()
      if (!text.length) {
        return
      }
      this.saveSelection()
      this.textSelection = text
      this.activatorId = e
    },
    saveSelection() {
      /*let { savedSelection } = this
      if (savedSelection) {
        rangy.removeMarkers(savedSelection)
      }
      this.savedSelection = rangy.saveSelection()
      */
      this.savedSelection = saveSelection()
    },
    restoreSelection() {
      /*let { savedSelection } = this
      if (savedSelection) {
        rangy.restoreSelection(savedSelection)
        this.savedSelection = null
      }*/
      restoreSelection(this.savedSelection)
    },
    handleSaveEntry(entry) {
      // todo Save entries user mark pinned
      let { sessionEntries } = this
      let entries = getSESSION(sessionEntries) || []
      let rowId = (entry.hasOwnProperty('pk') && `pk`) || `id`
      if (Boolean(entries)) {
        if (entry['pinned']) {
          // add
          entries.push(entry)
        } else {
          // remove
          entries = entries.filter((et) => et[rowId] != entry[rowId])
        }
      }
      setSESSION(sessionEntries, entries)
    },
    saveSerializeSession() {
      let { sessionIdReduce } = this
      let serialize = this.highlighter.serialize()
      setSESSION(sessionIdReduce, serialize)
    },
    reInitRangy() {
      // todo: clear all highlight before init
      this.removeAllHighlights()
      let serializedHighlights = getSESSION(this.sessionIdReduce)
      if (serializedHighlights) {
        this.highlighter.deserialize(serializedHighlights)
      }
    },
    rangyHandler() {
      try {
        let self = this
        /*let { textContent } = this,
          self = this
        if (!Boolean(textContent)) {
          return
        }*/
        // let serializedHighlights = decodeURIComponent(window.location.search.slice(window.location.search.indexOf("=") + 1))
        // let serializedHighlights = $route.query.serializedHighlights
        // let serializedHighlights = getSESSION(self.sessionId)
        let serializedHighlights = getSESSION(self.sessionIdReduce)
        rangy.init()
        this.highlighter = rangy.createHighlighter()

        this.highlighter.addClassApplier(
          rangy.createClassApplier('highlight', {
            ignoreWhiteSpace: true,
            tagNames: ['span', 'a'],
          })
        )
        this.highlighter.addClassApplier(
          rangy.createClassApplier('note', {
            ignoreWhiteSpace: true,
            elementTagName: 'span',
            elementProperties: {
              href: '#',
              onclick: function () {
                let highlight = self.highlighter.getHighlightForElement(this)
                let textHighlight = highlight.getText()
                let idHighlight = highlight.id
                let strConfirm = `Delete this note: ${textHighlight} (ID ${idHighlight})?`
                if (window.confirm(strConfirm)) {
                  self.highlighter.removeHighlights([highlight])
                }
                return false
              },
            },
            elementAttributes: {
              hello: 25,
            },
            onElementCreate: function (el, hl) {},
          })
        )
        if (serializedHighlights) {
          this.highlighter.deserialize(serializedHighlights)
        } else {
          console.log('no data')
        }
      } catch (e) {
        console.error('RENDER', e.message)
      }
    },
    highlightSelectedText() {
      this.highlighter.highlightSelection('highlight')
    },
    noteSelectedText() {
      this.highlighter.highlightSelection('note')
    },
    removeHighlightFromSelectedText() {
      this.highlighter.unhighlightSelection()
    },
    highlightScopedSelectedTextLegal() {
      this.highlighter.highlightSelection('highlight', {
        containerElementId: this.sessionId,
      })
    },
    noteScopedSelectedTextLegal() {
      this.highlighter.highlightSelection('note', {
        containerElementId: this.sessionId,
        exclusive: false,
      })
    },
    removeAllHighlights() {
      this.highlighter.removeAllHighlights()
    },

    reloadPage(evt) {
      return false
    },
    changeAction(action, evt) {
      let textSelection = this.textSelection,
        $$execute = () => {
          this.noteScopedSelectedTextLegal()
          this.saveSerializeSession()
        },
        highlighter = this.highlighter
      this.$emit('changeAction', {
        action,
        textSelection,
        $$execute,
        highlighter,
        evt,
      })
    },
  },
}
</script>
<style lang="scss">
.content-editor {
  .highlight {
    background-color: yellow;
  }
  .note {
    background-color: #ffa000;
  }

  #summary {
    border: dotted orange 1px;
  }
  pre {
    white-space: break-spaces;
  }
}
.form-handler {
  .note {
    background-color: #80cbc4;
  }
}
.demo-rangy-content {
  .highlight {
    background: yellow;
    color: #000000;
  }
}
</style>
<style lang="scss" scoped>
.content-editor {
}
</style>
