import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import { ROUTES } from '@/features/odt/helpers/odt.json'
export const jurisdictionTypesMixin = {
  computed: {
    jurisdictionsTypes() {
      return this.$store.getters['appConfigs/getChoicesConfigByName'](
        'Jurisdictions'
      )
    },
  },
}
export const jurisdictionMixin = {
  computed: {
    jurisdictionsTypes() {
      return this.$store.getters['appConfigs/getChoicesConfigByName'](
        'Jurisdictions'
      )
    },

    jurisdictionByView() {
      let {
        $route: { query },
      } = this
      let {
        JurisdictionProfile,
        JurisdictionAnnualLoads,
        JurisdictionAnnualTrends,
      } = ROUTES.Jurisdiction
      let isProfile = false,
        isLoads = false,
        isTrends = false
      if (query['by']) {
        let _by = query['by']
        if (_by === JurisdictionProfile.path) {
          isProfile = true
        } else if (_by === JurisdictionAnnualLoads.path) {
          isLoads = true
        } else if (_by === JurisdictionAnnualTrends.path) {
          isTrends = true
        }
      }
      return {
        isProfile,
        isLoads,
        isTrends,
      }
    },
    attributesJurisdictions() {
      let {
        jurisdictionsTypes,
        rootPath = `/odt`,
        jurisdictionByView: { isProfile, isLoads, isTrends },
      } = this
      let t = [
        {
          name: 'full_name',
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          width: 250,
          faviconLink: function () {
            return `${this.url}`
          },
          pathLink: function () {
            let jurisdiction = this['pk']
            return `${rootPath}/jurisdiction/${jurisdiction}`
          },
        },
        {
          name: 'url',
          label: 'website',
          type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
          width: 250,
        },
        {
          name: 'jurisdiction',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          list: jurisdictionsTypes,
          width: 200,
          groupBy: true,
        },

        {
          name: 'total_opinions',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'trendline',
          type: ATTRIBUTE_FIELDS.SPARK_LINE.TYPE,
          width: 250,
        },
        {
          name: 'quarter_1st',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'quarter_2nd',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'quarter_3rd',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'quarter_4th',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'year_1',
          label: (new Date().getFullYear() - 1).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'year_2',
          label: (new Date().getFullYear() - 2).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'year_3',
          label: (new Date().getFullYear() - 3).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'year_4',
          label: (new Date().getFullYear() - 4).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'year_5',
          label: (new Date().getFullYear() - 5).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
      ]
      if (isLoads || isTrends) {
        t = [
          ...t.filter((temp) => {
            return !['url', 'jurisdiction', 'total_opinions'].includes(
              temp.name
            )
          }),
        ]
        if (isTrends) {
          t =
            t.length &&
            t.map((temp) => {
              let i = { ...temp }
              i['enabledTrendValue'] = true
              return i
            })
        }
      } else {
        t = [
          ...t.filter((temp) => {
            return [
              'full_name',
              'url',
              'jurisdiction',
              'total_opinions',
            ].includes(temp.name)
          }),
        ]
      }
      return t
    },
  },
}
export const jurisdictionFederalDocketsMixin = {
  computed: {
    jurisdictionsTypes() {
      let types = this.$store.getters['appConfigs/getChoicesConfigByName'](
        'Jurisdictions'
      )
      // return types
      return types.filter((t) => ['F', 'FD'].includes(t.value)) // FEDERAL APPEALLATE và FEDERAL DISTRICT
    },
    jurisdictionByView() {
      let {
        $route: { query },
      } = this
      let {
        FederalJurisdictionProfile,
        AnnualDocketLoads,
        AnnualDocketTrends,
      } = ROUTES.Jurisdiction
      let isProfile = false,
        isLoads = false,
        isTrends = false
      if (query['by']) {
        let _by = query['by']
        if (_by === FederalJurisdictionProfile.path) {
          isProfile = true
        } else if (_by === AnnualDocketLoads.path) {
          isLoads = true
        } else if (_by === AnnualDocketTrends.path) {
          isTrends = true
        }
      }
      return {
        isProfile,
        isLoads,
        isTrends,
      }
    },
    attributesJurisdictions() {
      let {
        jurisdictionsTypes,
        rootPath = `/odt`,
        jurisdictionByView: { isProfile, isLoads, isTrends },
      } = this
      let t = [
        {
          name: 'full_name',
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          width: 250,
          faviconLink: function () {
            return `${this.url}`
          },
          pathLink: function () {
            let jurisdiction = this['pk']
            return `${rootPath}/federal-dockets/${jurisdiction}`
          },
        },
        {
          name: 'url',
          label: 'website',
          type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
          width: 250,
        },
        {
          name: 'jurisdiction',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          list: jurisdictionsTypes,
          width: 200,
          groupBy: true,
        },

        {
          name: 'total_dockets',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'total_judges',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'trendline',
          type: ATTRIBUTE_FIELDS.SPARK_LINE.TYPE,
          width: 250,
        },
        {
          name: 'quarter_1st',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'quarter_2nd',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'quarter_3rd',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'quarter_4th',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'year_1',
          label: (new Date().getFullYear() - 1).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'year_2',
          label: (new Date().getFullYear() - 2).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'year_3',
          label: (new Date().getFullYear() - 3).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'year_4',
          label: (new Date().getFullYear() - 4).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
        {
          name: 'year_5',
          label: (new Date().getFullYear() - 5).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTooltip: true,
          enabledTrendValue: false,
        },
      ]
      if (isLoads || isTrends) {
        t = [
          ...t.filter((temp) => {
            return ![
              'url',
              'jurisdiction',
              'total_dockets',
              'total_judges',
            ].includes(temp.name)
          }),
        ]
        if (isTrends) {
          t =
            t.length &&
            t.map((temp) => {
              let i = { ...temp }
              i['enabledTrendValue'] = true
              return i
            })
        }
      } else {
        t = [
          ...t.filter((temp) => {
            return [
              'full_name',
              'url',
              'jurisdiction',
              'total_dockets',
              'total_judges',
            ].includes(temp.name)
          }),
        ]
      }
      return t
    },
  },
}
