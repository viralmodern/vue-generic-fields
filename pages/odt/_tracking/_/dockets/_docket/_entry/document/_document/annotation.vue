<template>
  <v-container fluid pt-0>
    <v-row>
      <v-col cols="8">
        <template v-if="text">
          <TextViewRangyODT
            :session-id="documentId"
            :session-suffix="sessionSuffix"
            disabled-dialog
            :content="text"
            :actions-highlighter="actionsHighlighter"
            @changeAction="changeAction"
            @input="input"
          />
        </template>
      </v-col>
      <v-col cols="4">
        <v-card
          class="left_annotation d-flex flex-column"
          height="70vh"
          flat
          tile
        >
          <v-card class="left_annotation--header" tile>
            <!--<code>{{ `${documentId}-${sessionSuffix}-entries` }}</code>
              <code>{{ documentId }}</code>-->
            <v-subheader>
              Annotations
              <div class="ml-2" v-html="totalAnnotations" />
              <v-spacer />
              <SearchInput v-model="search" placeholder="Annotations" />
            </v-subheader>
          </v-card>
          <v-card class="left_annotation--content overflow-y-auto">
            <template v-for="hl in highlights">
              <ItemAnnotation>
                {{ hl.getText() }}
              </ItemAnnotation>
            </template>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TextViewRangyODT from '~/features/odt/TextViewRangyODT'
import { ACTIONS_HIGHLIGHTER } from '~/features/odt/helpers/odt.json'
import ItemAnnotation from '~/features/odt/ItemAnnotation'
import SearchInput from '~/components/utils/SearchInput'

export default {
  components: { SearchInput, ItemAnnotation, TextViewRangyODT },
  props: {
    linkStyle: {
      type: Object,
      default: () => ({
        small: true,
        text: true,
        rounded: true,
        color: 'primary',
        class: `text-capitalize caption`,
      }),
    },
    documentDetail: {},
    detail: {},
    pdf: {},
    text: {},
    sessionSuffix: {
      default: () => `docket-search`,
    },
    heightFullScreen: {},
  },
  data() {
    return {
      search: '',
      highlights: null,
      actionsHighlighter: [
        ACTIONS_HIGHLIGHTER.HIGHLIGHT,
        ACTIONS_HIGHLIGHTER.ANNOTATE,
      ],
    }
  },
  computed: {
    documentId() {
      let {
        params: { docket, entry, document, tracking, pathMatch },
      } = this.$route
      return `rangy-${tracking}-${pathMatch}-${docket}-${entry}-${document}-selection`
    },
    totalAnnotations() {
      let { highlights } = this
      try {
        let isHighlights = Boolean(highlights.length)
        return (isHighlights && `(<strong>${highlights.length}</strong>)`) || ``
      } catch (e) {
        return false
      }
    },
  },
  methods: {
    input(highlights) {
      console.log(highlights)
      let hls = [...highlights]
      this.highlights = hls.sort((a, b) => b.id - a.id)
    },
    changeAction({ action, textSelection, $$execute, highlighter, evt }) {
      console.log('action, textSelection', {
        action,
        textSelection,
        $$execute,
        highlighter,
        evt,
      })
      // todo: mark annotate
      $$execute()
    },
  },
}
</script>

<style scoped lang="scss">
.left_annotation {
  position: sticky;
  top: 80px;
  &--content {
  }
}
</style>
