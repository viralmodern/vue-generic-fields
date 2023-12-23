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
let {
  ContactInformation,
  BasicInformation,
} = ROUTES.USAHistoricalCongressMembers

const subs = {
  a1: ContactInformation.path,
  a2: BasicInformation.path,
}

export default {
  name: 'GridAllHistoricalCongressMembersOfUSAOdt',
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
        case subs.a2:
          return [...attributesFrozen, ...this.attributesSubA2]
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
          ...fieldsOdt.full_name,
          width: 200,
        },
      ]
    },
    attributesSubA1() {
      return [
        { ...fieldsOdt.last_name },
        { ...fieldsOdt.first_name },
        { ...fieldsOdt.middle_name },
        { ...fieldsOdt.suffix },
        { ...fieldsOdt.nickname },
        { ...fieldsOdt.birthday },
        { ...fieldsOdt.gender },
        { ...fieldsOdt.type },
        { ...fieldsOdt.state },
        { ...fieldsOdt.district },
        { ...fieldsOdt.senate_class },
        { ...fieldsOdt.party },
      ]
    },
    attributesSubA2() {
      return [
        { ...fieldsOdt.url },
        { ...fieldsOdt.address },
        { ...fieldsOdt.phone },
        { ...fieldsOdt.contact_form },
        { ...fieldsOdt.rss_url },
        { ...fieldsOdt.twitter },
        { ...fieldsOdt.facebook },
        { ...fieldsOdt.youtube },
        { ...fieldsOdt.bioguide_id },
        { ...fieldsOdt.thomas_id },
        { ...fieldsOdt.opensecrets_id },
        { ...fieldsOdt.lis_id },
        { ...fieldsOdt.fec_ids },
        { ...fieldsOdt.cspan_id },
        { ...fieldsOdt.govtrack_id },
        { ...fieldsOdt.votesmart_id },
        { ...fieldsOdt.ballotpedia_id },
        { ...fieldsOdt.washington_post_id },
        { ...fieldsOdt.icpsr_id },
        { ...fieldsOdt.wikipedia_id },
      ]
    },
  },
}
</script>

<style scoped></style>
