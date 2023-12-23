import {
  LAYOUT_TYPES_DEFAULT
} from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"
import { allPropsApp } from "./allProps"

let {
  defaultType, compactRow, darkApp, layoutTypes, includeLayoutType, excludeLayoutType,
  items, showQuickAddRow, uiShowAddRowModal, showPagination, height, noQueryParams, excludeParams,
  includeParams, includeHeaders, country, showSettings, showButtonQuickAddModal,
  ownerPk, creatorName, pathLinkRowDetail, noPrint, noExport, disabledOverflowScrollBody,
  disabledSort, disabledCustomizeField, disabledFilter, disableAddNewToMany,
  disabledAddNewRow, enabledOrderRow, itemsPerPage, eventNameByField, eventEndByField, eventStartByField,
  disabledBookmarkRow,
  noGroup,
  disabledAddNewColumn,
  endPoint,
  labelUnGroup,
  countLabelMany,
  countLabelSingular,
  disabledOwnerRow,
  uniqueId,
  busEventName,
  busEventLoadRow,
  busEventUpdateRow,
  busEventDeletedRow,
  busEventHoverCell,
  disabledVoteRow,
  hasReportRow,
  noLinkDetail,
  pinnedRow,
  pinnedRowId,
  isOffline,
  attributes
} = allPropsApp
export default {
  disabledBookmarkRow,
  disabledAddNewColumn,
  noGroup,
  endPoint,
  labelUnGroup,
  countLabelMany,
  countLabelSingular,
  disabledOwnerRow,
  uniqueId,
  busEventName,
  busEventLoadRow,
  busEventUpdateRow,
  busEventDeletedRow,
  busEventHoverCell,
  disabledVoteRow,
  hasReportRow,
  noLinkDetail,
  pinnedRow,
  pinnedRowId,
  isOffline,
  defaultType, compactRow, darkApp, layoutTypes, includeLayoutType, excludeLayoutType,
  items, showQuickAddRow, uiShowAddRowModal, showPagination, height, noQueryParams, excludeParams,
  includeParams, includeHeaders, country, showSettings, showButtonQuickAddModal,
  ownerPk, creatorName, pathLinkRowDetail, noPrint, noExport, disabledOverflowScrollBody,
  disabledSort, disabledCustomizeField, disabledFilter, disableAddNewToMany,
  disabledAddNewRow, enabledOrderRow, itemsPerPage, eventNameByField, eventEndByField, eventStartByField,
  attributes
}
export const viewsData = {
  search: "",
  loading: false,
  isSkeletonLoader: null,
  statusCode: 200,
  mode: false,
  fieldsConfig: [],
  sortConfig: [],
  ungroup: true,
  dataGroup: null,
  // dataGroup: null || JSON.parse(localStorage.getItem('dataGroup')),
  dataGroupCombined: null,
  // groupType: null,
  groupItems: [],
  // group_items: "",
  queryParams: null,
  ordering: null,
  queryStringParamsOrdering: null,
  totalFilter: 0,
  queryStringParamsFilter: null,
  predicate: null,
  // control
  collapse: [],
  rowsSelected: {},
  fieldSelected: {

  },
  operationsFieldSelected: {

  },
  // layout
  layoutType: LAYOUT_TYPES_DEFAULT,
  defaultCompactRow: true,
  disabledFilterRow: false,
  // todo print
  uiShowModalPrint: false,
  headersPrint: [],
  dessertsPrint: [],
  // tooltip option
  tooltipOption: {}
}
