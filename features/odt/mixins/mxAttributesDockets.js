import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
export const fieldsDocketsTracker = {
  case_name: {
    name: 'case_name',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    width: 350,
    showInList: true,
    isHover: true,
  },
  docket_number: {
    name: 'docket_number',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    width: 200,
  },
  first_filed_date: {
    name: 'first_filed_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
    width: 200,
  },
  date_created: {
    name: 'date_created',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
    width: 200,
    hide: true,
  },
  latest_filed_date: {
    name: 'latest_filed_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
    width: 200,
  },
  docket_length: {
    name: 'docket_length',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 200,
  },
  time_since_latest_docket_activity: {
    name: 'time_since_latest_docket_activity',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 200,
    list: [],
  },
  time_since_first_filed: {
    name: 'time_since_first_filed',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 200,
  },
  total_known_docket_entries: {
    name: 'total_known_docket_entries',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 200,
  },
  data_completeness: {
    name: 'data_completeness',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 200,
  },
  longest_waiting_time: {
    name: 'longest_waiting_time',
    label: 'Longest waiting time between entries',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 200,
  },
  nature_of_suit: {
    name: 'nature_of_suit',
    type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
    width: 200,
    isHover: true,
  },
  cause: {
    name: 'cause',
    type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
    width: 200,
    isHover: true,
  },
  court: {
    label: 'jurisdiction',
    name: 'court',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    width: 200,
    itemText: 'short_name',
    itemValue: 'pk',
    groupBy: true,
    showInList: true,
    chips: true,
    isHover: true,
  },
  idb_data__district: {
    label: 'District Court',
    name: 'idb_data__district',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    width: 200,
    itemText: 'short_name',
    itemValue: 'pk',
    groupBy: true,
    chips: true,
  },
  idb_data__circuit: {
    label: 'Circuit Court',
    name: 'idb_data__circuit',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    width: 200,
    itemText: 'short_name',
    itemValue: 'pk',
    groupBy: true,
    chips: true,
  },
  latest_entry: {
    name: 'latest_entry',
    label: 'Latest Entry Description',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    pathLinkValue: 'pk',
    pathLinkText: 'description',
    width: 200,
  },
  complaints: {
    name: 'complaints',
    label: 'Complaint Availability',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    multiple: true,
    pathLinkValue: 'pk',
    pathLinkText: 'description',
    width: 200,
  },
  docket_type: {
    name: 'docket_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    width: 200,
    groupBy: true,
  },
  parties: {
    name: 'parties',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    width: 200,
    groupBy: true,
    multiple: true,
  },
  out_comes: {
    name: 'out_comes',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    width: 200,
    multiple: true,
  },
  judge: {
    name: 'judge',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
}
export default {
  computed: {
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
    courts() {
      return this.$store.getters['appConfigs/courts']
    },
    docketTypes() {
      return this.$store.getters['appConfigs/getChoicesConfigByName'](
        'Docket.DocketType'
      )
    },

    attributes() {
      let rootPath = this.$$rootPathDocketOdt
      return [
        {
          ...fieldsDocketsTracker.case_name,
          pathLink: function () {
            return `${rootPath}/${this.pk}`
          },
        },
        {
          ...fieldsDocketsTracker.docket_number,
          pathLink: function () {
            return `${rootPath}/${this.pk}`
          },
        },

        /*{
          label: 'date created',
          name: 'date_created',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'last_updated',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A*/
        {
          ...fieldsDocketsTracker.first_filed_date,
        },
        {
          ...fieldsDocketsTracker.date_created,
        },

        {
          ...fieldsDocketsTracker.latest_filed_date,
        },
        {
          ...fieldsDocketsTracker.docket_length,
        },
        {
          ...fieldsDocketsTracker.time_since_latest_docket_activity,
        },
        {
          ...fieldsDocketsTracker.time_since_first_filed,
        },

        {
          ...fieldsDocketsTracker.total_known_docket_entries,
        },
        /*{
          name: 'total_docket_entries_in_system',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        }, // N/A*/
        {
          ...fieldsDocketsTracker.data_completeness,
        },

        {
          ...fieldsDocketsTracker.longest_waiting_time,
        },
        {
          ...fieldsDocketsTracker.nature_of_suit,
        },

        {
          ...fieldsDocketsTracker.cause,
        },

        {
          ...fieldsDocketsTracker.court,
          list: this.courts,
        },
        {
          ...fieldsDocketsTracker.idb_data__district,
          list: this.courts,
        },

        {
          ...fieldsDocketsTracker.idb_data__circuit,
          list: this.courts,
        },
        {
          ...fieldsDocketsTracker.latest_entry,
          pathLink: function () {
            return `${rootPath}/${this.pk}/${this.latest_entry.pk}`
          },
        },
        {
          ...fieldsDocketsTracker.complaints,
          pathLink: function () {
            return `${rootPath}/${this.pk}`
          },
        },

        {
          ...fieldsDocketsTracker.docket_type,
          list: this.docketTypes,
        },
        {
          ...fieldsDocketsTracker.parties,
        },
        {
          ...fieldsDocketsTracker.out_comes,
        },
        {
          ...fieldsDocketsTracker.judge,
        },
      ]
    },
  },
}
