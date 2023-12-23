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
let { MemberProfile } = ROUTES.USAHouseOfRepresentativesHome

const subs = {
  a1: MemberProfile.path,
}

export default {
  name: 'GridAllHouseOfRepresentativesOfUSAOdt',
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
      return [
        {
          ...fieldsOdt.member_name,
          width: 200,
        },
      ]
    },
    attributesSubA1() {
      return [
        { ...fieldsOdt.state },
        { ...fieldsOdt.district },
        { ...fieldsOdt.home_town },
        { ...fieldsOdt.party, chips: true, groupBy: true },
        { ...fieldsOdt.total_votes },
        { ...fieldsOdt.committee_and_subcommittee_assignments },
      ]
    },
  },
}
</script>

<style scoped></style>
