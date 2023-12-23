import MarkdownIt from 'markdown-it'
import taskLists from 'markdown-it-task-lists'
import hljs from 'highlight.js'
export default {
  props: {
    content: {
      type: [String]
    }
  },
  data() {
    return {
      data: null,
      loading: false,
      md: null
    }
  },
  mounted() {},
  methods: {
    convertMarkDownToVue() {
      const vm = this
      try {
        // const vm = this;
        vm.md = MarkdownIt({
          html: false,
          breaks: true,
          linkify: true,
          table: true,
          highlight: function(str, lang) {
            // If lang is specified
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(lang, str).value
              } catch (__) {} // eslint-disable-line
            } else {
            }
            // Plain text
            return vm.md.utils.escapeHtml(str)
          }
        })
        vm.md.use(taskLists, { enabled: false })
        vm.data = vm.md.render(vm.content)
      } catch (e) {
      }
    }
  },
  watch: {
    content: {
      handler(val) {
        // this.data = val
        if (val) {
          this.convertMarkDownToVue()
        }
      },
      deep: true,
      immediate: true
    }
  },
  render() {
    return this.$scopedSlots.default({
      data: this.data
    })
  }
}
