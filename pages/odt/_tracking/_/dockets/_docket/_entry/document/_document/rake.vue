<template>
  <v-container fluid pt-0>
    <BaseDocumentDetailOdt :height="heightFullScreen">
      <template v-slot:DOCUMENT_VIEW>
        <v-card tile flat :loading="loading">
          <slot name="breadcrumbs" />
          <v-row>
            <v-col cols="9" class="pt-0">
              <RakeViewODT v-if="text" :content="text" :rakes="rakeDetail" />
            </v-col>
            <v-col cols="3" class="pt-0">
              <v-card
                tile
                flat
                outlined
                max-height="80vh"
                color="rgba(0,0,0,0.05)"
                class="overflow-y-auto"
              >
                <ThumbListRake v-if="detail" :rakes="rakeDetail" />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </BaseDocumentDetailOdt>
  </v-container>
</template>

<script>
import RakeViewODT from '~/features/odt/RakeViewODT'
import ThumbListRake from '~/features/odt/ThumbListRake'
import BaseDocumentDetailOdt from '~/features/odt/hoc/BaseDocumentDetailOdt'

export default {
  components: { BaseDocumentDetailOdt, ThumbListRake, RakeViewODT },
  props: {
    pdf: {},
    text: {},
    detail: {},
    heightFullScreen: {},
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
        const {
          params: { docket, entry, document },
        } = this.$route
        this.loading = true
        let res = await this.$api.get(
          `/api/dockets/${docket}/docket-entries/${entry}/documents/${document}/rake/`
        )
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
