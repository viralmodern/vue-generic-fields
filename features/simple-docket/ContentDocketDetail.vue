<template>
  <BaseContentDocketDetail :document="document">
    <DocketViewPDF v-if="viewPdfModeDocket" />
    <DocketViewText v-if="viewTextModeDocket" />
    <DocketViewWorldCloud v-if="viewWordCloudModeDocket" />
    <DocketViewSummary v-if="viewSummaryModeDocket" />
    <DocketViewPlus v-if="viewPlusModeDocket" />
  </BaseContentDocketDetail>
</template>

<script>
import BaseContentDocketDetail from './BaseContentDocketDetail'
import DocketViewPDF from './components/DocketViewPDF'
import DocketViewWorldCloud from './components/DocketViewWorldCloud'
import DocketViewText from './components/DocketViewText'
import DocketViewSummary from './components/DocketViewSummary'
import DocketViewPlus from './components/DocketViewPlus'
export default {
  name: 'ContentDocketDetail',
  props: {
    document: {},
  },
  components: {
    DocketViewPlus,
    DocketViewSummary,
    DocketViewText,
    DocketViewWorldCloud,
    DocketViewPDF,
    BaseContentDocketDetail,
  },
  computed: {
    viewPdfModeDocket() {
      try {
        return this.$route.query.view === 'pdf'
      } catch (e) {
        return false
      }
    },
    viewTextModeDocket() {
      try {
        return this.$route.query.view === 'text'
      } catch (e) {
        return false
      }
    },
    viewWordCloudModeDocket() {
      try {
        return this.$route.query.view === 'wordcloud'
      } catch (e) {
        return false
      }
    },
    viewSummaryModeDocket() {
      try {
        return this.$route.query.view === 'summary'
      } catch (e) {
        return false
      }
    },
    viewPlusModeDocket() {
      try {
        return this.$route.query.view === 'plus'
      } catch (e) {
        return false
      }
    },
  },
}
</script>

<style scoped></style>
