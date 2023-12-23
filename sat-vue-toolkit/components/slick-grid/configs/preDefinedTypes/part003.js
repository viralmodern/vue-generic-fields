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
export const PART_003 = {
  CounselingCode: {
    TYPE: "CounselingCode",
    LABEL: "Counseling Code",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "Code",
      itemValue: "Code",
      // dotPropText: ["name.first", "name.last"],
      // itemKeyCate: "parentId",
      tooltipsValue: ["Definition"],
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      asyncData: true,
      urlJson: '/json/Counsel_Code.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  LegalProjectCode: {
    TYPE: "LegalProjectCode",
    LABEL: "Legal Project Code",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "Code",
      itemValue: "Code",
      // dotPropText: ["name.first", "name.last"],
      // itemKeyCate: "parentId",
      tooltipsValue: ["Definition"],
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      asyncData: true,
      urlJson: '/json/Legal_Project_Code.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  BankruptcyCode: {
    TYPE: "BankruptcyCode",
    LABEL: "Bankruptcy Code",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "Code Name",
      itemValue: "Code Name",
      // dotPropText: ["name.first", "name.last"],
      // itemKeyCate: "parentId",
      tooltipsValue: ["Code Definition"],
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      asyncData: true,
      urlJson: '/json/ABA_Bankruptcy.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  /*update json*/
  PrivilegeCode: {
    TYPE: "PrivilegeCode",
    LABEL: "Privilege Code",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "Code Name",
      itemValue: "Code Name",
      // dotPropText: ["name.first", "name.last"],
      // itemKeyCate: "parentId",
      tooltipsValue: ["Code Definition"],
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      asyncData: true,
      urlJson: '/json/ABA_Bankruptcy.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },
  IndividualTaxCredits: {
    TYPE: "IndividualTaxCredits",
    LABEL: "Individual Tax Credits",
    ...reuseConfig,
    TYPE_OPTIONAL_CONFIG: {
      itemText: "Code Name",
      itemValue: "Code Name",
      // dotPropText: ["name.first", "name.last"],
      // itemKeyCate: "parentId",
      tooltipsValue: ["Code Definition"],
      labelRoot: 'Items',
      // treeFormat: true,
      // tableFormat: true,
      asyncData: true,
      urlJson: '/json/ABA_Bankruptcy.json',
    },
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Standard.type
  },


}

