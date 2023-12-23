<template>
  <v-card class="slickGridApp" :color="`${!isDark && '#eeeeee'}`" :class="attrsBase" :loading="loading" elevation="0"
    :style="{ 'border-color': isDark && 'rgba(255,255,255,0.2)' || 'rgba(0,0,0,0.05)' }" :disabled="loading">
    <div class="mb-1">
      <v-card flat tile>
        <v-card-text class="py-0 px-0">
          <div class="header-setting d-flex align-center px-2" v-if="showSettings">
            <MenuChoicesLayoutTypes :types="$$layoutTypes" @change-layout="changeLayout" v-model="layoutType" />
            <div class="mx-1"></div>
            <template v-if="!disabledSort">
              <SortBuilder :attributes="fieldsConfig" :query-params="queryRoute" @resetFields="sortFields" />
              <div class="mx-1"></div>
            </template>
            <template v-if="!disabledFilter">
              <MenuFilterBuilder :attributes="fieldsConfig" :total-filter="totalFilter"
                v-model="queryStringParamsFilter" />
              <div class="mx-1"></div>
            </template>
            <template v-if="!disabledCustomizeField">
              <CustomizeFieldsBuilder :fields-config="fieldsConfig" item-value="name" item-text="label"
                :item-ghost="getMainCellId" @resetFields="resetFields" />
              <div class="mx-1"></div>
            </template>
            <template v-if="!noGroup">
              <GroupByFilterChoices :options="attributesByGroup" :val="group_items" :group-type="groupType"
                @clearable="clearGroupBy" @changed="changedGroupBy" />
              <div class="mx-1"></div>
            </template>
            <template v-if="!noPrint">
              <btn-link label="Print" @click="printPaper" icon="mdi-printer" />
              <div class="mx-1"></div>
            </template>
            <template v-if="!noExport">
              <btn-link label="CSV" @click="exportCsvFile" icon="mdi-cloud-download" />
              <div class="mx-1"></div>
            </template>
            <template>
              <btn-link label="Filter Row" @click.stop="disabledFilterRow = !disabledFilterRow"
                :input-value="!disabledFilterRow"
                :icon="!disabledFilterRow ? `mdi-filter-outline` : `mdi-filter-remove-outline`" />
              <div class="mx-1"></div>
            </template>
            <template>
              <btn-link label="Compact Row" @click.stop="defaultCompactRow = !defaultCompactRow"
                :input-value="defaultCompactRow"
                :icon="defaultCompactRow ? `mdi-toggle-switch` : `mdi-toggle-switch-off`" />

            </template>
            <v-spacer />
            <slot name="right-header">
            </slot>
          </div>
          <v-divider style="opacity: 0.4" />
        </v-card-text>
      </v-card>
    </div>
    <template v-if="isSkeletonLoader">
      <SkeletonLoaderApp :skeleton-loader-layouts="skeletonLoaderLayouts" />
    </template>
    <div class="py-0 px-0" v-else>
      <div class="dashboard-table-scroll" :style="{ height: height }" :id="idSlickGrid">
        <keep-alive>
          <component class="dashboard-table-scroll_body" :class="baseBodyClassName" :is="viewLayout"
            :selected-rows="selectedRows" :combined-rows-data="combinedRowsData" :loading="loading"
            :disabledAddNewColumn="disabledAddNewColumn" :disabledAddNewRow="disabledAddNewRow"
            :disabledBookmarkRow="disabledBookmarkRow" :disabledFilterRow="disabledFilterRow"
            :no-query-params="noQueryParams" :items="items" :fields-config="fieldsConfig" :end-point="endPoint"
            :enabled-order-row="enabledOrderRow" :group-type="groupType" :label-un-group="labelUnGroup"
            :count-label-many="countLabelMany" :count-label-singular="countLabelSingular" :group-items="groupItems"
            :no-group="noGroup" :main-cell-id="getMainCellId" :user-account="userPk"
            :disabled-owner-row="disabledOwnerRow" :creator-name="creatorName" :path-link-row-detail="pathLinkRowDetail"
            :unique-id="uniqueId" :bus-event-name="busEventName" :bus-event-load-row="busEventLoadRow"
            :bus-event-update-row="busEventUpdateRow" :bus-event-deleted-row="busEventDeletedRow"
            :bus-event-hover-cell="busEventHoverCell" :disabled-vote-row="disabledVoteRow" :has-report-row="hasReportRow"
            :no-link-detail="noLinkDetail" :pinned-row="pinnedRow" :pinned-row-id="pinnedRowId" :is-ungroup="isUngroup"
            :event-name-by-field="eventNameByField" :event-start-by-field="eventStartByField"
            :event-end-by-field="eventEndByField" :isOffline="isOffline" @onCollapse="onCollapse"
            @getExpandGroup="getExpandGroup" @sortField="sortField" @orderRow="orderRow" @clickRow="clickRow"
            @selectedRow="selectedRow" @showAddRowModal="showAddRowModal" @paginate="paginate" @showTooltip="showTooltip"
            @showContext="showContext" @setRuleFilterField="setRuleFilterField">
            <template v-slot:header-add-field>
              <CreateFieldsGeneric @onFieldsChange="onFieldsChange" />
            </template>
          </component>
        </keep-alive>
        <template v-if="!disabledAddNewRow">
          <v-btn fab v-if="showButtonQuickAddModal" fixed bottom right style="transform: translateY(-20px)"
            color="primary" small @click="showAddRowModal('ungroup')">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </div>
    </div>
    <div :data-attributes="JSON.stringify(fieldsConfig)" id="hidden-fields"></div>
    <div id="tooltip-info-app">
      <TooltipContentMedium :options="tooltipOption" />
    </div>
  </v-card>
