<template>
  <div>
    <TopBarOfTableOdt :tabs="subOfJudge" disabled-setting />
    <nuxt-child />
  </div>
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
export default {
  components: { TopBarOfTableOdt },
  computed: {
    subOfJudge() {
      let {
        $route: {
          query,
          params: { judge },
        },
      } = this
      let queryRoot = { ...query }
      delete queryRoot['by']
      let {
        JudgeDetailAbout,
        JudgeDetailOpinions,
        JudgeDetailOpinionsByYear,
        JudgeDetailDockets,
        JudgeDetailDocketsByYear,
      } = ROUTES.Jurisdiction
      let rootJudges = `${ROUTES.LitigationResearch.Judges.path}/${judge}`
      return [
        generateToSub(JudgeDetailAbout, query, {
          path: `${rootJudges}/${JudgeDetailAbout.path}`,
        }),
        generateToSub(JudgeDetailOpinions, query, {
          path: `${rootJudges}/${JudgeDetailOpinions.path}`,
        }),
        generateToSub(JudgeDetailOpinionsByYear, query, {
          path: `${rootJudges}/${JudgeDetailOpinionsByYear.path}`,
        }),
        generateToSub(JudgeDetailDockets, query, {
          path: `${rootJudges}/${JudgeDetailDockets.path}`,
        }),
        generateToSub(JudgeDetailDocketsByYear, query, {
          path: `${rootJudges}/${JudgeDetailDocketsByYear.path}`,
        }),
      ]
    },
  },
}
</script>

<style scoped></style>
