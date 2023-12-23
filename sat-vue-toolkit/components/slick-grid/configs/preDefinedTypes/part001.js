import { OPERATIONS } from "~/sat-vue-toolkit/components/slick-grid/configs/operations"
import { CATEGORIES_TYPE, FILTER_TYPES } from "~/sat-vue-toolkit/components/slick-grid/configs/slickgrid.json"

export const PART_001 = {
  JURISDICTION: {
    TYPE: "JURISDICTION",
    LABEL: "Jurisdiction",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      itemText: "short_name",
      itemValue: "pk",
      asyncData: true,
      itemFavicon: 'url',
      // Jurisdiction
      urlJson: "http://two.legal/api/courts/"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    ICON: "mdi-star",
    // operations
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  COUNTRY: {
    TYPE: "COUNTRY",
    LABEL: "Country",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    // SOURCE_DATA: countries,
    ICON: "mdi-star",
    TYPE_OPTIONAL_CONFIG: {
      // itemText: "short_name",
      // itemValue: "pk",
      asyncData: true,
      chips: true,
      urlJson: "/json/country-by-abbreviation.json"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },

    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  ABALitigationCode: {
    TYPE: "ABALitigationCode",
    LABEL: "ABA Litigation Code",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      // itemText: "short_name",
      // itemValue: "pk",
      asyncData: true,
      urlJson: "/json/aba_litigation_code.json"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  ABAActivitiesCode: {
    TYPE: "ABAActivitiesCode",
    LABEL: "ABA Activities Code",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      // itemText: "short_name",
      // itemValue: "pk",
      asyncData: true,
      urlJson: "/json/aba_activities_code.json"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  ABAExpenseCode: {
    TYPE: "ABAExpenseCode",
    LABEL: "ABA Expense Code",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      // itemText: "short_name",
      // itemValue: "pk",
      asyncData: true,
      urlJson: "/json/aba_expense_code.json"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  USState: {
    TYPE: "USState",
    LABEL: "US State",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      // itemText: "short_name",
      // itemValue: "pk",
      asyncData: true,
      urlJson: "/json/states_titlecase.json"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  USCounty: {
    TYPE: "USCounty",
    LABEL: "US Counties",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    ICON: "mdi-star",
    TYPE_OPTIONAL_CONFIG: {
      // itemText: "short_name",
      // itemValue: "pk",
      asyncData: true,
      urlJson: "/json/us_counties.json"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  Cryptocurrency: {
    TYPE: "Cryptocurrency",
    LABEL: "Cryptocurrency",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      // itemText: "short_name",
      // itemValue: "pk",
      asyncData: true,
      chips: true,
      urlJson: "/json/cryptocurrency.json"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  NatureOfSuit: {
    TYPE: "NatureOfSuit",
    LABEL: "Nature of Suit",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      itemText: "Title",
      itemValue: "Code",
      dotPropText: ["Code", "Title"],
      tableFormat: true,
      asyncData: true,
      urlJson: "/json/Nature_of_Suit.json",
      tooltipsValue: ["Code", "Title", "Description"],
      colHeaders: [
        {
          label: "Code", value: "Code", width: `50px`, style: { width: `50px` },
          rowStyle: { "grid-template-columns": "50px 100px 100px 1fr" }
        },
        {
          label: "Title", value: "Title", width: `100px`, style: { width: `120px` },
          rowStyle: { "grid-template-columns": "50px 100px 100px 1fr" }
        },
        {
          label: "Type", value: "Type", width: `100px`, style: { width: `100px` },
          rowStyle: { "grid-template-columns": "50px 100px 100px 1fr" }
        },
        {
          label: "Description", value: "Description", width: ``, style: { "width": "300px" },
          rowStyle: { "grid-template-columns": "50px 100px 100px 1fr" }
        }
        // { label: "Description", value: "Description", width: ``, style: { flex: 1, "max-width": "300px" } }
      ]
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.Is,
      OPERATIONS.IsNot,
      OPERATIONS.IsAnyOf,
      OPERATIONS.IsAllOf,
      OPERATIONS.IsNoneOf
    ],
    FILTER_TYPE: FILTER_TYPES.LIST,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  ECFCivilEvent: {
    TYPE: "ECFCivilEvent",
    LABEL: "ECF Civil Event",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      itemText: "label",
      itemValue: "id",
      itemKeyCate: "parentId",
      labelRoot: "Items",
      treeFormat: true,
      asyncData: true,
      urlJson: "/json/ECF_Civil_Event.json"
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  ECFCriminalEvent: {
    TYPE: "ECFCriminalEvent",
    LABEL: "ECF Criminal Event",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",

    TYPE_OPTIONAL_CONFIG: {
      itemText: "label",
      itemValue: "label",
      asyncData: true,
      urlJson: "/json/ECF_Criminal_Event.json"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  PartyRoleType: {
    TYPE: "PartyRoleType",
    LABEL: "Party Role Type",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      itemText: "Amicus",
      itemValue: "Amicus",
      asyncData: true,
      urlJson: "/json/Party_Role.json"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  StateRegulations: {
    TYPE: "StateRegulations",
    LABEL: "State Regulations",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      itemText: "code",
      itemValue: "code",
      asyncData: true,
      urlJson: "/json/State_Regulations.json"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  FederalRules: {
    TYPE: "FederalRules",
    LABEL: "Federal Rules",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      itemText: "code",
      itemValue: "code",
      asyncData: true,
      urlJson: "/json/Federal_Rules.json"
      /*Or*/
      // colHeaders: ["code--Code", "title--Title", "type--Type", "description--Description"], /*key--value*/
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  USConstitutions: {
    TYPE: "USConstitutions",
    LABEL: "US Constitutions",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    // MODEL_LAYOUT: "v-autocomplete",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    ICON: "mdi-star",
    TYPE_OPTIONAL_CONFIG: {
      itemText: "name",
      itemValue: "id",
      itemKeyCate: "parentId",

      // dotPropText: ["Title", "Type"],
      dotPropText: ["name"],
      tooltipsValue: ["content.0"],
      asyncData: true,
      urlJson: "/json/usconstitution.json",

      labelRoot: "US Constitutions",
      treeFormat: true,

      // asyncData: true,
      // urlJson: 'https://jsonkeeper.com/b/7KV2',
      headerJson: {
        // mode: 'no-cors'
      },
      // 3d5b9351eb37
      tableFormat: true,
      colHeaders: [
        {
          label: "Title", value: "Title", width: `100px`, style: { width: `120px` },
          rowStyle: { "grid-template-columns": "100px 100px 300px 1fr" }
        },
        {
          label: "Type", value: "Type", width: `100px`, style: { width: `100px` },
          rowStyle: { "grid-template-columns": "100px 100px 300px 1fr" }
        },
        {
          label: "Description", value: "Description", width: ``, style: { "width": "300px" },
          rowStyle: { "grid-template-columns": "100px 100px 300px 1fr" }
        },
        {
          label: "Source",
          value: "Source",
          width: ``,
          style: { flex: 1, "max-width": "300px" },
          rowStyle: { "grid-template-columns": "100px 100px 300px 1fr" }
        }
      ]
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  USAgencies: {
    TYPE: "USAgencies",
    LABEL: "US Agencies",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    MODEL_LAYOUT: "ChoicesFieldCreateItem",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "PreDefinedFormatOptional",
    TYPE_OPTIONAL_CONFIG: {
      itemText: "name",
      itemValue: "id",
      asyncData: true,
      itemAvatar: "logo.thumb_url",
      urlJson: "https://www.federalregister.gov/api/v1/agencies",
      tooltipsValue: ["description"],
      // tableFormat: true,
      colHeaders: [
        // 80px 120px 1fr
        {
          label: "Short Name",
          value: "short_name",
          width: `50px`,
          style: { width: `80px` },
          rowStyle: { "grid-template-columns": "80px 120px 1fr" }
        },
        {
          label: "Name", value: "name", width: `100px`, style: { width: `120px` },
          rowStyle: { "grid-template-columns": "80px 120px 1fr" }
        },
        {
          label: "Description", value: "description", width: ``,
          style: { "flex-grow": 1, "max-width": "300px" },
          rowStyle: { "grid-template-columns": "80px 120px 1fr" }
        }
      ]
    },
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  }
}
