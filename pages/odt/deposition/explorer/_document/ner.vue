<template>
  <div>
    <v-row>
      <v-col cols="9">
        <NerViewODT v-if="content" :content="content" />
      </v-col>
      <v-col cols="3">
        <ThumbListNer v-if="content && ents" :ents="ents" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NerViewODT from '~/features/odt/NerViewODT'
import ThumbListNer from '~/features/odt/ThumbListNer'

export default {
  components: { ThumbListNer, NerViewODT },
  props: {
    detail: {},
  },
  data() {
    return {
      ents: null,
      content: null,
    }
  },
  mounted() {
    this.fetchNerDetail()
  },
  methods: {
    async fetchNerDetail() {
      try {
        let res = await this.$api.get('/api/opinions/4545223/ner/')
        this.ents = res['data']['ents']
        this.content = res['data']['html']
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
