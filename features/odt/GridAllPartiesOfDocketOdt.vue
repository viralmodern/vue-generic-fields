<template>
  <div>
    <SlickGrid
      no-query-params
      :attributes="attributes"
      :height="height"
      disabled-add-new-column
      disabled-add-new-row
    />
  </div>
</template>

<script>
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
import { ROUTES } from '~/features/odt/helpers/odt.json'
const fieldsParties = {
  name: {
    name: 'name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  party_type: {
    name: 'party_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  represented_by: {
    name: 'represented_by',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  law_firm: {
    name: 'law_firm',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  counsel_information: {
    name: 'counsel_information',
    type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
  },
  counsel_type: {
    name: 'counsel_type',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
  },
  case_name: {
    name: 'case_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
}
let { PartyInfo, PartyProfile, FilingLog } = ROUTES.DocketTrackerParties
export default {
  name: 'GridAllPartiesOfDocketOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${70}vh`,
    },
    includesSubs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    currentParties() {
      let { query } = this.$route
      let _by = query['by']
      return _by
    },
    attributes() {
      let { includesSubs, currentParties } = this
      let isIncludesSubs = includesSubs.length > 0
      let attributes = [
        {
          ...fieldsParties.name,
        },
        {
          ...fieldsParties.case_name,
        },
        {
          ...fieldsParties.party_type,
        },
        {
          ...fieldsParties.represented_by,
        },
        {
          ...fieldsParties.law_firm,
        },
        {
          ...fieldsParties.counsel_information,
        },
        {
          ...fieldsParties.counsel_type,
        },
      ]
      let fieldsCompare = []
      let fieldsPartyInfo = [
        fieldsParties.case_name,
        fieldsParties.party_type,
        fieldsParties.represented_by,
        fieldsParties.law_firm,
        fieldsParties.counsel_information,
        fieldsParties.counsel_type,
      ]
      let fieldsPartyProfile = [
        fieldsParties.party_type,
        fieldsParties.represented_by,
        fieldsParties.law_firm,
        fieldsParties.counsel_information,
        fieldsParties.counsel_type,
      ]
      let fieldsFilingLog = [
        fieldsParties.party_type,
        fieldsParties.represented_by,
        fieldsParties.law_firm,
        fieldsParties.counsel_information,
        fieldsParties.counsel_type,
      ]
      if (currentParties === PartyInfo.path) {
        fieldsCompare = [...fieldsPartyInfo]
      } else if (currentParties === PartyProfile.path) {
        fieldsCompare = [...fieldsPartyProfile]
      } else if (currentParties === FilingLog.path) {
        fieldsCompare = [...fieldsFilingLog]
      } else {
        if (isIncludesSubs) {
          let firstSub = includesSubs[0]
          if (firstSub.path === PartyInfo.path) {
            fieldsCompare = [...fieldsPartyInfo]
          } else {
            fieldsCompare = [...fieldsPartyProfile]
          }
        } else {
          fieldsCompare = [...fieldsPartyProfile]
        }
      }
      if (fieldsCompare.length) {
        let fs = [fieldsParties.name, ...fieldsCompare]
        let namesFieldsCompare = fs.map((f) => f.name)
        return attributes.filter((attribute) => {
          return namesFieldsCompare.includes(attribute.name)
        })
      }
      return [...attributes]
    },
  },
}
</script>

<style scoped></style>
