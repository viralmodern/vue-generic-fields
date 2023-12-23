<template>
  <v-container fluid pt-0>
    <BaseDocumentDetailOdt v-bind="$props" :height="heightFullScreen">
      <template v-slot:HIGHLIGHT_SEARCH_VIEW>
        <ThePanelsDraggable
          :height="height"
          draggable=".panel-item"
          handle=".drag-handler-icon"
        >
          <div class="panel-item">
            <ThePanelResizableBase v-bind="panelsOptions.TEXT_CONTENT">
              <TextViewRangyODT
                v-if="text"
                :session-id="documentId"
                :session-suffix="resultsType"
                :content="text"
                disabled-dialog
                :actions-highlighter="actionsHighlighter"
                @changeAction="changeActionHighlighter"
              />
            </ThePanelResizableBase>
          </div>
          <div class="panel-item">
            <ThePanelResizableBase v-bind="panelsOptions.SEARCH_RESULTS">
              <template v-slot:header>
                <template v-for="l in linksModeSearch">
                  <v-btn v-bind="l.vBind">{{ l.label }}</v-btn>
                </template>
              </template>
              <keep-alive>
                <nuxt-child
                  @click-opinion="clickOpinion"
                  :session-id="documentId"
                  :session-suffix="resultsType"
                />
              </keep-alive>
            </ThePanelResizableBase>
          </div>
          <div class="panel-item">
            <ThePanelResizableBase v-bind="panelsOptions.SUMMARY">
              <v-card v-if="isSearchInDocket" :loading="loadingDocument" flat>
                <v-card-text>
                  <template v-if="hasPhraseDocument">
                    <p v-html="contentSummaryDocket" />
                    <PhraseConcordancePlots
                      :phrase="phrase"
                      :text-content="textContent"
                    />
                    <p></p>
                    <PhraseDocumentMentionPlots
                      :phrase="phrase"
                      :text-content="textContent"
                    />
                  </template>
                </v-card-text>
              </v-card>
              <v-card
                v-else
                tile
                flat
                :loading="loadingDocument"
                min-height="100px"
                min-width="250px"
              >
                <v-card-text v-if="contentSummaryOpinion">
                  <div
                    class="box_content_text"
                    v-html="contentSummaryOpinion"
                  ></div>
                </v-card-text>
              </v-card>
            </ThePanelResizableBase>
          </div>
        </ThePanelsDraggable>
      </template>
    </BaseDocumentDetailOdt>
  </v-container>
</template>

<script>
import ThePanelResizableBase from '~/features/odt/ThePanelResizableBase'
import PhraseConcordancePlots from '~/sat-vue-toolkit/components/VisualWords/PhraseConcordancePlots'
import PhraseDocumentMentionPlots from '~/sat-vue-toolkit/components/VisualWords/PhraseDocumentMentionPlots'
import ThePanelsDraggable from '~/features/odt/ThePanelsDraggable'
import BaseDocumentDetailOdt from '~/features/odt/hoc/BaseDocumentDetailOdt'
import TextViewRangyODT from '~/features/odt/TextViewRangyODT'
import {
  ACTIONS_HIGHLIGHTER,
  DOCUMENT_PANELS,
  DOCUMENT_VIEWS,
} from '@/features/odt/helpers/odt.json'

