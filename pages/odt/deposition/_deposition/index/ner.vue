<template>
  <v-card tile flat :loading="loading">
    <v-row>
      <v-col cols="9">
        <NerViewODT v-if="content" :content="content" />
      </v-col>
      <v-col cols="3">
        <ThumbListNer v-if="content && ents" :ents="ents" />
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
        this.loading = true
        let res = await this.$api.get('/api/opinions/4545223/ner/')
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
