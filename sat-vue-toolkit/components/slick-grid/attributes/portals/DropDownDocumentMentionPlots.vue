<template>
  <v-menu
    max-width="550px" max-height="300px"
    v-model="showMenu"
    :position-x="x"
    :position-y="y"
    absolute
    offset-y
    :close-on-content-click="false">
    <v-card tile :loading="loading" :disabled="loading" width="400px">
      <v-card-text>
        <PhraseDocumentMentionPlots v-if="document && !loading"
                                    :phrase="phrase"
                                    :text-content="textContent"/>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
  import PhraseDocumentMentionPlots from "@/sat-vue-toolkit/components/VisualWords/PhraseDocumentMentionPlots"

  export default {
    name: "DropDownDocumentMentionPlots",
    components: { PhraseDocumentMentionPlots },
    data () {
      return {
        showMenu: false,
        x: 0,
        y: 0,
        row: null,
        options: null,
        document: null,
        loading: false
      }
    },
    computed: {
      disabledDialogPhrase() {
        try {
          return this.options.disabledDialogPhrase
        }catch (e) {
          return false
        }
      },
      endPoint () {
        try {
          let idRow = this.row.pk
          return `${this.options.endPoint}/${idRow}`
        } catch (e) {
          return false
        }
      },
      phrase () {
        try {
          return `${this.options.phrase}`
        } catch (e) {
          return false
        }
      },
      textContent () {
        try {
          return this.document.text
        } catch (e) {
          return false
        }
      }

    },
    events: {
      getMentionPlots (evt, data) {
        this.setOptions(data)
        this.show(data.event)
      }
    },
    methods: {
      setOptions ({ row, options }) {
        this.row = row
        this.options = options
      },
      show (e) {
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(async () => {
          if(!this.disabledDialogPhrase) {
            this.showMenu = true
            await this.fetchDocumentDetail()
          }else {
            this.$trigger('mentionPlotsCell', { phrase: this.phrase, rq: this.fetchDocumentDetail })
          }
        })
      },
      async fetchDocumentDetail () {
        try {
          this.loading = true
          let res = await this.$api.get(`${this.endPoint}`)
          this.document = res["data"]
          return Promise.resolve(res["data"])
        } catch (e) {
          return Promise.resolve(false)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
