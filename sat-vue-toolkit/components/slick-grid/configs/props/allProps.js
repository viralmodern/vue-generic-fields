import {
    ATTRIBUTE_FIELDS,
    LAYOUT_TYPES_DEFAULT,
    COLORS,
    COUNT_LABEL_DATA,
    LAYOUT_TYPES,
    SLICK_GRID,
    SORT_TYPE
} from "../attribute"

export const allPropsApp = {
  $ATTRIBUTE_FIELDS: {
    type: Object,
    default: () => ATTRIBUTE_FIELDS
  },
  endPoint: {
    type: String
  },
  uniqueId: {
    type: [String, Number],
    default: () => "pk"
  },
  attribute: {
    type: Object,
    default: () => ({})
  },
  cellPk: {
    type: [String, Number],
    default: ""
  },
  disabledOwnerRow: {
    type: Boolean,
    default: () => false
  },
  value: {},
  isOwnerRow: {
    type: Boolean,
    default: () => false
  },
  colors: {
    type: Array,
    default: () => COLORS
  },
  rowId: {
    type: [String, Number]
  },
  totalComments: {
    type: Number,
    default: 0
  },
  commented: {
    type: Boolean,
    default: () => false
  },
  showTotal: {
    type: Number,
    default: () => 3
  },
  row: {
    type: Object,
    default: () => ({})
  },
  vBind: {
    type: Object,
    default: () => ({})
  },
  showRowTextContent: {
    type: Boolean,
    default: () => false
  },
  pinnedRow: {
    type: Boolean,
    default: () => false
  },
  pinnedRowId: {
    type: String,
    default: () => ``
  },
  busEventName: {
    type: String,
    default: () => ""
  },
  busEventLoadRow: {
    type: String,
    default: () => "bus-load-row"
  },
  busEventUpdateRow: {
    type: String,
    default: () => "bus-update-row"
  },
  busEventDeletedRow: {
    type: String,
    default: () => "busDeletedRow"
  },
  busEventHoverCell: {
    type: String,
    default: () => "busEventHoverCell"
  },
  isOffline: {
    type: Boolean,
    default: () => false
  },
  // header
  $$SORT_TYPE: {
    default: () => SORT_TYPE
  },
  hover: {
    type: Boolean,
    default: () => true
  },
  attributes: {
    type: Array,
    default: () => []
  },
  attributesPinned: {
    type: Array,
    default: () => []
  },
  attributesFree: {
    type: Array,
    default: () => []
  },

  totalTask: {
    type: [Number],
    default: 0
  },
  totalTaskServer: {
    type: [Number],
    default: 0
  },

  hideAttributes: {
    type: Boolean,
    default: () => false
  },
  groupBy: {
    type: Boolean,
    default: () => false
  },
  isGrouped: {
    type: Boolean,
    default: () => false
  },
  groupType: {
    type: String,
    default: () => ""
  },
  childInfo: {
    type: [String, Object, Array, Date]
  },
  isExpanded: {
    type: Boolean,
    default: () => true
  },

  list: {
    type: Array,
    default: () => []
  },
  disabledAddNewColumn: {
    type: Boolean,
    default: () => false
  },
  mainCellId: {
    type: [String, Number],
    default: () => "pk"
  },

  countLabelSingular: {
    type: [String, Number],
    default: () => COUNT_LABEL_DATA.countLabelSingular
  },
  countLabelMany: {
    type: [String, Number],
    default: () => COUNT_LABEL_DATA.countLabelMany
  },
  labelUnGroup: {
    type: [String],
    default: COUNT_LABEL_DATA.labelUnGroup
  },
  noGroup: {
    type: Boolean,
    default: () => false
  },
  disabledFilterRow: {
    type: Boolean,
    default: () => false
  },

  // row props
  item: {
    type: Object,
    default: () => {
    }
  },

  rowIndex: {
    type: Number,
    default: () => 0
  },
  rowSelected: {
    type: Boolean,
    default: () => false
  },

  isCreated: {
    type: Boolean,
    default: false
  },
  isBookmark: {
    type: Boolean,
    default: () => false
  },
  id: {
    type: [String, Number],
    default: () => ''
  },
  userAccount: {
    type: [String, Number],
    default: () => ''
  },
  ownerName: {
    type: [String],
    default: () => 'creator',
    required: true
  },

  pathLink: {
    type: [String, Object],
    default: () => '/matters'
  },
  noLinkDetail: {
    type: Boolean,
    default: () => false
  },
  disabledVoteRow: {
    type: Boolean,
    default: () => true
  },
  hasReportRow: {
    type: Boolean,
    default: () => false
  },
  disabledBookmarkRow: {
    type: Boolean,
    default: () => false
  },


  $$deletingRow: {
    type: Boolean,
    default: () => false
  },

  groupByItem: {
    type: String,
    default: () => ""
  },
  // base slickGrid
  defaultType: {
    type: String,
    default: () => LAYOUT_TYPES_DEFAULT
  },
  compactRow: {
    type: Boolean,
    default: () => true
  },
  darkApp: {
    type: Boolean,
    default: SLICK_GRID.DARK
  },

  layoutTypes: {
    type: [Object, Array],
    default: () => LAYOUT_TYPES
  },
  includeLayoutType: {
    type: [Object, Array],
    default: () => []
  },
  excludeLayoutType: {
    type: [Object, Array],
    default: () => []
  },


  items: {
    type: [Object, Array],
    default: () => []
  },

  showQuickAddRow: {
    type: Boolean,
    default: () => false
  },
  uiShowAddRowModal: {
    type: Boolean,
    default: () => true
  },
  showPagination: {
    type: Boolean,
    default: () => true
  },


  height: {
    type: [Number, String],
    default: "85vh"
  },
  noQueryParams: {
    type: Boolean,
    // default: () => false,
    default: () => true,
  },
  excludeParams: {
    type: Array,
    default: () => []
  },
  includeParams: {
    type: Object,
    default: () => ({})
  },
  includeHeaders: {
    type: Object,
    default: () => ({})
  },
  country: {
    type: [String],
    default: "Vietnam"
  },
  showSettings: {
    type: Boolean,
    default: () => true
  },
  showButtonQuickAddModal: {
    type: Boolean,
    default: () => true
  },

  ownerPk: {
    type: [String, Number],
    default: () => ""
  },
  creatorName: {
    type: [String],
    default: () => "creator"
  },

  pathLinkRowDetail: {
    type: String,
    default: () => "/"
  },

  noPrint: {
    type: Boolean,
    default: () => false
  },
  noExport: {
    type: Boolean,
    default: () => false
  },

  disabledOverflowScrollBody: {
    type: Boolean,
    default: () => false
  },

  disabledSort: {
    type: Boolean,
    default: () => false
  },
  /*

  * */
  disabledCustomizeField: {
    type: Boolean,
    default: () => false
  },
  disabledFilter: {
    type: Boolean,
    default: () => false
  },

  disableAddNewToMany: {
    type: Boolean,
    default: () => false
  },
  disabledAddNewRow: {
    type: Boolean,
    default: () => false
  },
  enabledOrderRow: {
    type: Boolean,
    default: () => false
  },


  itemsPerPage: {
    type: Number,
    default: () => 20
  },
  eventNameByField: {
    type: String,
    default: () => ''
  },
  eventEndByField: {
    type: String,
    default: () => ''
  },
  eventStartByField: {
    type: String,
    default: () => ''
  },
  // source props
  endPointList: {
    type: String,
    default: () => ''
  },
  $$execute: {
    type: [Array, Function, null],
    default: () => []
  },
 // base view props
  combinedRowsData: {
    type: [Object, Array],
    default: () => []
  },
  selectedRows: {
    type: [Object, Array],
    default: () => []
  },

  loading: {
    type: Boolean,
    default: () => true
  },
  isUngroup: {
    type: Boolean,
    default: () => true
  },

  fieldsConfig: {
    type: Array,
    default: () => []
  },
  groupItems: {
    type: Array,
    default: () => []
  },
  collapse: {
    type: Array,
    default: () => []
  },

}
