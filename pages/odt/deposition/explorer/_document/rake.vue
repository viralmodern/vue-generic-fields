<template>
  <v-row>
    <v-col cols="9">
      <RakeViewODT v-if="detail" :content="detail.text" :rakes="rakeDetail" />
    </v-col>
    <v-col cols="3">
      <ThumbListRake v-if="detail" :rakes="rakeDetail" />
    </v-col>
  </v-row>
</template>

<script>
import RakeViewODT from '~/features/odt/RakeViewODT'
import ThumbListRake from '~/features/odt/ThumbListRake'
export default {
  components: { ThumbListRake, RakeViewODT },
  props: {
    detail: {},
  },
  data() {
    return {
      rakeDetail: [],
    }
  },
  mounted() {
    this.fetchRakeDetail()
  },
  methods: {
    async fetchRakeDetail() {
      try {
        let res = await this.$api.get('/api/opinions/4545223/rake/')
        this.rakeDetail = res['data']
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
