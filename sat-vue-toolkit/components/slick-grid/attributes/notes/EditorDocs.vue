<template>
  <div class="example" id="scrolling-container">
    <div>
      <quillEditor
        class="editor"
        ref="myTextEditor"
        :value="content"
        :options="editorOption"
        @change="onEditorChange"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
    </div>
   <!-- <div class="output code">
      <code class="hljs" v-html="contentCode"></code>
    </div>
    <div class="output ql-snow">
      <div class="ql-editor" v-html="content"></div>
    </div>
    <div class="ql-bubble" style="border: solid 1px red">
      {{content}}
    </div>-->
    <!--<div class="output ql-snow">
      <div class="ql-editor" v-html="content"></div>
    </div>-->
  </div>
</template>

<script>

  import "quill-mention"
  import "quill-mention/dist/quill.mention.min.css"

  import dedent from 'dedent'
  import hljs from 'highlight.js'
  import debounce from 'lodash/debounce'
  import { quillEditor } from 'vue-quill-editor'
  // highlight.js style
  import 'highlight.js/styles/tomorrow.css'
  // import theme style
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    name: "EditorDocs",
    components: {quillEditor},
    props: {
      value: {}
    },
    data () {
      const vm = this
      return {
        quill: null,
        users: [
          { id: 1, value: "Fredrik Sundqvist" },
          { id: 2, value: "Patrik Sjölin" }
        ],
        hasTags: [
          { id: 3, value: "Fredrik Sundqvist 2" },
          { id: 4, value: "Patrik Sjölin 2" }
        ],
        submitOnEnter: true,
        crtDelta: "",
        content: ``,
        editorOption: {
          // theme: 'bubble',
          theme: "snow",
          bounds: '#scrolling-container',
          placeholder: 'Insert content here...',
          scrollingContainer: '#scrolling-container',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            },
            mention: {
              allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
              mentionDenotationChars: ["@", "#"],
              source: function (searchTerm, renderList, mentionChar) {
                let values

                if (mentionChar === "@") {
                  values = vm.users
                } else {
                  values = vm.hasTags
                }

                if (searchTerm.length === 0) {
                  renderList(values, searchTerm)
                } else {
                  const matches = []
                  for (let i = 0; i < values.length; i++) {
                    if (
                      ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
                    ) {
                      matches.push(values[i])
                    }
                  }
                  renderList(matches, searchTerm)
                }
              }
            }
          }
        },
      }
    },
    mounted () {
    },
    computed: {
      getContent () {
        try {
          return this.$refs.myTextEditor.quill.getContents()
        } catch (e) {
          return ""
        }
      },
      getText () {
        try {
          return this.quill.getText()
        } catch (e) {
          return ""
        }
      },
      editor() {
        return this.$refs.myTextEditor.quill
      },
      contentCode() {
        return hljs.highlightAuto(this.content).value
      }

    },
    methods: {

      disableEditor () {
        try {
          // this.quill.enable(false)
        } catch (e) {
          throw e.message
        }
      },
      onEditorChange: debounce(function(value) {
        this.content = value.html
        let editor = value.quill
        let ops = editor.getContents()
        let val = ops['ops']
        this.$emit('input', JSON.stringify(val))
      }, 466),
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
        // JSON.stringify(a.ops)

      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(v) {

          try {
            // setContents
            if(this.$refs.myTextEditor) {
              if(v) {
                let currentContents = this.$refs.myTextEditor.quill.getContents()
                currentContents = JSON.stringify(currentContents.ops)
                console.error('WATCH', { v, currentContents })
                if(currentContents.localeCompare(v) === 0) return
                let val = JSON.parse(v)
                let results = []
                if(val.hasOwnProperty('ops')) {
                  results = [...val['ops']]
                }else {
                  results = val
                }
                this.$refs.myTextEditor.quill.setContents(results)
              }else {
                this.$refs.myTextEditor.quill.setContents([])
              }
            }

          }catch (e) {
            this.$refs.myTextEditor.quill.setContents([])
          }
        }
      }
    },
    beforeDestroy () {
      this.content = ''
      this.$refs.myTextEditor.quill.setContents([])
    }
  }
</script>

<style lang="scss">
  .ql-mention-list {
    padding-left: 0px !important;
  }
  #scrolling-container {
    .quill-editor {
      .ql-editor {
        min-height: 25vh;
      }
    }
  }

</style>
<style scoped lang="scss">
  #scrolling-container {
    border: solid 1px rgba(0,0,0,0.1);
    .quill-editor {
      .ql-editor {
        border: solid 1px red;
        min-height: 25vh;
      }
    }
  }
</style>
