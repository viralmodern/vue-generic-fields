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
let { VotesByParty, AllVotes } = ROUTES.USAHouseOfRepresentativesVoteDetail

const subs = {
  a1: AllVotes.path,
  a2: VotesByParty.path,
}

export default {
  name: 'GridAllHouseOfRepresentativesVoteDetailOfUSAOdt',
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
          ...fieldsOdt.party,
          width: 250,
        },
      ]
    },
    attributesSubA1() {
      return [
        { ...fieldsOdt.yea },
        { ...fieldsOdt.nay },
        { ...fieldsOdt.present },
        { ...fieldsOdt.note_voting },
      ]
    },
    attributesSubA2() {
      return [
        { ...fieldsOdt.representative },
        { ...fieldsOdt.state },
        { ...fieldsOdt.vote },
      ]
    },
  },
}
</script>

<style scoped></style>
