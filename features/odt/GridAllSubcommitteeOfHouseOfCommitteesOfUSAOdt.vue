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
import { fieldsOdt } from '~/features/odt/helpers/fieldsOdt'
const subs = {
  a1: '',
}

export default {
  name: 'GridAllSubcommitteeOfHouseOfCommitteesOfUSAOdt',
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
        { ...fieldsOdt.subcommittee_name, width: 200 },
        { ...fieldsOdt.total_subcommittees },
        { ...fieldsOdt.total_democrats },
        { ...fieldsOdt.total_republicans },
        { ...fieldsOdt.total_democrats_pr },
        { ...fieldsOdt.total_republicans_pr },
      ]
    },
    attributesSubA1() {
      return []
    },
  },
}
</script>

<style scoped></style>
