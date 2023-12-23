import { OPERATIONS } from "~/sat-vue-toolkit/components/slick-grid/configs/operations"
import { CATEGORIES_TYPE, FILTER_TYPES } from "~/sat-vue-toolkit/components/slick-grid/configs/slickgrid.json"
const reuseConfig = {
  CARD_LAYOUT: "ListCell",
  CELL_LAYOUT: "ListCell",
  MODEL_LAYOUT: "ChoicesFieldCreateItem",
  SOURCE_LAYOUT: "ListSource",
  OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
  ICON: "mdi-star",
}
export const PART_002 = {
  USPresidentsAndVicePresidents: {
    TYPE: "USPresidentsAndVicePresidents",
    LABEL: "US Presidents and Vice Presidents",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "name",
      itemValue: "id",
      dotPropText: ["name.first", "name.last"],
      // itemKeyCate: "parentId",
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      asyncData: true,
      urlJson: 'https://theunitedstates.io/congress-legislators/executive.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  CurrentLegislators: {
    TYPE: "CurrentLegislators",
    LABEL: "Current Legislators",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "name",
      itemValue: "id",
      // itemKeyCate: "parentId",
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      // official_full
      dotPropText: ["name.official_full"],
      asyncData: true,
      urlJson: 'https://theunitedstates.io/congress-legislators/legislators-current.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  CongressCommittee: {
    TYPE: "CongressCommittee",
    LABEL: "Congress Committee",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "name",
      itemValue: "name",
      // itemKeyCate: "parentId",
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      // jurisdiction
      tooltipsValue: ["jurisdiction"],
      itemFavicon: "url",
      asyncData: true,
      urlJson: 'https://theunitedstates.io/congress-legislators/committees-current.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  PublicTradeCompanies: {
    TYPE: "PublicTradeCompanies",
    LABEL: "Public Trade Companies",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "title",
      itemValue: "ticker",
      // itemKeyCate: "parentId",
      dotPropText: ["ticker", "title"],
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      asyncData: true,
      urlJson: '/json/company_tickers.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  OccupationalList: {
    TYPE: "OccupationalList",
    LABEL: "Occupational List",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "SOC Title",
      itemValue: "SOC Code",
      // itemKeyCate: "parentId",
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      tooltipsValue: ["SOC Definition"],
      asyncData: true,
      urlJson: '/json/Occupation.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  UniversityAndCollegeInUS: {
    TYPE: "UniversityAndCollegeInUS",
    LABEL: "University and College in US",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "NAME",
      itemValue: "NAME",
      // itemKeyCate: "parentId",
      labelRoot: 'University',
      // treeFormat: true,
      // tableFormat: true,
      // tooltipsValue: 'SOC Definition',
      // chips: true,
      asyncData: true,
      itemFavicon: 'WEBSITE',
      urlJson: '/json/Colleges_and_Universities.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  NAICSCode: {
    TYPE: "NAICSCode",
    LABEL: "NAICS Code",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "Title",
      itemValue: "Code",
      dotPropText: ["Title", "Code"],
      // itemKeyCate: "parentId",
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      tooltipsValue: ["Description"],
      asyncData: true,
      urlJson: '/json/NAICS_Code.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  CIK: {
    TYPE: "CIK",
    LABEL: "CIK",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "company_name",
      itemValue: "cik_number",

      // itemKeyCate: "parentId",
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      // tooltipsValue: 'Description',
      headerJson: {
        // mode: 'no-cors'
      },
      asyncData: true,
      urlJson: '/json/cik-lookup-data.json',
      // urlJson: '/json/cik-lookup-data.txt',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },

}

