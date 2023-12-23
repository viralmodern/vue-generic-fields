import Vue from "vue"
import uniqBy from "lodash/uniqBy"
import map from "lodash/map"
import upperFirst from "lodash/upperFirst"
import camelCase from "lodash/camelCase"
import { OPERATIONS } from "./operations"
import {
  SLICK_GRID, SORT_TYPE,
  LAYOUT_TYPES, BUS_SOURCE,
  FILTER_TYPES,
  COUNT_LABEL_DATA,
  ACTIONS_FIELD,
  BUS_EVENT,
  CATEGORIES_TYPE, PANEL_MODE
} from "./slickgrid.json"
import { STATUS, COLORS } from "./status.json"
import { PRE_DEFINED_TYPES } from "./attributeTypes"

export {
  SLICK_GRID,
  SORT_TYPE,
  LAYOUT_TYPES,
  BUS_SOURCE,
  BUS_EVENT,
  FILTER_TYPES,
  COUNT_LABEL_DATA,
  STATUS,
  COLORS,
  ACTIONS_FIELD,
  CATEGORIES_TYPE, PANEL_MODE
}
export const LAYOUT_TYPES_DEFAULT = LAYOUT_TYPES.TABLE.TYPE
export const ATTRIBUTE_FIELDS = {
  ...PRE_DEFINED_TYPES,
  "READONLY_TEXT": {
    TYPE: "READONLY_TEXT",
    LABEL: "Text",
    CARD_LAYOUT: "TextCell",
    CELL_LAYOUT: "TextCell",
    MODEL_LAYOUT: "v-text-field",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "TextFormatOptional",
    ICON: "mdi-format-header-1",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "LINK_TEXT": {
    TYPE: "LINK_TEXT",
    LABEL: "Link",
    CARD_LAYOUT: "TextLinkCell",
    CELL_LAYOUT: "TextLinkCell",
    MODEL_LAYOUT: "v-text-field",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "TextFormatOptional",
    ICON: "mdi-format-header-1",
    OPERATORS: [
      OPERATIONS.Contains,
      OPERATIONS.StartsWith,
      OPERATIONS.EndsWith,
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.TEXT,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },

  "TEXT": {
    TYPE: "TEXT",
    LABEL: "Text",
    CARD_LAYOUT: "TextCell",
    CELL_LAYOUT: "TextCell",
    MODEL_LAYOUT: "v-text-field",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "TextFormatOptional",
    ICON: "mdi-format-text",
    OPERATORS: [
      OPERATIONS.Contains,
      OPERATIONS.StartsWith,
      OPERATIONS.EndsWith,
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.TEXT,
    SUBS_TYPE: {
      NAME: "NAME",
      COMPANY_NAME: "COMPANY_NAME",
      TITLE: "TITLE",
      TOTAL_DAY: "TOTAL_DAY",
      IBAN: "IBAN"
    },
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },

  "LONG_TEXT": {
    TYPE: "LONG_TEXT",
    LABEL: "Long Text",
    CARD_LAYOUT: "TextCell",
    CELL_LAYOUT: "TextCell",
    MODEL_LAYOUT: "v-textarea",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "TextFormatOptional",
    ICON: "mdi-text-subject",
    OPERATORS: [
      OPERATIONS.Contains,
      OPERATIONS.StartsWith,
      OPERATIONS.EndsWith,
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.TEXT,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "LABELS": {
    TYPE: "LABELS",
    LABEL: "Labels",
    CARD_LAYOUT: "LabelsCell",
    CELL_LAYOUT: "LabelsCell",
    MODEL_LAYOUT: "v-combobox",
    SOURCE_LAYOUT: "LabelsSource",
    OPTIONAL_LAYOUT: "LabelsFormatOptional",
    ICON: "mdi-tag",
    OPERATORS: [
      OPERATIONS.Is,
      OPERATIONS.IsNot,
      OPERATIONS.IsAnyOf,
      OPERATIONS.IsAllOf,
      OPERATIONS.IsNoneOf
    ],
    FILTER_TYPE: FILTER_TYPES.LIST,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "COMBOBOX": {
    TYPE: "COMBOBOX",
    LABEL: "Labels",
    CARD_LAYOUT: "ComboboxCell",
    CELL_LAYOUT: "ComboboxCell",
    MODEL_LAYOUT: "v-combobox",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-tag",
    OPERATORS: [
      OPERATIONS.Is,
      OPERATIONS.IsNot,
      OPERATIONS.IsAnyOf,
      OPERATIONS.IsAllOf,
      OPERATIONS.IsNoneOf
    ],
    FILTER_TYPE: FILTER_TYPES.LIST,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },

  "MEMBER": {
    TYPE: "MEMBER",
    LABEL: "Member",
    CARD_LAYOUT: "MemberCell",
    CELL_LAYOUT: "MemberCell",
    MODEL_LAYOUT: "MemberModel",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-account",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "ASSIGN_MEMBER": {
    TYPE: "ASSIGN_MEMBER",
    LABEL: "Assign Member",
    CARD_LAYOUT: "AssignMembersCell",
    CELL_LAYOUT: "AssignMembersCell",
    MODEL_LAYOUT: "v-autocomplete",
    SOURCE_LAYOUT: "AssignMembersSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-account-multiple-plus",
    OPERATORS: [
      OPERATIONS.Is,
      OPERATIONS.IsNot,
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty,
      OPERATIONS.IsAnyOf,
      OPERATIONS.IsNoneOf
    ],
    FILTER_TYPE: FILTER_TYPES.LIST,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
    // 'menu-cell-assignMembers'
  },
  "SELECT": {
    TYPE: "SELECT",
    LABEL: "Select",
    CARD_LAYOUT: "SelectCell",
    CELL_LAYOUT: "SelectCell",
    MODEL_LAYOUT: "v-select",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-format-list-bulleted",
    OPERATORS: [
      OPERATIONS.Is,
      OPERATIONS.IsNot,
      OPERATIONS.IsAnyOf,
      OPERATIONS.IsAllOf,
      OPERATIONS.IsNoneOf
    ],
    FILTER_TYPE: FILTER_TYPES.LIST,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "COMMENTS": {
    TYPE: "COMMENTS",
    LABEL: "Comments",
    CARD_LAYOUT: "CommentsCell",
    CELL_LAYOUT: "CommentsCell",
    MODEL_LAYOUT: "CommentsModel",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-comment-text-multiple",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "ATTACHMENT": {
    TYPE: "ATTACHMENT",
    LABEL: "Attachments",
    CARD_LAYOUT: "FileUploadCell",
    CELL_LAYOUT: "FileUploadCell",
    MODEL_LAYOUT: "v-file-input",
    SOURCE_LAYOUT: "FileUploadSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-attachment",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "PICTURE": {
    TYPE: "PICTURE",
    LABEL: "Picture",
    CARD_LAYOUT: "PictureCell",
    CELL_LAYOUT: "PictureCell",
    MODEL_LAYOUT: "PictureItem",
    SOURCE_LAYOUT: "PictureSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-camera-image",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "LOCATION": {
    TYPE: "LOCATION",
    LABEL: "Location",
    CARD_LAYOUT: "LocationCell",
    CELL_LAYOUT: "LocationCell",
    MODEL_LAYOUT: "LocationModel",
    SOURCE_LAYOUT: "LocationSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-map-marker",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "LINK": {
    TYPE: "LINK",
    LABEL: "Link",
    CARD_LAYOUT: "UrlsCell",
    CELL_LAYOUT: "UrlsCell",
    MODEL_LAYOUT: "v-combobox",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-link",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "INTEGER": {
    TYPE: "INTEGER",
    LABEL: "Numeric",
    CARD_LAYOUT: "TextCell",
    CELL_LAYOUT: "TextCell",
    MODEL_LAYOUT: "v-text-field",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-numeric",
    OPERATORS: [
      OPERATIONS.EqualTo,
      OPERATIONS.LessThan,
      OPERATIONS.LessThanOrEqualTo,
      OPERATIONS.GreaterThan,
      OPERATIONS.GreaterThanOrEqualTo,
      OPERATIONS.IsBetween
    ],
    FILTER_TYPE: FILTER_TYPES.NUMBER,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "DROPDOWN": {
    TYPE: "DROPDOWN",
    LABEL: "Drop Down",
    CARD_LAYOUT: "StatusCell",
    CELL_LAYOUT: "StatusCell",
    MODEL_LAYOUT: "v-select",
    SOURCE_LAYOUT: "StatusSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-flag-variant",
    OPERATORS: [
      OPERATIONS.Is,
      OPERATIONS.IsNot,
      OPERATIONS.IsAnyOf,
      OPERATIONS.IsAllOf,
      OPERATIONS.IsNoneOf
    ],
    FILTER_TYPE: FILTER_TYPES.LIST,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "DATE": {
    TYPE: "DATE",
    LABEL: "Date",
    CARD_LAYOUT: "DateCell",
    CELL_LAYOUT: "DateCell",
    MODEL_LAYOUT: "DateItem",
    SOURCE_LAYOUT: "DateSource",
    OPTIONAL_LAYOUT: "DateFormatOptional",
    ICON: "mdi-calendar",
    OPERATORS: [
      OPERATIONS.ThisWeek,
      OPERATIONS.ThisMonth,
      OPERATIONS.ToDay,
      OPERATIONS.EqualTo,
      OPERATIONS.Before,
      OPERATIONS.After,
      OPERATIONS.IsBetween,
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.DATE_TIME,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "DATE_TIME": {
    TYPE: "DATE_TIME",
    LABEL: "Date & Time",
    CARD_LAYOUT: "DateTimeCell",
    CELL_LAYOUT: "DateTimeCell",
    MODEL_LAYOUT: "DateTimeFormItem",
    SOURCE_LAYOUT: "DateTimeSource",
    OPTIONAL_LAYOUT: "DateFormatOptional",
    ICON: "mdi-calendar-clock",
    OPERATORS: [
      OPERATIONS.ThisWeek,
      OPERATIONS.ThisMonth,
      OPERATIONS.ToDay,
      OPERATIONS.EqualTo,
      OPERATIONS.Before,
      OPERATIONS.After,
      OPERATIONS.IsBetween,
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.DATE_TIME,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "PARSE_LINKS": {
    TYPE: "PARSE_LINKS",
    LABEL: "Parse Links",
    CARD_LAYOUT: "DateTimeCell",
    CELL_LAYOUT: "DateTimeCell",
    MODEL_LAYOUT: "DateTimeFormItem",
    SOURCE_LAYOUT: "DateTimeSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-calendar",
    OPERATORS: [
      OPERATIONS.ThisWeek,
      OPERATIONS.ThisMonth,
      OPERATIONS.ToDay,
      OPERATIONS.EqualTo,
      OPERATIONS.Before,
      OPERATIONS.After,
      OPERATIONS.IsBetween,
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.DATE_TIME,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },

    "CHECKBOX": {
      TYPE: "CHECKBOX",
      LABEL: "Checkbox",
      CARD_LAYOUT: "CheckboxCell",
      CELL_LAYOUT: "CheckboxCell",
      MODEL_LAYOUT: "v-checkbox",
      SOURCE_LAYOUT: "Source",
      OPTIONAL_LAYOUT: "OtherFormatOptional",
      ICON: "mdi-checkbox-marked",
      OPERATORS: [
        OPERATIONS.Checked, OPERATIONS.NotChecked
      ],
      FILTER_TYPE: FILTER_TYPES.BOOLEAN,
      CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
    },
  "LIST": {
    TYPE: "LIST",
    LABEL: "List",
    CARD_LAYOUT: "ListCell",
    CELL_LAYOUT: "ListCell",
    MODEL_LAYOUT: "v-autocomplete",
    SOURCE_LAYOUT: "ListSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-format-list-bulleted",
    OPERATORS: [
      OPERATIONS.Is,
      OPERATIONS.IsNot,
      OPERATIONS.IsAnyOf,
      OPERATIONS.IsAllOf,
      OPERATIONS.IsNoneOf
    ],
    FILTER_TYPE: FILTER_TYPES.LIST,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "EMAIL": {
    TYPE: "EMAIL",
    LABEL: "Email",
    CARD_LAYOUT: "TextCell",
    CELL_LAYOUT: "TextCell",
    MODEL_LAYOUT: "v-text-field",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-email",
    OPERATORS: [
      OPERATIONS.Contains,
      OPERATIONS.StartsWith,
      OPERATIONS.EndsWith,
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.TEXT,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "PHONE_NUMBER": {
    TYPE: "PHONE_NUMBER",
    LABEL: "Phone Number",
    CARD_LAYOUT: "TextCell",
    CELL_LAYOUT: "TextCell",
    MODEL_LAYOUT: "v-text-field",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-phone",
    OPERATORS: [
      OPERATIONS.Contains,
      OPERATIONS.StartsWith,
      OPERATIONS.EndsWith,
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.TEXT,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "ADDRESS": {
    TYPE: "ADDRESS",
    LABEL: "Address",
    CARD_LAYOUT: "TextCell",
    CELL_LAYOUT: "TextCell",
    MODEL_LAYOUT: "v-text-field",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-phone",
    OPERATORS: [
      OPERATIONS.Contains,
      OPERATIONS.StartsWith,
      OPERATIONS.EndsWith,
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.TEXT,
    SUBS_TYPE: {
      STATE: "STATE",
      ZIP_CODE: "ZIP_CODE",
      CITY: "CITY",
      COUNTY: "COUNTY",
      COUNTRY: "COUNTRY"
    },
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },

  "WEBSITE": {
    TYPE: "WEBSITE",
    LABEL: "Website",
    CARD_LAYOUT: "WebsiteCell",
    CELL_LAYOUT: "WebsiteCell",
    MODEL_LAYOUT: "v-text-field",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-earth",
    OPERATORS: [
      OPERATIONS.Contains,
      OPERATIONS.StartsWith,
      OPERATIONS.EndsWith,
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.TEXT,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "PROGRESS": {
    TYPE: "PROGRESS",
    LABEL: "Progress",
    CARD_LAYOUT: "ProgressCell",
    CELL_LAYOUT: "ProgressCell",
    // MODEL_LAYOUT: 'v-text-field',
    MODEL_LAYOUT: "v-range-slider",
    SOURCE_LAYOUT: "ProgressSource",
    OPTIONAL_LAYOUT: "ProgressFormatOptional",
    ICON: "mdi-timer-sand",
    OPERATORS: [
      OPERATIONS.EqualTo,
      OPERATIONS.LessThan,
      OPERATIONS.LessThanOrEqualTo,
      OPERATIONS.GreaterThan,
      OPERATIONS.GreaterThanOrEqualTo,
      OPERATIONS.IsBetween
    ],
    FILTER_TYPE: FILTER_TYPES.NUMBER,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "HEATMAP": {
    TYPE: "HEATMAP",
    LABEL: "Heatmap",
    CARD_LAYOUT: "HeatMapCell",
    CELL_LAYOUT: "HeatMapCell",
    // MODEL_LAYOUT: 'v-text-field',
    MODEL_LAYOUT: "v-range-slider",
    SOURCE_LAYOUT: "ProgressSource",
    OPTIONAL_LAYOUT: "HeatMapFormatOptional",
    ICON: "mdi-rectangle",
    OPERATORS: [
      OPERATIONS.EqualTo,
      OPERATIONS.LessThan,
      OPERATIONS.LessThanOrEqualTo,
      OPERATIONS.GreaterThan,
      OPERATIONS.GreaterThanOrEqualTo,
      OPERATIONS.IsBetween
    ],
    FILTER_TYPE: FILTER_TYPES.NUMBER,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "SPARK_LINE": {
    TYPE: "SPARK_LINE",
    LABEL: "Trend line",
    CARD_LAYOUT: "SparkLineCell",
    CELL_LAYOUT: "SparkLineCell",
    MODEL_LAYOUT: "v-range-slider",
    SOURCE_LAYOUT: "ProgressSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-chart-line",
    OPERATORS: [
      OPERATIONS.EqualTo,
      OPERATIONS.LessThan,
      OPERATIONS.LessThanOrEqualTo,
      OPERATIONS.GreaterThan,
      OPERATIONS.GreaterThanOrEqualTo,
      OPERATIONS.IsBetween
    ],
    FILTER_TYPE: FILTER_TYPES.NUMBER,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },

  "CONCORDANCE_PLOT": {
    TYPE: "CONCORDANCE_PLOT",
    LABEL: "Concordance",
    CARD_LAYOUT: "ConcordancePlotCell",
    CELL_LAYOUT: "ConcordancePlotCell",
    MODEL_LAYOUT: "v-range-slider",
    SOURCE_LAYOUT: "ProgressSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-barcode",
    OPERATORS: [
      OPERATIONS.EqualTo,
      OPERATIONS.LessThan,
      OPERATIONS.LessThanOrEqualTo,
      OPERATIONS.GreaterThan,
      OPERATIONS.GreaterThanOrEqualTo,
      OPERATIONS.IsBetween
    ],
    FILTER_TYPE: FILTER_TYPES.NUMBER,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "CONTENT_SEARCH": {
    TYPE: "CONTENT_SEARCH",
    LABEL: "Content Search",
    CARD_LAYOUT: "ContentSearchCell",
    CELL_LAYOUT: "ContentSearchCell",
    MODEL_LAYOUT: "v-text-field",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-link-variant",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "DOCUMENTS": {
    TYPE: "DOCUMENTS",
    LABEL: "Documents",
    CARD_LAYOUT: "DocumentsCell",
    CELL_LAYOUT: "DocumentsCell",
    MODEL_LAYOUT: "v-text-field",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-file-pdf-box",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },

  "NOTE": {
    TYPE: "NOTE",
    LABEL: "Notes",
    CARD_LAYOUT: "NoteCell",
    CELL_LAYOUT: "NoteCell",
    MODEL_LAYOUT: "v-text-field",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-book-open",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },

  "NOTE_CONTENT": {
    TYPE: "NOTE_CONTENT",
    LABEL: "Description",
    CARD_LAYOUT: "v-text-field",
    CELL_LAYOUT: "NoteCell",
    MODEL_LAYOUT: "NoteContentItem",
    SOURCE_LAYOUT: "Source",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-link-variant",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },

  "COLOR": {
    TYPE: "COLOR",
    LABEL: "Color",
    CARD_LAYOUT: "ColorCell",
    CELL_LAYOUT: "ColorCell",
    MODEL_LAYOUT: "ColorsItem",
    SOURCE_LAYOUT: "ColorsSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-format-color-fill",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "MONEY": {
    TYPE: "MONEY",
    LABEL: "Money",
    CARD_LAYOUT: "ColorCell",
    CELL_LAYOUT: "ColorCell",
    MODEL_LAYOUT: "ColorsItem",
    SOURCE_LAYOUT: "ColorsSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-currency-usd",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "NUMBER": {
    TYPE: "NUMBER",
    LABEL: "Number",
    CARD_LAYOUT: "ColorCell",
    CELL_LAYOUT: "ColorCell",
    MODEL_LAYOUT: "ColorsItem",
    SOURCE_LAYOUT: "ColorsSource",
    OPTIONAL_LAYOUT: "NumberFormatOptional",
    ICON: "mdi-numeric",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "PERCENTAGE": {
    TYPE: "PERCENTAGE",
    LABEL: "Percentage",
    CARD_LAYOUT: "ColorCell",
    CELL_LAYOUT: "ColorCell",
    MODEL_LAYOUT: "ColorsItem",
    SOURCE_LAYOUT: "ColorsSource",
    OPTIONAL_LAYOUT: "PercentageFormatOptional",
    ICON: "mdi-timer-sand",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },
  "RATING": {
    TYPE: "RATING",
    LABEL: "Rating",
    CARD_LAYOUT: "ColorCell",
    CELL_LAYOUT: "ColorCell",
    MODEL_LAYOUT: "ColorsItem",
    SOURCE_LAYOUT: "ColorsSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-star",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  },

  "ACTIONS": {
    TYPE: "ACTIONS",
    LABEL: "ACTIONS",
    CARD_LAYOUT: "ActionsCard",
    CELL_LAYOUT: "ActionsCell",
    MODEL_LAYOUT: "ActionsItem",
    SOURCE_LAYOUT: "ActionsSource",
    OPTIONAL_LAYOUT: "OtherFormatOptional",
    ICON: "mdi-link-variant",
    OPERATORS: [
      OPERATIONS.IsEmpty,
      OPERATIONS.IsNotEmpty
    ],
    FILTER_TYPE: FILTER_TYPES.BOOLEAN,
    CATEGORY_TYPE: CATEGORIES_TYPE.Generic.type
  }

}

export const TYPE_ODT_SEARCH = {
  OPINIONS: "o",
  RECAP: "r",
  JUDGES: "p",
  ORAL_ARGUMENTS: "oa"
}

export function getCardLayout (attributeType) {
  return ATTRIBUTE_FIELDS[attributeType].CARD_LAYOUT
}

export function getIconAttribute (attributeType) {
  return ATTRIBUTE_FIELDS[attributeType].ICON
}

export function getTitleAttribute (attributeType) {
  return ATTRIBUTE_FIELDS[attributeType].LABEL
}

export function getCellLayout (attributeType) {
  return ATTRIBUTE_FIELDS[attributeType].CELL_LAYOUT
}

export function getSourceLayout (attributeType) {
  return ATTRIBUTE_FIELDS[attributeType].SOURCE_LAYOUT
}

export function getClassCell (attributeType) {
  let NO_PADDING = [ATTRIBUTE_FIELDS.DROPDOWN.TYPE, ATTRIBUTE_FIELDS.PROGRESS.TYPE]
  return NO_PADDING.includes(attributeType) ? "item--cell--no_padding" : ""
}

export function getModelLayout (attributeType) {
  return ATTRIBUTE_FIELDS[attributeType].MODEL_LAYOUT
}

export function getOptionalLayout (attributeType) {
  return ATTRIBUTE_FIELDS[attributeType].OPTIONAL_LAYOUT
}

export function getSourceDataPredefined (attributeType) {
  return ATTRIBUTE_FIELDS[attributeType].SOURCE_DATA
}

export function getAttributeOptionalConfig (attributeType) {
  return ATTRIBUTE_FIELDS[attributeType].TYPE_OPTIONAL_CONFIG
}

export function getOperatorsAttribute (attributeType) {
  return ATTRIBUTE_FIELDS[attributeType].OPERATORS || []
}

export function getStatusColor (statusType) {
  try {
    return STATUS[statusType].COLOR
  } catch (e) {
    return ""
  }
}

export function $$layoutVisual (layoutType) {
  try {
    return LAYOUT_TYPES[layoutType].VISUAL
  } catch (e) {
    return false
  }
}

export const getCellsComponentAttributes = (() => {
  let view = (name, resolve) => {
    return function (resolve) {
      return require([`@/sat-vue-toolkit/components/slick-grid/attributes/cells/${name}.vue`], resolve)
    }
  }
  const requireComponent = require.context(
    // The relative path of the components folder
    "@/sat-vue-toolkit/components/slick-grid/attributes/cells",
    // Whether or not to look in subfolders
    false
  )
  const componentsName = uniqBy(
    map(requireComponent.keys(), (fileName) => {
      const componentName = upperFirst(
        camelCase(
          // Strip the leading `./` and extension from the filename
          fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
        )
      )
      return componentName
    })
  )
  let obj = {}
  for (let i = 0; i < componentsName.length; i++) {
    obj[componentsName[i]] = view(componentsName[i])
  }
  return obj
})()

export const registerCellsComponentAttributes = (() => {
  let view = (name, resolve) => {
    return function (resolve) {
      return require([`@/sat-vue-toolkit/components/slick-grid/attributes/cells/${name}.vue`], resolve)
    }
  }
  const requireComponent = require.context(
    // The relative path of the components folder
    "@/sat-vue-toolkit/components/slick-grid/attributes/cells",
    // Whether or not to look in subfolders
    false
  )
  const componentsName = uniqBy(
    map(requireComponent.keys(), (fileName) => {
      const componentName = upperFirst(
        camelCase(
          // Strip the leading `./` and extension from the filename
          fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
        )
      )
      return componentName
    })
  )
  let obj = {}
  for (let i = 0; i < componentsName.length; i++) {
    obj[componentsName[i]] = view(componentsName[i])
    Vue.component(componentsName[i], view(componentsName[i]))
  }
  // return obj
})
export const registerOptionalComponentAttributes = (() => {
  let view = (name, resolve) => {
    return function (resolve) {
      return require([`@/sat-vue-toolkit/components/slick-grid/components/customizeFields/OptionsByFieldType/${name}.vue`], resolve)
    }
  }
  const requireComponent = require.context(
    // The relative path of the components folder
    "@/sat-vue-toolkit/components/slick-grid/components/customizeFields/OptionsByFieldType",
    // Whether or not to look in subfolders
    false
  )
  const componentsName = uniqBy(
    map(requireComponent.keys(), (fileName) => {
      const componentName = upperFirst(
        camelCase(
          // Strip the leading `./` and extension from the filename
          fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
        )
      )
      return componentName
    })
  )
  let obj = {}
  for (let i = 0; i < componentsName.length; i++) {
    obj[componentsName[i]] = view(componentsName[i])
    Vue.component(componentsName[i], view(componentsName[i]))
  }
  // return obj
})

export const getSourcesComponentAttributes = (() => {
  let view = (name, resolve) => {
    return function (resolve) {
      return require([`@/sat-vue-toolkit/components/slick-grid/attributes/sources/${name}.vue`], resolve)
    }
  }
  const requireComponent = require.context(
    // The relative path of the components folder
    "@/sat-vue-toolkit/components/slick-grid/attributes/sources",
    // Whether or not to look in subfolders
    false
  )
  const componentsName = uniqBy(
    map(requireComponent.keys(), (fileName) => {
      const componentName = upperFirst(
        camelCase(
          // Strip the leading `./` and extension from the filename
          fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
        )
      )
      return componentName
    })
  )
  let obj = {}
  for (let i = 0; i < componentsName.length; i++) {
    // console.error('source', obj[componentsName[i]])
    obj[componentsName[i]] = view(componentsName[i])
  }
  return obj
})()

