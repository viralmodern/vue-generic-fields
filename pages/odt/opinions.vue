<template>
  <div class="fill-height">
    <TopBarOpinionsODT :opinion="opinion" />
    <nuxt-child />
  </div>
</template>

<script>
import TopBarOpinionsODT from '~/features/odt/TopBarOpinionsODT'
import { opinionDetail, mutations } from '~/features/odt/store/opinionOdtDetail'
export default {
  name: 'options',
  components: { TopBarOpinionsODT },
  head() {
    return {
      title: 'All Opinions',
    }
  },
  created() {
    mutations.updateDetail(null)
  },
  computed: {
    opinion() {
      return opinionDetail.data
    },
  },
}
</script>

<style scoped></style>
