import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import { TEXT_DECORATION } from '@/features/odt/helpers/odt.json'
import values from 'lodash/values'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
let patterns = [...values(TEXT_DECORATION)]
const colorDefault = 'red darken-4'
function getColorPattern(description) {
  let color = '',
    icon,
    icons = [],
    pt,
    type,
    text = false,
    item = {}
  description = description || ''
  description = description.toLowerCase()

  for (let i = 0; i < patterns.length; i++) {
    let pattern = patterns[i]
    let { PATTERN, ICON, TYPE, COLOR } = pattern
    let ptt = pattern.PATTERN.toLowerCase()
    if (description.indexOf(ptt) >= 0) {
      // color = pattern.COLOR
      color = colorDefault
      pt = PATTERN
      icon = ICON
      type = TYPE
      text = true
      icons.push({ icon, color: COLOR })
      icons = uniqWith(icons, isEqual)
    }
  }
  item = {
    color,
    pt,
    description,
    text,
    colorIcon: color,
  }
  if (icons.length > 1) {
    item.color = ''
    item['icons'] = icons
    item.text = false
  } else {
    // item['type'] = type
    item['icon'] = icon
    item.color = 'default'
    item.text = false
  }
  return item
}
export const fieldsEntriesOfDocketTracker = {
  entry_number: {
    name: 'entry_number',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    width: 180,
  },
  case_name: {
    name: 'case_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 180,
  },
  party: {
    name: 'party',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    width: 180,
  },
  motion: {
    name: 'motion',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 180,
  },
  complaint: {
    name: 'complaint',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 180,
  },
  order: {
    name: 'order',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 180,
  },

  date_filed: {
    name: 'date_filed',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
    width: 150,
  },
  waiting_time: {
    label: 'Waiting Time Between Entries',
    name: 'waiting_time',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 250,
  },
  accumulated_waiting_time: {
    label: 'Accumulate Waiting Time',
    name: 'accumulated_waiting_time',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 250,
  },
  description: {
    name: 'description',
    type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
    width: 400,
    showInList: true,
  },
  documents: {
    label: 'Documents',
    name: 'documents',
    type: ATTRIBUTE_FIELDS.DOCUMENTS.TYPE,
    width: 350,
  },
  document_quantity: {
    name: 'document_quantity',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 250,
  },
  page_quantity: {
    name: 'page_quantity',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 250,
    showInList: true,
  },
  estimated_reading_time: {
    name: 'estimated_reading_time',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 250,
    showInList: true,
  },
  entry_type: {
    name: 'entry_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    width: 150,
    groupBy: true,
    showInList: true,
  },
  filed_by: {
    name: 'filed_by',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    width: 150,
    groupBy: true,
  },
  ecf_event: {
    name: 'ecf_event',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 150,
  },
}
export default {
  computed: {
    attributesByNames() {
      let gt = this.$store.getters['appConfigs/getChoicesConfigByName']
      let entryTypes = gt('DocketEntryType')
      let filedBy = gt('DocketEntry.FiledBy')
      let rooPath = this.$$rootPathDocketOdt
      const {
        params: { docket },
      } = this.$route
      return {
        entry_number: {
          ...fieldsEntriesOfDocketTracker.entry_number,
          pathLink: function () {
            return `${rooPath}/${docket}/${this.pk}`
          },
        },
        date_filed: {
          ...fieldsEntriesOfDocketTracker.date_filed,
        },
        waiting_time: {
          ...fieldsEntriesOfDocketTracker.waiting_time,
        },
        accumulated_waiting_time: {
          ...fieldsEntriesOfDocketTracker.accumulated_waiting_time,
        },
        description: {
          ...fieldsEntriesOfDocketTracker.description,
          options: function () {
            let description = this.description
            let obj = getColorPattern(description)
            let k = `${ATTRIBUTE_FIELDS.LONG_TEXT.TYPE}_description`
            return {
              reduce: true,
              [k]: {
                ...obj,
              },
            }
          },
        },
        documents: {
          ...fieldsEntriesOfDocketTracker.documents,
          pathLink: function () {
            try {
              let entry = this.pk
              return `${rooPath}/${docket}/${entry}/document`
            } catch (e) {
              return '/odt'
            }
          },
        },
        document_quantity: {
          ...fieldsEntriesOfDocketTracker.document_quantity,
        },
        page_quantity: {
          ...fieldsEntriesOfDocketTracker.page_quantity,
        },
        estimated_reading_time: {
          ...fieldsEntriesOfDocketTracker.estimated_reading_time,
        },
        entry_type: {
          ...fieldsEntriesOfDocketTracker.entry_type,
          list: entryTypes,
        },
        filed_by: {
          ...fieldsEntriesOfDocketTracker.filed_by,
          list: filedBy,
        },
        ecf_event: {
          ...fieldsEntriesOfDocketTracker.ecf_event,
        },
      }
    },
    attributes() {
      let { attributesByNames } = this
      return [
        attributesByNames.entry_number,
        // attributesByNames.date_filed,
        attributesByNames.waiting_time,
        attributesByNames.accumulated_waiting_time,
        attributesByNames.description,
        attributesByNames.documents,
        attributesByNames.document_quantity,
        attributesByNames.page_quantity,
        attributesByNames.estimated_reading_time,
        attributesByNames.entry_type,
        attributesByNames.filed_by,
        attributesByNames.ecf_event,
      ]
    },
  },
}
