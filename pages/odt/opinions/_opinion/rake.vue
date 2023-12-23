<template>
  <v-card flat tile :loading="loading">
    <RakeViewODT :content="detail.text" :rakes="rakes" />
  </v-card>
</template>

<script>
import RakeViewODT from '~/features/odt/RakeViewODT'
export default {
  components: { RakeViewODT },
  props: {
    detail: {},
  },
  data() {
    return {
      rakes: [],
      loading: false,
    }
  },
  mounted() {
    this.fetchRake()
  },
  methods: {
    async fetchRake() {
      try {
        const {
          params: { opinion },
        } = this.$route
        this.loading = true
        let res = await this.$api.get(`/api/opinions/${opinion}/rake/`)
        this.rakes = res['data']
        this.$emit('updateRakes', res['data'])
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped></style>
