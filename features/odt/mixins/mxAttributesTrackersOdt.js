import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const mxAttributesTrackers = {
  computed: {
    attributes() {
      let trackerStatus = this.$store.getters[
        'appConfigs/getChoicesConfigByName'
      ]('Tracker.Status')
      let trackerTypes = this.$store.getters[
        'appConfigs/getChoicesConfigByName'
      ]('Tracker.TrackerType')

      return [
        {
          name: 'name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          required: true,
        }, // N/A
        {
          name: 'description',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 250,
          list: [],
        }, // N/A
        {
          name: 'total_cases',
          type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
          width: 250,
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Status',
          name: 'status',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 250,
          list: trackerStatus,
          showInList: true,
        }, // N/A
        {
          name: 'creator',
          type: ATTRIBUTE_FIELDS.MEMBER.TYPE,
          width: 100,
          list: [],
          readOnly: true,
        }, // N/A
        {
          name: 'tracker_type',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 250,
          list: trackerTypes,
          showInList: true,
          groupBy: true,
        }, // N/A
        {
          name: 'wikipedia_url',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
        }, // N/A
        {
          name: 'auto_sync',
          type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
          width: 150,
        }, // N/A
        {
          name: 'last_auto_sync',
          type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
          width: 250,
          readOnly: true,
        }, // N/A
        {
          name: 'created',
          type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
          width: 150,
          readOnly: true,
        },
        {
          name: 'keywords',
          type: ATTRIBUTE_FIELDS.LABELS.TYPE,
          width: 250,
          shortLabelTitle: `keywords`,
          chips: true,
          multiple: true,
        },
      ]
    },
  },
}
export const fieldsPublicTrackers = {
  name: {
    name: 'name',
    label: 'Docket Tracker Name',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    /*pathLink: function () {
      return `${rootPath}/${this.pk}/dockets/`
    },*/
    faviconLink: function () {
      return `${this.description}`
    },
    width: 300,
  },
  description: {
    name: 'description',
    label: 'Tracker Description',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 300,
  },
  trackerType: {
    name: 'tracker_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    width: 300,
    groupBy: true,
  },
  totalDockets: {
    name: 'total_dockets',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  legalIssues: {
    name: 'legal_issues',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },

  today: {
    name: 'today',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  yesterday: {
    name: 'yesterday',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },

  last7days: {
    name: 'last_7_days',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },

  last30days: {
    name: 'last_30_days',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  quarter1st: {
    name: 'quarter_1st',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  quarter2nd: {
    name: 'quarter_2nd',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  quarter3rd: {
    name: 'quarter_3rd',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  quarter4th: {
    name: 'quarter_4th',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year1: {
    name: 'year_1',
    label: (new Date().getFullYear() - 1).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year2: {
    name: 'year_2',
    label: (new Date().getFullYear() - 2).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year3: {
    name: 'year_3',
    label: (new Date().getFullYear() - 3).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  TrendLine: {
    name: 'Trendline',
    type: ATTRIBUTE_FIELDS.SPARK_LINE.TYPE,
  },
}
export const mxAttributesPublicTrackers = {
  computed: {
    trackerTypes() {
      let getChoices = this.$store.getters['appConfigs/getChoicesConfigByName']
      return getChoices('Tracker.TrackerType')
    },
    attributesFrozen() {
      let { $$rootPathDocketOdt: rootPath } = this
      return [
        {
          ...fieldsPublicTrackers.name,
          pathLink: function () {
            return `${rootPath}/${this.pk}/dockets/`
          },
        },
      ]
    },
    attributesPublicTrackersByProfile() {
      let { attributesFrozen } = this
      return [
        ...attributesFrozen,
        fieldsPublicTrackers.totalDockets,
        fieldsPublicTrackers.today,
        fieldsPublicTrackers.yesterday,
        fieldsPublicTrackers.last7days,
        fieldsPublicTrackers.last30days,
      ]
    },
    attributesPublicTrackersByAnnualDocketEntryLoads() {
      let { attributesFrozen } = this
      return [
        ...attributesFrozen,
        fieldsPublicTrackers.TrendLine,
        fieldsPublicTrackers.quarter1st,
        fieldsPublicTrackers.quarter2nd,
        fieldsPublicTrackers.quarter3rd,
        fieldsPublicTrackers.quarter4th,
        fieldsPublicTrackers.year1,
        fieldsPublicTrackers.year2,
        fieldsPublicTrackers.year3,
      ]
    },

    attributesPublicTrackersByAnnualDocketEntryTrends() {
      let { attributesFrozen } = this
      return [
        ...attributesFrozen,
        fieldsPublicTrackers.TrendLine,
        fieldsPublicTrackers.quarter1st,
        fieldsPublicTrackers.quarter2nd,
        fieldsPublicTrackers.quarter3rd,
        fieldsPublicTrackers.quarter4th,
        fieldsPublicTrackers.year1,
        fieldsPublicTrackers.year2,
        fieldsPublicTrackers.year3,
      ]
    },
    attributesPublicTrackers() {
      let {
        trackerTypes,
        attributesPublicTrackersByProfile,
        attributesPublicTrackersByAnnualDocketEntryLoads,
        attributesPublicTrackersByAnnualDocketEntryTrends,
      } = this
      let rootPath = this.$$rootPathDocketOdt
      return [
        {
          name: 'name',
          label: 'Docket Tracker Name',
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          pathLink: function () {
            return `${rootPath}/${this.pk}/dockets/`
          },
          faviconLink: function () {
            return `${this.description}`
          },

          width: 300,
        },
        {
          name: 'description',
          label: 'Tracker Description',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 300,
        },
        {
          name: 'tracker_type',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 300,
          list: trackerTypes,
          groupBy: true,
        },
        {
          name: 'total_dockets',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },
        {
          name: 'legal_issues',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },

        {
          name: 'today',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },
        {
          name: 'yesterday',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },

        {
          name: 'last_7_days',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },

        {
          name: 'last_30_days',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },
        {
          name: 'quarter_1st',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },
        {
          name: 'quarter_2nd',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },
        {
          name: 'quarter_3rd',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },
        {
          name: 'quarter_4th',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },
        {
          name: 'year_1',
          label: (new Date().getFullYear() - 1).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },
        {
          name: 'year_2',
          label: (new Date().getFullYear() - 2).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },
        {
          name: 'year_3',
          label: (new Date().getFullYear() - 3).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },
      ]
    },
  },
}