</template>

<script>
// todo: skeleton loader app
import SkeletonLoaderApp from "~/sat-vue-toolkit/components/slick-grid/components/SkeletonLoaderApp"
// todo: layout config customize fields (show/hide)
import CustomizeFieldsBuilder from "./control/CustomizeFieldsBuilder.vue"
// todo: layout headers
import GroupByFilterChoices from "../GroupByFilterChoices.vue"
// todo: layout change layout type
import MenuChoicesLayoutTypes from "./control/MenuChoicesLayoutTypes.vue"
import SortBuilder from "./control/SortBuilder.vue"
import MenuFilterBuilder from "@/sat-vue-toolkit/components/slick-grid/control/MenuFilterBuilder.vue"
import BtnLink from "@/sat-vue-toolkit/components/BtnLink.vue"
import assign from "lodash/assign"
import { LAYOUT_TYPES } from "./configs/attribute"
import {
  getRowDataString,
  printCsvFile,
  $$totalTask,
  $$totalTaskServer, $$results, $$keyRow
} from "@/sat-vue-toolkit/functions"
import viewsProps, { viewsData } from "~/sat-vue-toolkit/components/slick-grid/configs/props/baseSlickGridProps"
import {
  $$existQueryRouteParams,
  $$handleExcludeQueryParams,
  convertQueryParamsToQueryFilter,
  removeQueryFilterFromQueryParams
} from "@/sat-vue-toolkit/components/slick-grid/helpers/queryParams"
import {
  $$addNewRow,
  $$deleteRow,
  $$fetchEntries,
  $$loadRowDetail,
  $$paginateRows,
  $$generatorDummyRows,
  $$updateOrderField
} from "@/sat-vue-toolkit/components/slick-grid/helpers/coreCurd"
import {
  $$initSortFields,
  $$sortField,
  $$sortFields
} from "@/sat-vue-toolkit/components/slick-grid/helpers/sort"
import { $$initInteract } from "@/sat-vue-toolkit/components/slick-grid/helpers/resizeColumns"
import printJS from "print-js"
import { $$layoutTypes, $$setEntriesSelected } from "@/sat-vue-toolkit/components/slick-grid/helpers/helpers"
import { reduceAttributes } from "@/sat-vue-toolkit/components/slick-grid/helpers/attributes"