export default {
  components: {
    TextViewRangyODT,
    BaseDocumentDetailOdt,
    ThePanelsDraggable,
    PhraseDocumentMentionPlots,
    PhraseConcordancePlots,
    ThePanelResizableBase,
  },
  props: {
    documentDetail: {},
    detail: {},
    pdf: {},
    text: {},
    heightFullScreen: {},
  },
  data() {
    return {
      height: '62vh',
      textContent: '',
      phrase: '',
      dark: true,
      loadingDocument: false,
      resultDocketDetail: null,
      resultOpinionDetail: null,
    }
  },
  mounted() {
    let activeSearchPanel = [DOCUMENT_PANELS.HIGHLIGHT_SEARCH_VIEW.name]
    this.$store.commit('uiDocumentDetailOdt/setPanels', activeSearchPanel)
  },
  computed: {
    documentId() {
      let {
        params: { docket, entry, document, tracking, pathMatch },
      } = this.$route
      return `rangy-${tracking}-${pathMatch}-${docket}-${entry}-${document}-selection`
    },
    resultsType() {
      let {
        $route: { name },
      } = this
      let nameDocketSearch = `odt-tracking-all-dockets-docket-entry-document-document-search`
      let nameOpinionSearch = `odt-tracking-all-dockets-docket-entry-document-document-search-opinions`
      let isDocket = nameDocketSearch.localeCompare(name) === 0
      let modeId = isDocket ? `docket-search` : `opinions-search`
      return modeId
    },
    rootPath() {
      let { $$rootPathDocketOdt } = this
      let {
        params: { docket, entry, document },
      } = this.$route
      return `${$$rootPathDocketOdt}/${docket}/${entry}/document/${document}`
    },
    isSearchInDocket() {
      return (
        this.$route.name ===
        'odt-tracking-all-dockets-docket-entry-document-document-search'
      )
      // odt-tracking-all-dockets-docket-entry-document-document-search
    },
    hasPhraseDocument() {
      try {
        return this.textContent && this.phrase
      } catch (e) {
        return false
      }
    },
    contentSummaryDocket() {
      try {
        let { document_number, description, name } = this.resultDocketDetail
        return `${description}, ${name} #${document_number}`
      } catch (e) {
        return false
      }
    },
    contentSummaryOpinion() {
      try {
        let { text } = this.resultOpinionDetail
        return `${text}`
      } catch (e) {
        return false
      }
    },
    linksModeSearch() {
      let { rootPath, $route } = this
      let vBin = {
        exact: true,
        small: true,
        rounded: true,
        depressed: true,
        text: true,
        class: 'caption text-capitalize mr-2',
      }
      return [
        {
          vBind: {
            ...vBin,
            to: {
              path: `${rootPath}/search`,
              query: { ...$route.query },
            },
          },
          label: `inside docket`,
        },
        {
          vBind: {
            ...vBin,
            to: {
              path: `${rootPath}/search/opinions`,
              query: { ...$route.query },
            },
          },
          label: `Opinions results`,
        },
      ]
    },
    panelsOptions() {
      let { dark } = this
      return {
        TEXT_CONTENT: {
          dark,
          label: 'Text Content',
          color: '#2196F3',
        },
        SEARCH_RESULTS: {
          dark,
          label: 'Search Results',
          color: '#2196F3',
        },
        SUMMARY: {
          dark,
          label: 'Summary',
          color: '#FF9800',
        },
      }
    },
    actionsHighlighter() {
      return [
        ACTIONS_HIGHLIGHTER.ANNOTATE,
        ACTIONS_HIGHLIGHTER.SEARCH_NOW,
        ACTIONS_HIGHLIGHTER.COPY_CLIPBOARD,
      ]
    },
  },
  methods: {
    onSelection(content) {
      this.$router.replace({ query: { q: content } })
    },
    changeActionHighlighter({ action, textSelection } = {}) {
      switch (action['NAME']) {
        case ACTIONS_HIGHLIGHTER.SEARCH_NOW.NAME:
          // todo: search now
          this.onSelection(textSelection)
          break
        case ACTIONS_HIGHLIGHTER.COPY_CLIPBOARD.NAME:
          // todo: copy to clipboard
          document.execCommand('copy')
          this.$eventHub.$emit('alert-curd', { text: 'Copied!', type: `info` })
          break
        case ACTIONS_HIGHLIGHTER.ANNOTATE.NAME:
          // todo: redirect to annotate document
          let { rootPath, $route } = this
          this.$router.replace({
            path: `${rootPath}/${DOCUMENT_VIEWS.ANNOTATION.path}`,
            query: {
              ...$route.query,
            },
          })
          break
        default:
          return
      }
    },

    async setContent({ rq, phrase }) {
      this.loadingDocument = true
      this.textContent = null
      this.phrase = null
      this.resultOpinionDetail = null
      try {
        let res = await rq()
        this.textContent = res.text
        this.phrase = phrase
        this.resultDocketDetail = res
      } catch (e) {
        console.log(e.message)
      } finally {
        this.loadingDocument = false
      }
    },
    clickOpinion(data) {
      try {
        this.fetchOpinionDetail(data.item.id)
      } catch (e) {}
    },
    async fetchOpinionDetail(opinion) {
      try {
        this.resultDocketDetail = null
        this.textContent = null
        this.phrase = null
        this.loadingDocument = true
        let res = await this.$api.get(`/api/opinions/${opinion}/`)
        this.resultOpinionDetail = res['data']
      } catch (e) {
      } finally {
        this.loadingDocument = false
      }
    },
  },
  events: {
    concordancePlotsCell(evt, data) {
      this.setContent(data)
    },
    mentionPlotsCell(evt, data) {
      this.setContent(data)
    },
  },
}
</script>

<style scoped lang="scss">
.box_content_text {
  * {
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
}
</style>
<style scoped lang="scss">
.box_content_text {
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;

  * {
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
}
</style>
