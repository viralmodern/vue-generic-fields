<template>
  <v-card tile flat :loading="loading">
    <v-row>
      <v-col cols="9">
        <RakeViewODT v-if="detail" :content="detail.text" :rakes="rakeDetail" />
      </v-col>
      <v-col cols="3">
        <ThumbListRake v-if="detail" :rakes="rakeDetail" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import RakeViewODT from '~/features/odt/RakeViewODT'
import ThumbListRake from '~/features/odt/ThumbListRake'
export default {
  components: { ThumbListRake, RakeViewODT },
  props: {
    pdf: {},
    text: {},
    detail: {},
  },
  data() {
    return {
      rakeDetail: [],
      loading: false,
    }
  },
  mounted() {
    this.fetchRakeDetail()
  },
  methods: {
    async fetchRakeDetail() {
      try {
        this.loading = true
        let res = await this.$api.get('/api/opinions/4545223/rake/')
        this.rakeDetail = res['data']
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped></style>
