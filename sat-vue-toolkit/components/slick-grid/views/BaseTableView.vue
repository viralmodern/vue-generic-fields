<template>
  <div>
    <HeaderTableViewGeneric :attributes="fieldsConfig"
                            :attributesPinned="fieldsReduce.pinned"
                            :attributesFree="fieldsReduce.default"
                            @sort-field="sortField"
                            @show-context="showContext"
                            @setRuleFilterField="setRuleFilterField"
                            :disabledAddNewColumn="disabledAddNewColumn"
                            :disabled-filter-row="disabledFilterRow"
                            :mainCellId="mainCellId">
      <template v-slot:header-add-field>
        <slot name="header-add-field"></slot>
      </template>
    </HeaderTableViewGeneric>
    <template v-for="(dd, index) in combinedRowsData">
      <keep-alive>
        <div class="task-list-group px-0">
          <template v-if="!isUngroup && !noGroup">
            <component :is="headerLayout"
                       :attributes="fieldsConfig"
                       :attributesPinned="fieldsReduce.pinned"
                       :attributesFree="fieldsReduce.default"
                       :isGrouped="!isUngroup"
                       :groupType="groupType"
                       :disabledAddNewColumn="disabledAddNewColumn"
                       :childInfo="index"
                       titleUngroup="Un Group"
                       :labelUnGroup="labelUnGroup"
                       :countLabelMany="countLabelMany"
                       :countLabelSingular="countLabelSingular"
                       :list="groupItems"
                       :noGroup="noGroup"
                       :hideAttributes="false"
                       :isExpanded="getExpandGroup(index)"
                       @collapse="onCollapse(index)"
                       @sort-field="sortField"
                       :mainCellId="mainCellId"
                       :totalTask="dd | $$totalTask"
                       :totalTaskServer="dd | $$totalTaskServer"/>
          </template>
          <div v-show="getExpandGroup(index)" class="task-list-group--body">
            <draggable class="list-group"
                       draggable=".drag-item"
                       handle=".drag-handle"
                       ref="draggableData"
                       @end="(evt) => orderRow(evt, $$results(dd), index)"
                       group="a">
              <template v-for="(item, rowIndex) in $$results(dd)">
                <keep-alive>
                  <component class="drag-item"
                             :is="rowLayout"
                             :id="item | $$keyRow"
                             :isOffline="isOffline"
                             :userAccount="userAccount"
                             :disabledOwnerRow="disabledOwnerRow"
                             :ownerName="creatorName"
                             :pathLink="pathLinkRowDetail"
                             :countLabelMany="countLabelMany"
                             :countLabelSingular="countLabelSingular"
                             :item="item"
                             :uniqueId="uniqueId"
                             :rowIndex="rowIndex + 1"
                             :rowSelected="getRowSelected(item, uniqueId)"
                             :groupByItem="index"
                             :busEventName="busEventName"
                             :busEventLoadRow="busEventLoadRow"
                             :busEventUpdateRow="busEventUpdateRow"
                             :busEventDeletedRow="busEventDeletedRow"
                             :busEventHoverCell="busEventHoverCell"
                             :mainCellId="mainCellId"
                             :disabledVoteRow="disabledVoteRow"
                             :hasReportRow="hasReportRow"
                             :disabledAddNewColumn="disabledAddNewColumn"
                             :disabled-bookmark-row="disabledBookmarkRow"
                             :noLinkDetail="noLinkDetail"
                             @clickRowDetail="row => clickRow(row, index)"
                             @selectedRow="row => selectedRow(row, index)"
                             @showTooltip="showTooltip"
                             :endPoint="`${endPoint}${item[uniqueId]}/`"
                             :pinned-row="pinnedRow"
                             :pinned-row-id="pinnedRowId"
                             :attributesPinned="fieldsReduce.pinned"
                             :attributesFree="fieldsReduce.default"
                             :attributes="fieldsConfig"/>
                </keep-alive>
              </template>
            </draggable>
          </div>
          <div v-if="getExpandGroup(index)" class="task-list-group--footer">
            <template v-if="showQuickAddRow">
              <CreateNewRowGrid/>
            </template>
            <template v-if="!disabledAddNewRow">
              <template v-if="uiShowAddRowModal">
                <LinkAddRowModal :count-label-singular="countLabelSingular"
                                 @click="showAddRowModal(index)"/>
              </template>
            </template>
            <template v-if="showPagination">
              <PaginationGrid :loading="loading"
                              :options="dd"
                              @change="paginate"/>
            </template>
          </div>
        </div>
      </keep-alive>
    </template>

  </div>
</template>

<script>
  import baseViewProps from "../configs/props/baseViewProps"
  import { layoutMixin } from "./mixins/mxCoreLayout"
  import draggable from "vuedraggable"
  import { LAYOUT_TYPES } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"
  import BaseHeaderTableItem from "~/sat-vue-toolkit/components/slick-grid/headers/BaseHeaderTableItem"
  import HeaderTableView from "~/sat-vue-toolkit/components/slick-grid/headers/HeaderTableView"
  import HeaderTableViewGeneric from "~/sat-vue-toolkit/components/slick-grid/headers/HeaderTableViewGeneric"

  export default {
    name: "BaseTableView",
    props: {
      ...baseViewProps
    },
    data () {
      return {
        headerLayout: LAYOUT_TYPES.TABLE.HEADER_LAYOUT,
        rowLayout: LAYOUT_TYPES.TABLE.ROW_LAYOUT
      }
    },
    components: {
      HeaderTableViewGeneric,
      HeaderTableView,
      BaseHeaderTableItem,
      // BaseHeaderTableItem:() => import("~/sat-vue-toolkit/components/slick-grid/headers/BaseHeaderTableItem"),
      BaseRowTableItem: () => import("~/sat-vue-toolkit/components/slick-grid/rows/BaseRowTableItem"),
      PaginationGrid: () => import("~/sat-vue-toolkit/components/slick-grid/attributes/PaginationGrid"),
      LinkAddRowModal: () => import("~/sat-vue-toolkit/components/slick-grid/attributes/LinkAddRowModal"),
      CreateNewRowGrid: () => import("~/sat-vue-toolkit/components/slick-grid/attributes/CreateNewRowGrid"),
      draggable
    },
    mixins: [layoutMixin]
  }
</script>

<style lang="scss">
  .base_table [data-column="field_definition"]:hover ~ [data-column="field_definition"] {
    background: red;
  }

  .hidden-tag {
    position: fixed;
    visibility: hidden;
    pointer-events: none;
  }
</style>
<style scoped lang="scss">

</style>
