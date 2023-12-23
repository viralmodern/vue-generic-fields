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
let { VoteResult, Vote } = ROUTES.USAHouseOfRepresentativesVote

const subs = {
  a1: Vote.path,
  a2: VoteResult.path,
}

export default {
  name: 'GridAllHouseOfRepresentativesVoteOfUSAOdt',
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
      let { params } = this.$route
      return [
        {
          ...fieldsOdt.roll_call_number,
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          width: 220,
          pathLink: function () {
            let pk = `${this.pk}`
            let newParams = {
              vote: pk,
            }
            return {
              name: `odt-united-states-of-america-house-of-representatives-house-of-representatives-vote-vote`,
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
        { ...fieldsOdt.congress },
        { ...fieldsOdt.session },
        { ...fieldsOdt.date },
        { ...fieldsOdt.bill_number },
        { ...fieldsOdt.vote_question },
        { ...fieldsOdt.bill_title, label: 'Bill Title & Description' },
        { ...fieldsOdt.vote_type },
        { ...fieldsOdt.status },
      ]
    },
    attributesSubA2() {
      return [
        { ...fieldsOdt.yea },
        { ...fieldsOdt.nay },
        { ...fieldsOdt.present },
        { ...fieldsOdt.note_voting },
      ]
    },
  },
}
</script>

<style scoped></style>
