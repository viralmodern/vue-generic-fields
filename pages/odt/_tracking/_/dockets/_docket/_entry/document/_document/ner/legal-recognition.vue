<template>
  <v-card tile flat :loading="loading">
    <v-row>
      <v-col cols="9" class="py-0">
        <NerViewODT v-if="content" :content="content" />
      </v-col>
      <v-col cols="3" class="py-0">
        <v-card
          tile
          flat
          outlined
          max-height="80vh"
          color="rgba(0,0,0,0.05)"
          class="overflow-y-auto overflow-x-hidden"
        >
          <ThumbListNer
            title="Legal Recognition"
            v-if="content && ents"
            :ents="ents"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import NerViewODT from '~/features/odt/NerViewODT'
import ThumbListNer from '~/features/odt/ThumbListNer'

export default {
  components: { ThumbListNer, NerViewODT },
  props: {
    pdf: {},
    text: {},
    detail: {},
  },
  data() {
    return {
      ents: null,
      content: null,
      loading: false,
    }
  },
  mounted() {
    this.fetchNerDetail()
  },
  methods: {
    async fetchNerDetail() {
      try {
        const {
          params: { docket, entry, document },
        } = this.$route
        this.loading = true
        let res = await this.$api.get(
          `/api/dockets/${docket}/docket-entries/${entry}/documents/${document}/legal-ner/`
        )
        this.ents = res['data']['ents']
        this.content = res['data']['html']
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped></style>
