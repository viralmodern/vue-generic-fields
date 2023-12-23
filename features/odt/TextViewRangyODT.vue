<template>
  <div>
    <template v-if="content">
      <TextRangy
        @input="(highlights) => $emit('input', highlights)"
        :session-id="sessionId"
        :session-suffix="sessionSuffix"
        :text-content="content"
        :actions-highlighter="actionsHighlighter"
        @changeAction="changeAction"
      />
    </template>
  </div>
</template>

<script>
import mxDelegatingLinkDocument from './mixins/mxDelegatingLinkDocument'
import TextRangy from '~/features/odt/TextRangy'

export default {
  name: 'TextViewRangyODT',
  props: {
    content: {
      default: () => '',
    },
    disabledDialog: {
      type: Boolean,
      default: () => false,
    },
    sessionId: {
      type: String,
      default: () => ``,
    },
    sessionSuffix: {
      type: String,
      default: () => ``,
    },
    actionsHighlighter: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    TextRangy,
  },
  data() {
    return {}
  },
  mixins: [mxDelegatingLinkDocument],
  methods: {
    changeAction(data) {
      this.$emit('changeAction', data)
    },
  },
}
</script>

<style scoped></style>
<style lang="scss"></style>