import BaseCalendarView from "~/sat-vue-toolkit/components/slick-grid/views/BaseCalendarView.vue"
import BaseTableView from "~/sat-vue-toolkit/components/slick-grid/views/BaseTableView.vue"
import BaseListView from "~/sat-vue-toolkit/components/slick-grid/views/BaseListView.vue"
import BaseKanbanView from "~/sat-vue-toolkit/components/slick-grid/views/BaseKanbanView.vue"
import { ACTIONS_FIELD, BUS_EVENT } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"
import CreateFieldsGeneric
  from "~/sat-vue-toolkit/components/slick-grid/components/customizeFields/CreateFieldsGeneric.vue"
import { $createMenuPortal, $createTooltip } from "~/sat-vue-toolkit/functions/mouse"
import TooltipContentMedium from "~/sat-vue-toolkit/components/Common/TooltipContentMedium.vue"

export default {
  name: "SlickGrid",
  components: {
    TooltipContentMedium,
    CreateFieldsGeneric,
    BaseKanbanView,
    BaseListView,
    BaseTableView,
    BaseCalendarView,

    SkeletonLoaderApp,
    BtnLink,
    MenuFilterBuilder,
    SortBuilder,
    MenuChoicesLayoutTypes,
    // TreeChoices,
    GroupByFilterChoices,
    CustomizeFieldsBuilder
  },
  props: {
    ...viewsProps
  },
  data() {
    return {
      ...viewsData
    }
  },
  events: {

  },
  async mounted() {
    console.error("ALL_PROPS", this)
    this.mode = true
    this.initSortFields()
    this.initQueryParamsFilter()
    this.initLayoutType()
    await this.fetchEntries()
    this.generateRows()
    try {
      this.initInteract()
      this.$eventHub.$on(this.busEventLoadRow, this.loadRowDetail)
      this.$eventHub.$on(this.busEventDeletedRow, this.deleteRow)
    } catch (err) {
      console.error(err.message)
    }
    this.$watch("rowsSelected", this.handleRowsSelected)
    this.$events.on("uiShowEntriesSettingClose", this.handleRowsSelectedReset)
    this.$events.on(BUS_EVENT.FIELD_SETTING_CHANGE, this.fieldChangeSetting)
  },
  computed: {
    isDark() {
      return this.$vuetify.theme.dark
    },
    selectedRows() {
      try {
        let { rowsSelected, uniqueId } = this
        let t = [...Object.values(rowsSelected)]
        if (t.length > 0) {
          return t.map(it => it[uniqueId])
        }
        return []
      } catch (e) {
        return []
      }
    },
    skeletonLoaderLayouts() {
      let { layoutType, layoutTypes } = this
      let types = "", l = 1, fullWidth = false, cols = ""
      switch (layoutType) {
        case layoutTypes.COLUMNS.TYPE:
          types = "article, actions"
          fullWidth = false
          l = 4
          cols = ""
          break
        case layoutTypes.LIST.TYPE:
          types = "list-item"
          fullWidth = true
          l = 6
          cols = 12
          break
        default:
          types = "table"
          fullWidth = true
          cols = 12
          break
      }
      return { types, l, fullWidth, vBind: { cols } }
    },
    attributesByGroup() {
      try {
        return this.fieldsConfig.filter(attribute => attribute.groupBy)
      } catch (e) {
        return []
      }
    },
    getMainCellId() {
      let { mainCellId, fieldsConfig } = this
      try {
        if (mainCellId) {
          return mainCellId
        }
        return fieldsConfig[0]["name"]
      } catch (e) {
        return "pk"
      }
    },
    userPk() {
      return this.ownerPk || this.$store.getters["auth/userPk"]
    },
    viewLayout() {
      let { layoutType } = this
      return LAYOUT_TYPES[layoutType].VIEW_LAYOUT
    },
    baseBodyClassName() {
      return LAYOUT_TYPES[this.layoutType].W_BODY_CLASS
    },
    idSlickGrid() {
      return `print-table-${this.endPoint}`
    },
    $$layoutTypes() {
      return $$layoutTypes(assign(this.layoutTypes), this.includeLayoutType, this.excludeLayoutType)
    },
    curdProperties() {
      let params = {
        dataGroup: { ...this.dataGroup },
        ungroup: this.isUngroup,
        mode: this.mode, endPoint: this.endPoint,
        includeParams: this.includeParams,
        excludeParams: this.excludeParams,
        noQueryParams: this.noQueryParams,
        items: this.dummyRows,
        $api: this.$api,
        queryParams: this.rgx,
        mainCellId: this.getMainCellId,
        uniqueId: this.uniqueId,
        isOffline: this.isOffline

      }
      return params
    },
    dummyRows() {
      let { fieldsConfig, items } = this
      if (items) {
        if (Array.isArray(items) && items.length) {
          return items
        } else if (Object.keys(items).length > 0) {
          return items
        }
      }
      console.error("fieldsConfig", { fieldsConfig, items })
      return $$generatorDummyRows(fieldsConfig, 15)
    },
    combinedRowsData() {
      let { noQueryParams, dataGroup, dummyRows } = this
      // return dataGroup
      if (noQueryParams) {
        console.error("dummyRows", dummyRows)
        if (Boolean(dummyRows)) {
          if (Array.isArray(dummyRows)) {
            return {
              "": {
                results: dummyRows,
                count: dummyRows.length
              }
            }
          } else {
            return dummyRows
          }
        }
      } else {
        return dataGroup
      }
    },
    busEvtProperties() {
      return {
        attributes: this.fieldsConfig,
        mainCellId: this.getMainCellId,
        endPoint: this.endPoint,
        groupType: this.groupType,
        hasReportRow: this.hasReportRow,
        disableAddNewToMany: this.disableAddNewToMany,
        countLabelSingular: this.countLabelSingular,
        disabledBookmarkRow: this.disabledBookmarkRow,
        disabledOwnerRow: this.disabledOwnerRow,
        userAccount: this.userPk,
        isOffline: this.isOffline
      }
    },
    queryRoute() {
      return this.$route.query
    },
    isUngroup() {
      try {
        let { rgx } = this
        return rgx["ungroup"]
      } catch (e) {
        return false
      }
    },
    groupType() {
      let { rgx } = this
      return rgx["group_by"]
    },
    group_items() {
      let { rgx } = this
      return rgx["group_items"] || ""
    },
    rgx() {
      let { queryRoute, queryParams, includeParams, excludeParams, layoutType } = this
      queryParams = queryParams || {}
      let t = { ...queryParams, ...queryRoute }
      let hasIncludeParams = Boolean(Object.values(includeParams).length)
      let hasExcludeParams = Boolean(excludeParams.length)
      // todo handler query params ordering
      let ordering = queryParams["ordering"]
      if (ordering) {
        t = { ...t, ordering }
      }
      // todo handler includes params ordering
      if (hasIncludeParams) {
        t = { ...includeParams, ...t }
      }
      // todo handler exclude params ordering
      if (hasExcludeParams) {
        for (let j = 0; j < excludeParams.length; j++) {
          delete t[j]
        }
      }
      // todo handler default ungroup params ordering
      t["ungroup"] = !t.hasOwnProperty("group_by")
      t["view"] = layoutType
      /*if(t['view'] && t['view'] === this.defaultType) {
        delete t['view']
      }*/
      return t
    },
    attrsBase() {
      let { defaultCompactRow } = this
      return {
        "app--compact": defaultCompactRow
      }
    }
  },
  watch: {
    attributes: {
      immediate: true,
      deep: true,
      handler(attributes) {
        let { mainCellId } = this
        let items = reduceAttributes(attributes, [...this.fieldsConfig], mainCellId)
        console.error("FIELDS_CONFIGS", { items, attributes })
        this.fieldsConfig = items
      }
    },
    // queryParams: {
    rgx: {
      immediate: false,
      handler(queryParams, prevQueryParams) {
        if (!queryParams) {
          return
        }
        try {
          // todo check fetch entries
          // this.$router.replace({ query: queryParams }).catch(err => {
          this.$router.replace({ query: Object.assign({}, this.$route.query, { ...queryParams }) }).catch(err => {
            console.error("ERROR", err.message)
          })
          let patternsExclude = ["by", "view"]
          let currentQueryParams = $$handleExcludeQueryParams(queryParams, patternsExclude)
          let oldQueryParams = $$handleExcludeQueryParams(prevQueryParams, patternsExclude)
          let isExist = $$existQueryRouteParams(currentQueryParams, oldQueryParams)
          console.log("%c QUERY_PARAMS ", "background: #222; color: #bada55", {
            patternsExclude,
            oldQueryParams,
            isExist
          })
          if (!isExist) {
            this.fetchEntries()
          }
        } catch (e) {
          console.error(e.message)
        }
      }
    }

  },
  methods: {
    applyFilter(event, data) {
      // todo: remove current filters
      let queryParams = removeQueryFilterFromQueryParams(this.queryParams)
      this.queryParams = { ...this.queryStringParamsFilter, ...queryParams }
    },
    generateRows() {
      let { noQueryParams, dataGroup, dummyRows } = this
      let res = {}
      if (noQueryParams) {
        if (Boolean(dummyRows)) {
          if (Array.isArray(dummyRows)) {
            res = {
              "": {
                results: dummyRows,
                count: dummyRows.length
              }
            }
          } else {
            res = dummyRows
          }
        }
      } else {
        res = dataGroup
      }
      this.dataGroup = { ...res }
    },
    getRowDataString,
    clickRow(row, group) {
      let rowUserCreatorId = row[this.creatorName]
      let isOwnerRow = rowUserCreatorId && rowUserCreatorId === this.userPk
      let busEventName = this.busEventUpdateRow
      const $$execute = this.updateRowDetail
      let params = { ...this.busEvtProperties, isOwnerRow, busEventName, group, row, $$execute }
      this.$trigger("uiShowAttributeModalDetail", { ...params })
    },
    selectedRow(row, group) {
      let { rowsSelected, uniqueId } = this
      let allSelected = $$setEntriesSelected(rowsSelected, row, uniqueId)
      this.rowsSelected = { ...allSelected }
    },
    showTooltip($$data) {
      console.error("$$showTooltip", $$data)
      let { evt, item, k } = $$data
      this.setTooltipOption({ k, item })
      let elm = evt.target
      let menu = document.getElementById("tooltip-info-app")
      $createTooltip(elm, menu, evt)
    },
    showContext($$data = {}) {
      let { k } = $$data
      let { attribute, evt, operationsField } = $$data.data
      let strFieldId = attribute['strFieldId']
      let elm = document.getElementById(strFieldId)
      let menu = document.getElementById("context-modal-app")
      if (k === 'filter_column') {
        $createMenuPortal(elm, menu, evt)
        this.setFieldContextAction(attribute, operationsField)
      }
    },

    setFieldContextAction(attribute, operationsFieldSelected) {
      // set options field of filter column || update cell value
      this.fieldSelected = attribute
      this.operationsFieldSelected = operationsFieldSelected
    },
    setRuleFilterField(data) {
      console.error(data)
    },
    setTooltipOption(val) {
      this.tooltipOption = val
    },
    handleRowsSelected(rows) {
      let { fieldsConfig, getMainCellId, uniqueId } = this
      this.$trigger("uiShowEntriesSetting", { rows, fieldsConfig, mainCellId: getMainCellId, uniqueId })
    },
    handleRowsSelectedReset() {
      this.rowsSelected = {}
    },
    showAddRowModal(group) {
      let busEventName = this.busEventName
      const $$execute = this.addNewRow
      let params = { ...this.busEvtProperties, busEventName, group, $$execute }
      this.$trigger("uiShowAttributeModalCreateNew", params)
    },
    $$results,
    initQueryParamsFilter() {
      try {
        this.queryStringParamsFilter = convertQueryParamsToQueryFilter(this.queryRoute)
      } catch (e) {

      }
    },
    initLayoutType() {
      let { query: { view } } = this.$route
      if (view) {
        let t = view.toUpperCase()
        this.layoutType = t
      }
    },
    async fetchEntries() {
      try {
        this.loading = true
        if (!this.isSkeletonLoader) {
          this.isSkeletonLoader = true
        }
        let res = await $$fetchEntries({ ...this.curdProperties })
        console.log("%c FETCH ENTRIES! ", "background: #222; color: #bada55", res)
        this.dataGroup = { ...res }
      } catch (e) {
        console.error("FETCH ENTRIES", arguments, e.message)
      } finally {
        this.loading = false
        this.isSkeletonLoader = false
      }
    },
    resetFields(data) {
      if (data && data.fields) {
        this.fieldsConfig = data.fields
      }
    },
    initSortFields() {
      let { sortConfig, fieldsConfig } = $$initSortFields(this.queryRoute, this.fieldsConfig)
      this.resetFields({ fields: fieldsConfig })
      this.sortConfig = sortConfig
    },
    sortFields(data) {
      let { rgx } = this
      let { fieldsConfig, sortConfig, queryParams, ordering } = $$sortFields(data, rgx)
      console.log(queryParams)
      this.queryParams = queryParams
      this.fieldsConfig = fieldsConfig
      this.sortConfig = sortConfig
      if (ordering) {
        this.ordering = ordering
      }
    },
    sortField({ item, isSort }) {
      let { sortConfig, fieldsConfig, rgx, queryParams } = this
      let data = $$sortField({ item, isSort, attributes: fieldsConfig, queryParams: rgx, sortConfig })
      console.log(rgx, item, isSort, data)
      this.queryParams = data.queryParams
      this.sortConfig = data.sortConfig
      this.fieldsConfig = data.fieldsConfig
      this.$eventHub.$emit("change-sort-config", data.sortConfig)
    },
    // todo: order row
    async orderRow(evt, list, groupByItem) {
      if (!this.enabledOrderRow) {
        return
      }
      let ref = this.$refs["draggableData"][0]
      let { newDraggableIndex, type, newIndex, oldDraggableIndex, oldIndex } = evt
      if (newIndex === oldIndex) {
        return
      }
      let row = { ...list[oldIndex] },
        orderValue = row["order"], newOrderValue = 0
      let isFirstIndex = newIndex === 0
      let isLastIndex = newIndex === list.length - 1
      if (type === "end") {
        if (isFirstIndex) {
          newOrderValue = list[newIndex]["order"] - 1000000
        } else if (isLastIndex) {
          newOrderValue = list[newIndex - 1]["order"] + 1000000
        } else {
          let prevRow = list[newIndex - 1]
          let nextRow = list[newIndex]
          newOrderValue = (prevRow["order"] + nextRow["order"]) / 2
        }
        let order = Math.round(newOrderValue)
        row["order"] = order
        let params = { ...this.curdProperties, order, row, groupByItem }
        let res = await $$updateOrderField(params)
        this.dataGroup = { ...res }
      }
    },
    onCollapse(index) {
      if (!this.collapse.includes(index)) {
        this.collapse.push(index)
      } else {
        let _index = this.collapse.findIndex(i => i === index)
        if (_index >= 0) {
          this.collapse.splice(_index, 1)
        }
      }
    },
    getExpandGroup(index) {
      return !this.collapse.includes(index)
    },
    async clearGroupBy() {
      let { rgx } = this
      this.groupItems = []
      let queryParams = { ...rgx, ungroup: true }
      delete queryParams["group_items"]
      delete queryParams["group_by"]
      this.$router.replace({ query: queryParams })
    },
    changedGroupBy({ group_by, group_items, list }) {
      try {
        let { rgx } = this
        this.groupItems = list
        let queryParams = {
          ...rgx, group_items, group_by, ungroup: false
        }
        this.$router.replace({ query: queryParams })

      } catch (e) { // eslint-disable-line
      }
    },
    async paginate({ queryParams }) {
      try {
        this.loading = true
        let res = await $$paginateRows({
          $api: this.$api,
          endPoint: this.endPoint,
          dataGroup: { ...this.dataGroup },
          queryParams
        })
        this.dataGroup = { ...res }
      } catch (e) {
        console.log(e.message) // eslint-disable-line
      } finally { // eslint-disable-line
        this.loading = false
      }
    },
    changeLayout(layoutType) {
      let { rgx } = this
      let q = { ...rgx }
      q["view"] = layoutType.toLowerCase()
      this.layoutType = layoutType
      this.queryParams = { ...q }
    },
    async loadRowDetail(rowId, groupByItem) {
      let params = { ...this.curdProperties, rowId, groupByItem }
      let res = await $$loadRowDetail({ ...params })
      console.log("loadRowDetail", res)
      this.dataGroup = { ...res }
    },
    async updateRowDetail(options = {}) {
      let { row, group } = options
      let groupByItem = group
      let params = { ...this.curdProperties, row, groupByItem }
      let res = await $$loadRowDetail({ ...params })
      console.log("updateRowDetail", res)
      this.dataGroup = { ...res }
    },
    async deleteRow(row, groupByItem) {
      let params = { ...this.curdProperties, row, groupByItem }
      let res = await $$deleteRow({ ...params })
      console.log("deleteRow", res)
      this.dataGroup = { ...res }
    },
    async addNewRow(data) {
      let params = { ...this.curdProperties, data: { ...data } }
      let res = await $$addNewRow({ ...params })
      console.log("addNewRow", res)
      this.dataGroup = { ...res }
    },
    // todo Print
    printPaper() {
      // this.$htmlToPaper(`${this.idSlickGrid}`);
      let { headers, desserts } = this.getRowDataString()
      this.headersPrint = headers
      this.dessertsPrint = desserts
      // this.uiShowModalPrint = true
      printJS({
        printable: desserts,
        properties: headers.map(header => header.name),
        type: "json"
      })
    },
    exportCsvFile() {
      let { csv, csvStringRowsContent } = this.getRowDataString()
      printCsvFile(csvStringRowsContent)
    },
    initInteract() {
      $$initInteract(this.$el)
    },
    fieldChangeSetting(evt, data) {
      return new Promise((resolve, reject) => {
        let { attribute, action } = data
        this.fileSettingActions(attribute, action.TYPE)
        resolve(1)
      })
    },
    fileSettingActions(attribute, type) {
      switch (type) {
        case ACTIONS_FIELD.PIN.TYPE:
          let clnAttribute = this.pinField(attribute)
          this.updateFieldsConfig({ ...clnAttribute })
          break
        case ACTIONS_FIELD.SHOW_HIDE.TYPE:
          this.updateFieldsConfig({ ...attribute, hide: true })
          break
        default:
          break
      }
    },
    pinField(field) {
      let attribute = { ...field }
      let pinned = attribute["pinned"]
      let actionPin = { ...attribute["actionsField"] }
      actionPin[ACTIONS_FIELD.PIN.TYPE].LABEL = ACTIONS_FIELD.PIN.LABEL_OFF
      attribute["actionsField"] = { ...actionPin }
      attribute["pinned"] = !pinned
      return attribute
    },
    updateFieldsConfig(attribute) {
      let { fieldsConfig } = this
      let clnFields = [...fieldsConfig]
      let indexField = clnFields.findIndex(f => f.name === attribute.name)
      if (indexField >= 0) {
        clnFields[indexField] = { ...attribute }
        this.fieldsConfig = [...clnFields]
      }
    },
    onFieldsChange({ fields }) {
      let fieldsConfig = [...Object.values(fields)]
      let items = reduceAttributes(fields, [...this.fieldsConfig])
      this.fieldsConfig = [...items]
      this.generateRows()
      this.$emit("fieldsChange", { fields })
    }
  },
  beforeDestroy() {
    this.search = ""
    this.mode = false
    this.loading = false
    this.isSkeletonLoader = false
    this.uiShowModalPrint = false
    this.dataGroup = null
    this.rowsSelected = {}
    // this.groupType = null
    this.groupItems = []
    this.fieldsConfig = []
    // print
    this.headersPrint = []
    this.dessertsPrint = []
    this.ungroup = true
    // this.group_items = ""
    this.queryParams = null
    this.queryStringParamsFilter = null
    this.predicate = null
    this.layoutType = this.defaultType

    // sort
    this.sortConfig = []
    document.documentElement.classList.remove("no_scroll")
    // filter
    this.totalFilter = 0
  },

  filters: {
    $$totalTask,
    $$totalTaskServer,
    $$results,
    $$keyRow
  }
}
</script>

<style lang="scss">
@import "styles/slickgrid";
</style>
<style lang="scss">
@import "styles/base-columns";
</style>
