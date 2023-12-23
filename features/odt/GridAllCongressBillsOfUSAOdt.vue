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
let { BillElements, BillInformation } = ROUTES.USACongressBills

const subs = {
  a1: BillInformation.path,
  a2: BillElements.path,
}

export default {
  name: 'GridAllCongressBillsOfUSAOdt',
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
            } else if (defaultSub.path === subs.a2) {
              return [...attributesFrozen, ...this.attributesSubA2]
            }
          }
          return [...attributesFrozen, ...this.attributesSubA1]
      }
    },
    attributesFrozen() {
      return [
        {
          ...fieldsOdt.bill_number,
          width: 200,
        },
      ]
    },
    attributesSubA1() {
      return [
        { ...fieldsOdt.congress },
        { ...fieldsOdt.bill_title },
        { ...fieldsOdt.sponsor },
        { ...fieldsOdt.introduced_date },
        { ...fieldsOdt.bill_source },
        { ...fieldsOdt.last_action_date },
        { ...fieldsOdt.tracker_type },
      ]
    },
    attributesSubA2() {
      return [
        { ...fieldsOdt.total_cosponsors },
        { ...fieldsOdt.committees },
        { ...fieldsOdt.constitutional_authority_statement },
        { ...fieldsOdt.congressional_budget_office },
        { ...fieldsOdt.bill_type },
        { ...fieldsOdt.status_of_legislation },
        { ...fieldsOdt.status_of_amendment },
        { ...fieldsOdt.subject_policy_area },
        { ...fieldsOdt.chamber_of_origin },
        { ...fieldsOdt.committee },
      ]
    },
  },
}
</script>

<style scoped></style>
