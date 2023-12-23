<template>
  <div>
    <SlickGrid
      :height="height"
      disabled-add-new-column
      disabled-add-new-row
      :attributes="attributes"
      no-query-params
    />
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { fieldsOdt } from '~/features/odt/helpers/fieldsOdt'
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
let { MemberProfile } = ROUTES.USAHouseOfRepresentativesHome

const subs = {
  a1: MemberProfile.path,
}

export default {
  name: 'GridAllHouseOfCommitteesOfUSAOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${82}vh`,
    },
    subs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    defaultSub() {
      let { subs } = this
      if (Array.isArray(subs)) {
        let firstSub = subs[0]
        if (firstSub) return firstSub
        return false
      } else {
        return false
      }
    },
    attributes() {
      let { defaultSub } = this
      let {
        $route: {
          query: { by },
        },
        attributesFrozen,
      } = this
      switch (by) {
        case subs.a1:
          return [...attributesFrozen, ...this.attributesSubA1]
        default:
          if (defaultSub) {
            if (defaultSub.path === subs.a1) {
              return [...attributesFrozen, ...this.attributesSubA1]
            }
          }
          return [...attributesFrozen, ...this.attributesSubA1]
      }
    },
    attributesFrozen() {
      let { params } = this.$route
      return [
        {
          ...fieldsOdt.committee_name,
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          width: 200,
          pathLink: function () {
            let committee = `${this.pk}`
            let newParams = {
              committee,
            }
            return {
              name: `odt-united-states-of-america-house-of-committees-committee`,
              params: {
                ...params,
                ...newParams,
              },
            }
          },
        },
      ]
    },
    attributesSubA1() {
      return [
        { ...fieldsOdt.total_subcommittees },
        { ...fieldsOdt.total_democrats },
        { ...fieldsOdt.total_republicans },
        { ...fieldsOdt.total_democrats_pr },
        { ...fieldsOdt.total_republicans_pr },
      ]
    },
  },
}
</script>

<style scoped></style>
