<template>
  <v-card :flat="true" tile :loading="loading" min-height="350px">
    <v-card-title>
      <v-spacer />
      <btn-link
        :input-value="true"
        @click="toggleMask"
        :label="mask ? `Hide all` : `Show all`"
      />
    </v-card-title>
    <div class="px-3">
      <NerCoreferenceResolution v-if="detail" :ner="detail" />
    </div>
  </v-card>
</template>

<script>
import NerCoreferenceResolution from '~/features/odt/NerCoreferenceResolution'
import BtnLink from '~/sat-vue-toolkit/components/BtnLink'
export default {
  components: { BtnLink, NerCoreferenceResolution },
  head() {
    return {
      title: 'Coreference Resolution',
    }
  },

  data() {
    return {
      mask: true,
      loading: false,
      detail: null,
    }
  },
  mounted() {
    this.fetchNerDetail()
  },
  methods: {
    async fetchNerDetail() {
      try {
        this.loading = true
        let {
          params: { docket, entry, document },
        } = this.$route
        let endPoint = `/api/dockets/${docket}/docket-entries/${entry}/documents/${document}/coreference-resolution/`
        let res = await this.$api.get(endPoint)
        this.detail = res['data']
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    toggleMask() {
      try {
        let mask = this.mask
        let elm = document.getElementById(
          'all-npl-content-coreference-resolution'
        )
        if (mask) {
          elm.classList.add('not-show-all')
        } else {
          elm.classList.remove('not-show-all')
        }
        this.mask = !mask
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
