import {
  ACTIVITIES_CODE,
  PAID_STATUS,
  BILLABLE,
  EXPENSES_CODE,
  TAX,
  LITIGATION_CODE,
  getCodeFields,
  getCodeFieldsTree,
} from '~/mock/fields'

export default {
  data() {
    return {
      ACTIVITIES_CODE,
      PAID_STATUS,
      EXPENSES_CODE,
      TAX,
      LITIGATION_CODE,
    }
  },
  methods: {
    $$getActivitiesCode({ code }) {
      return getCodeFields({ code, list: ACTIVITIES_CODE })
    },
    $$getTaxCode({ code }) {
      return getCodeFields({ code, list: TAX })
    },
    $$getExpenseCode({ code }) {
      return getCodeFields({ code, list: EXPENSES_CODE })
    },
    $$getPaidStatusCode({ code }) {
      return getCodeFields({ code, list: PAID_STATUS })
    },
    $$getBillableCode({ code }) {
      return getCodeFields({ code, list: BILLABLE })
    },
    $$getLigationCode({ code }) {
      let items = getCodeFieldsTree({ code, list: LITIGATION_CODE })
      if (items.length) {
        return items[0].model
      }
      return { name: 'N/A' }
    },
  },
}
